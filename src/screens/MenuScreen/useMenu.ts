/**
 * ============================================================
 * USE MENU
 * ============================================================
 *
 * This hook contains the business logic required by MenuScreen.
 *
 * Responsibilities:
 *
 * 1. Load restaurant categories.
 * 2. Load menu items for every category.
 * 3. Keep menu items grouped by category.
 * 4. Handle pagination independently for each category.
 * 5. Handle refresh.
 * 6. Prevent duplicate requests.
 *
 * IMPORTANT:
 *
 * The restaurantId comes from the Restaurant object selected
 * on HomeScreen.
 *
 * Nothing is hardcoded here.
 * ============================================================
 */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import MenuRepository from '../../api/repository/menuRepository';

import {
  MenuCategory,
  MenuItem,
} from '../../api/services/menu/Menu';


// ============================================================
// CONSTANTS
// ============================================================

/**
 * Number of menu items requested in one API call.
 */
const PAGE_SIZE = 10;


// ============================================================
// TYPES
// ============================================================

/**
 * Stores menu items against their category ID.
 *
 * Example:
 *
 * {
 *   14: [item1, item2],
 *   15: [item3, item4]
 * }
 */
type MenuItemsByCategory = {
  [categoryId: number]: MenuItem[];
};


/**
 * Stores the current page for every category.
 *
 * Example:
 *
 * {
 *   14: 0,
 *   15: 1
 * }
 */
type PageByCategory = {
  [categoryId: number]: number;
};


/**
 * Stores whether more pages are available for
 * every category.
 */
type HasMoreByCategory = {
  [categoryId: number]: boolean;
};


/**
 * Stores loading state independently for each category.
 *
 * This becomes useful when we later add pagination
 * while scrolling through a particular category.
 */
type LoadingMoreByCategory = {
  [categoryId: number]: boolean;
};


// ============================================================
// HOOK
// ============================================================

