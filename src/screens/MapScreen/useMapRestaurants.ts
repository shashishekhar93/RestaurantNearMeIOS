import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import mapRestaurantRepository from './mapRestaurantRepository';

import {
  MapRestaurant,
  MapRestaurantSearchRequest,
} from './MapRestaurant';

// ============================================================
// CONSTANTS
// ============================================================

// Number of restaurants requested in one API call.
const PAGE_SIZE = 20;


// ============================================================
// HOOK
// ============================================================

const useMapRestaurants = (
  filters?: MapRestaurantSearchRequest,
) => {

  // ==========================================================
  // RESTAURANTS
  // ==========================================================

  const [
    restaurants,
    setRestaurants,
  ] = useState<MapRestaurant[]>([]);


  // ==========================================================
  // LOADING STATES
  // ==========================================================

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    loadingMore,
    setLoadingMore,
  ] = useState(false);

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);


  // ==========================================================
  // PAGINATION
  // ==========================================================

  const [
    page,
    setPage,
  ] = useState(0);

  const [
    hasMore,
    setHasMore,
  ] = useState(true);


  // ==========================================================
  // ERROR
  // ==========================================================

  const [
    error,
    setError,
  ] = useState<string | null>(
    null,
  );


  // ==========================================================
  // REQUEST LOCK
  // ==========================================================
  //
  // Prevents multiple API requests from running at the same
  // time.
  //
  // This is particularly important for pagination because
  // FlatList can trigger onEndReached more than once.
  // ==========================================================

  const requestInProgress =
    useRef(false);


  // ==========================================================
  // FILTERS
  // ==========================================================
  //
  // Keep the latest filters without making loadRestaurants
  // depend on the filters object reference.
  // ==========================================================

  const filtersRef =
    useRef<MapRestaurantSearchRequest>(
      filters ?? {},
    );


  useEffect(() => {

    filtersRef.current =
      filters ?? {};

  }, [filters]);


  // ==========================================================
  // NORMALIZE RESTAURANT
  // ==========================================================
  //
  // Google Maps requires latitude and longitude to be numbers.
  //
  // Some APIs return:
  //
  // latitude: 26.8467
  //
  // while others may return:
  //
  // latitude: "26.8467"
  //
  // Convert both cases into numbers here.
  // ==========================================================

  const normalizeRestaurant =
    useCallback(
      (
        restaurant: MapRestaurant,
      ): MapRestaurant => {

        const latitude =
          Number(
            restaurant.latitude,
          );

        const longitude =
          Number(
            restaurant.longitude,
          );


        return {
          ...restaurant,

          latitude:
            Number.isFinite(
              latitude,
            )
              ? latitude
              : undefined,

          longitude:
            Number.isFinite(
              longitude,
            )
              ? longitude
              : undefined,
        };
      },
      [],
    );


  // ==========================================================
  // LOAD RESTAURANTS
  // ==========================================================

  const loadRestaurants =
    useCallback(
      async (
        pageNumber: number,
        isRefresh: boolean = false,
      ) => {

        // ----------------------------------------------------
        // Prevent duplicate API calls
        // ----------------------------------------------------

        if (
          requestInProgress.current
        ) {
          return;
        }


        requestInProgress.current =
          true;


        try {

          // --------------------------------------------------
          // LOADING STATE
          // --------------------------------------------------

          if (isRefresh) {

            setRefreshing(true);

          } else if (
            pageNumber === 0
          ) {

            setLoading(true);

          } else {

            setLoadingMore(true);
          }


          // --------------------------------------------------
          // API CALL
          // --------------------------------------------------

          const response =
            await mapRestaurantRepository.searchRestaurants(
              pageNumber,
              PAGE_SIZE,
              filtersRef.current,
            );


          // --------------------------------------------------
          // API STATUS
          // --------------------------------------------------

          if (
            response.status !== 1
          ) {

            throw new Error(
              response.error ??
                'Unable to load restaurants',
            );
          }


          // --------------------------------------------------
          // GET API RESULTS
          // --------------------------------------------------

          const apiRestaurants =
            response.data?.results ??
            [];


          // --------------------------------------------------
          // NORMALIZE COORDINATES
          // --------------------------------------------------

          const newRestaurants =
            apiRestaurants.map(
              normalizeRestaurant,
            );


          // --------------------------------------------------
          // UPDATE RESTAURANTS
          // --------------------------------------------------
          //
          // First page:
          // Replace existing data.
          //
          // Subsequent pages:
          // Append new data.
          // --------------------------------------------------

          if (
            isRefresh ||
            pageNumber === 0
          ) {

            setRestaurants(
              newRestaurants,
            );

          } else {

            setRestaurants(
              previousRestaurants => [
                ...previousRestaurants,
                ...newRestaurants,
              ],
            );
          }


          // --------------------------------------------------
          // CURRENT PAGE
          // --------------------------------------------------

          setPage(
            pageNumber,
          );


          // --------------------------------------------------
          // PAGINATION
          // --------------------------------------------------

          const totalPages =
            response.data?.page?.total ??
            0;


          setHasMore(
            pageNumber + 1 <
              totalPages,
          );


          // --------------------------------------------------
          // CLEAR ERROR
          // --------------------------------------------------

          setError(null);

        } catch (e: any) {

          // --------------------------------------------------
          // ERROR
          // --------------------------------------------------

          setError(
            e?.message ??
              'Unable to load restaurants',
          );

        } finally {

          // --------------------------------------------------
          // RESET LOADING STATES
          // --------------------------------------------------

          setLoading(false);

          setLoadingMore(false);

          setRefreshing(false);


          // --------------------------------------------------
          // RELEASE REQUEST LOCK
          // --------------------------------------------------

          requestInProgress.current =
            false;
        }
      },
      [
        normalizeRestaurant,
      ],
    );


  // ==========================================================
  // INITIAL API CALL
  // ==========================================================
  //
  // IMPORTANT:
  // loadRestaurants is stable because its only dependency is
  // the stable normalizeRestaurant callback.
  //
  // Therefore this does NOT create an infinite loop.
  // ==========================================================

  useEffect(() => {

    loadRestaurants(0);

  }, [loadRestaurants]);


  // ==========================================================
  // REFRESH
  // ==========================================================

  const refresh =
    useCallback(() => {

      if (
        requestInProgress.current
      ) {
        return;
      }


      setHasMore(true);


      loadRestaurants(
        0,
        true,
      );

    }, [
      loadRestaurants,
    ]);


  // ==========================================================
  // LOAD MORE
  // ==========================================================

  const loadMore =
    useCallback(() => {

      // ------------------------------------------------------
      // Don't request another page if:
      //
      // - request already running
      // - initial loading running
      // - pagination loading running
      // - refresh running
      // - no more pages available
      // ------------------------------------------------------

      if (
        requestInProgress.current ||
        loading ||
        loadingMore ||
        refreshing ||
        !hasMore
      ) {
        return;
      }


      // ------------------------------------------------------
      // Request next page
      // ------------------------------------------------------

      loadRestaurants(
        page + 1,
      );

    }, [
      loadRestaurants,
      page,
      loading,
      loadingMore,
      refreshing,
      hasMore,
    ]);


  // ==========================================================
  // RETURN
  // ==========================================================

  return {

    restaurants,

    loading,

    loadingMore,

    refreshing,

    error,

    refresh,

    loadMore,

    hasMore,
  };
};


export default useMapRestaurants;