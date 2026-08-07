import {useCallback, useEffect, useState} from 'react';

import RestaurantRepository from '../../api/repository/restaurantRepository';

import {
  Restaurant,
  RestaurantSearchRequest,
} from '../../api/services/restaurantList/Restaurant';

const PAGE_SIZE = 10;
const EMPTY_FILTERS: RestaurantSearchRequest = {};

const useRestaurants = (
  filters: RestaurantSearchRequest = EMPTY_FILTERS,
) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const [loading, setLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const [loadingMore, setLoadingMore] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(0);

  const [hasMore, setHasMore] = useState(true);

  const loadRestaurants = useCallback(
    async (
      pageNumber: number,
      refresh: boolean = false,
    ) => {
      try {
        if (refresh) {
          setRefreshing(true);
        } else if (pageNumber == 0) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }

        const response =
          await RestaurantRepository.searchRestaurants(
            pageNumber,
            PAGE_SIZE,
            filters,
          );

        if (response.status != 1) {
          throw new Error(
            response.error ??
              'Unable to load restaurants',
          );
        }

        const list = response.data.results;

        if (refresh || pageNumber == 0) {
          setRestaurants(list);
        } else {
          setRestaurants(prev => [...prev, ...list]);
        }

        setPage(pageNumber);

        setHasMore(
          pageNumber + 1 < response.data.page.total,
        );

        setError(null);
      } catch (e: any) {
        setError(
          e?.message ?? 'Something went wrong',
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
        setLoadingMore(false);
      }
    },
    [filters],
  );

  const refresh = () => {
    loadRestaurants(0, true);
  };

  const loadMore = () => {
    if (
      loading ||
      loadingMore ||
      refreshing ||
      !hasMore
    ) {
      return;
    }

    loadRestaurants(page + 1);
  };

  useEffect(() => {
    loadRestaurants(0);
  }, [loadRestaurants]);

  const featuredRestaurant =
    restaurants.length > 0
      ? restaurants[0]
      : undefined;

  const gridRestaurants =
    restaurants.length > 1
      ? restaurants.slice(1)
      : [];

  return {
    restaurants,
    featuredRestaurant,
    gridRestaurants,
    loading,
    refreshing,
    loadingMore,
    error,
    refresh,
    loadMore,
  };
};

export default useRestaurants;