const useMenu = (
  restaurantId: number,
) => {

  // ==========================================================
  // CATEGORIES
  // ==========================================================

  const [categories, setCategories] =
    useState<MenuCategory[]>([]);


  // ==========================================================
  // MENU ITEMS
  // ==========================================================

  const [
    menuItemsByCategory,
    setMenuItemsByCategory,
  ] = useState<MenuItemsByCategory>({});


  // ==========================================================
  // PAGINATION
  // ==========================================================

  const [
    pageByCategory,
    setPageByCategory,
  ] = useState<PageByCategory>({});


  const [
    hasMoreByCategory,
    setHasMoreByCategory,
  ] = useState<HasMoreByCategory>({});


  const [
    loadingMoreByCategory,
    setLoadingMoreByCategory,
  ] = useState<LoadingMoreByCategory>({});


  // ==========================================================
  // LOADING STATES
  // ==========================================================

  const [loading, setLoading] =
    useState(false);

  const [refreshing, setRefreshing] =
    useState(false);


  // ==========================================================
  // ERROR
  // ==========================================================

  const [error, setError] =
    useState<string | null>(null);


  // ==========================================================
  // REQUEST LOCK
  // ==========================================================
  /**
   * Prevents multiple category/menu requests from
   * being triggered simultaneously.
   *
   * This is especially important because:
   *
   * - React effects can run again.
   * - FlatList can trigger callbacks multiple times.
   * - Fast scrolling can trigger pagination repeatedly.
   */
  const requestInProgress =
    useRef(false);


  // ==========================================================
  // RESTAURANT ID REF
  // ==========================================================
  /**
   * Keeps the latest restaurant ID without making
   * every callback depend on it.
   */
  const restaurantIdRef =
    useRef(restaurantId);


  useEffect(() => {
    restaurantIdRef.current =
      restaurantId;
  }, [restaurantId]);


  // ==========================================================
  // LOAD MENU ITEMS FOR ONE CATEGORY
  // ==========================================================

  const loadCategoryItems =
    useCallback(
      async (
        categoryId: number,
        page: number,
        replace: boolean = false,
      ) => {

        /**
         * If this category is already loading another page,
         * don't start another request.
         */
        if (
          loadingMoreByCategory[categoryId]
        ) {
          return;
        }

        try {

          // -----------------------------------------------
          // Loading state for this category
          // -----------------------------------------------

          if (page > 0) {

            setLoadingMoreByCategory(
              previous => ({
                ...previous,
                [categoryId]: true,
              }),
            );

          }


          // -----------------------------------------------
          // API REQUEST
          // -----------------------------------------------

          const response =
            await MenuRepository.searchMenuItems(
              page,
              PAGE_SIZE,
              {
                restaurantId:
                  restaurantIdRef.current,

                menuCategoryId:
                  categoryId,
              },
            );


          // -----------------------------------------------
          // API ERROR
          // -----------------------------------------------

          if (response.status !== 1) {

            throw new Error(
              response.error ??
                'Unable to load menu items',
            );

          }


          // -----------------------------------------------
          // RESPONSE ITEMS
          // -----------------------------------------------

          const newItems =
            response.data.results ?? [];


          // -----------------------------------------------
          // STORE ITEMS
          // -----------------------------------------------

          setMenuItemsByCategory(
            previous => {

              /**
               * Page 0 replaces existing items.
               *
               * Page 1, 2, 3... append items.
               */
              if (
                replace ||
                page === 0
              ) {

                return {
                  ...previous,
                  [categoryId]:
                    newItems,
                };

              }


              return {
                ...previous,

                [categoryId]: [
                  ...(previous[
                    categoryId
                  ] ?? []),

                  ...newItems,
                ],
              };

            },
          );


          // -----------------------------------------------
          // STORE CURRENT PAGE
          // -----------------------------------------------

          setPageByCategory(
            previous => ({
              ...previous,
              [categoryId]: page,
            }),
          );


          // -----------------------------------------------
          // PAGINATION
          // -----------------------------------------------
          /**
           * We primarily use the number of returned items
           * to determine whether another page exists.
           *
           * If the server returns fewer items than PAGE_SIZE,
           * we have reached the last page.
           *
           * This is safer with the API response you provided,
           * because its `total` / `count` fields do not clearly
           * map to standard total-page semantics.
           */
          const hasMore =
            newItems.length >= PAGE_SIZE;


          setHasMoreByCategory(
            previous => ({
              ...previous,
              [categoryId]: hasMore,
            }),
          );


          setError(null);

        } catch (e: any) {

          setError(
            e?.message ??
              'Unable to load menu items',
          );

        } finally {

          setLoadingMoreByCategory(
            previous => ({
              ...previous,
              [categoryId]: false,
            }),
          );

        }

      },
      [
        loadingMoreByCategory,
      ],
    );


  // ==========================================================
  // LOAD CATEGORIES + FIRST PAGE OF ITEMS
  // ==========================================================

  const loadMenu =
    useCallback(
      async (
        isRefresh: boolean = false,
      ) => {

        /**
         * Never allow two complete menu loads
         * to happen at the same time.
         */
        if (
          requestInProgress.current
        ) {
          return;
        }


        requestInProgress.current =
          true;


        try {

          // -----------------------------------------------
          // LOADING STATE
          // -----------------------------------------------

          if (isRefresh) {

            setRefreshing(true);

          } else {

            setLoading(true);

          }


          // -----------------------------------------------
          // RESET ERROR
          // -----------------------------------------------

          setError(null);


          // -----------------------------------------------
          // CATEGORY API
          // -----------------------------------------------

          const response =
            await MenuRepository.getCategories(
              restaurantIdRef.current,
            );


          // -----------------------------------------------
          // API ERROR
          // -----------------------------------------------

          if (response.status !== 1) {

            throw new Error(
              response.error ??
                'Unable to load menu categories',
            );

          }


          // -----------------------------------------------
          // CATEGORIES
          // -----------------------------------------------

          const newCategories =
            response.data ?? [];


          setCategories(
            newCategories,
          );


          // -----------------------------------------------
          // RESET PAGINATION
          // -----------------------------------------------

          setMenuItemsByCategory({});
          setPageByCategory({});
          setHasMoreByCategory({});
          setLoadingMoreByCategory({});


          // -----------------------------------------------
          // LOAD FIRST PAGE OF EVERY CATEGORY
          // -----------------------------------------------
          /**
           * We intentionally use Promise.all here.
           *
           * Every category is independent.
           *
           * Example:
           *
           * Category 14 → API call
           * Category 15 → API call
           * Category 16 → API call
           *
           * They can safely load in parallel.
           */
          await Promise.all(
            newCategories.map(
              category =>
                loadCategoryItems(
                  category.menuCategoryId,
                  0,
                  true,
                ),
            ),
          );

        } catch (e: any) {

          setError(
            e?.message ??
              'Unable to load menu',
          );

        } finally {

          setLoading(false);
          setRefreshing(false);

          requestInProgress.current =
            false;

        }

      },
      [
        loadCategoryItems,
      ],
    );


  // ==========================================================
  // INITIAL LOAD
  // ==========================================================
  /**
   * IMPORTANT:
   *
   * This effect depends only on restaurantId.
   *
   * We do NOT depend on:
   *
   * categories
   * menuItemsByCategory
   * pageByCategory
   *
   * Otherwise state updates could cause the API to
   * continuously execute again.
   */
  useEffect(() => {

    if (!restaurantId) {
      return;
    }

    loadMenu(false);

  }, [
    restaurantId,
  ]);


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

      loadMenu(true);

    }, [
      loadMenu,
    ]);


  // ==========================================================
  // LOAD MORE FOR CATEGORY
  // ==========================================================

  const loadMore =
    useCallback(
      (
        categoryId: number,
      ) => {

        /**
         * Don't request another page if:
         *
         * 1. A request is already running.
         * 2. No more items exist.
         * 3. This category is already loading.
         */
        if (
          requestInProgress.current ||
          !hasMoreByCategory[categoryId] ||
          loadingMoreByCategory[categoryId]
        ) {
          return;
        }


        const currentPage =
          pageByCategory[
            categoryId
          ] ?? 0;


        loadCategoryItems(
          categoryId,
          currentPage + 1,
          false,
        );

      },
      [
        hasMoreByCategory,
        loadingMoreByCategory,
        pageByCategory,
        loadCategoryItems,
      ],
    );


  // ==========================================================
  // RETURN
  // ==========================================================

  return {

    // Categories
    categories,

    // Menu items grouped by category
    menuItemsByCategory,

    // Loading
    loading,
    refreshing,

    // Pagination
    loadingMoreByCategory,
    hasMoreByCategory,
    pageByCategory,

    // Actions
    refresh,
    loadMore,

    // Error
    error,

  };

};


export default useMenu;