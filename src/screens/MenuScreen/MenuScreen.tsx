/**
 * ============================================================
 * MENU SCREEN
 * ============================================================
 *
 * Displays the complete menu of a selected restaurant.
 *
 * Data flow:
 *
 * HomeScreen
 *     ↓
 * complete Restaurant object
 *     ↓
 * MenuScreen
 *     ↓
 * useMenu
 *     ↓
 * categories + menu items
 *
 * ============================================================
 */

import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import AppText from '../../component/AppText/AppText';

import {
  Colors,
  Fonts,
  Radius,
  Spacing,
  Typography,
} from '../../theme';

import {
  Restaurant,
} from '../../api/services/restaurantList/Restaurant';

import {
  MenuCategory,
  MenuItem,
} from '../../api/services/menu/Menu';

import useMenu from './useMenu';

import MenuItemCard from './MenuItemCard';
import type {NativeStackScreenProps,} from '@react-navigation/native-stack';
import type {HomeStackParamList,} from '../../navigation/types';

// ============================================================
// PROPS
// ============================================================

// type Props = {
//   /**
//    * Complete restaurant object received from HomeScreen.
//    */
//   restaurant: Restaurant;

//   /**
//    * Navigation object.
//    *
//    * We keep this generic for now because your navigation
//    * setup may already have its own navigation types.
//    */
//   navigation?: any;
// };

type Props =
  NativeStackScreenProps<
    HomeStackParamList,
    'MenuScreen'
  >;

// ============================================================
// COMPONENT
// ============================================================

const MenuScreen = ({
  route,
  navigation,
}: Props) => {

    // ==========================================================
  // RESTAURANT
  // ==========================================================
  /**
   * We receive the complete Restaurant object from HomeScreen.
   *
   * This means we don't need to call the restaurant API again
   * just to get basic restaurant information.
   */
    const restaurant =route.params.restaurant;

  // ==========================================================
  // MENU HOOK
  // ==========================================================

  const {
    categories,
    menuItemsByCategory,
    loading,
    refreshing,
    refresh,
    loadMore,
    loadingMoreByCategory,
  } = useMenu(
    restaurant.restaurantId,
  );


  // ==========================================================
  // SCROLL VIEW
  // ==========================================================
  /**
   * One ScrollView contains:
   *
   * Restaurant header
   * Category pills
   * Category sections
   * Menu items
   *
   * We use scrollTo() when a category pill is pressed.
   */
  const scrollViewRef =
    useRef<ScrollView | null>(null);


  // ==========================================================
  // CATEGORY POSITIONS
  // ==========================================================
  /**
   * Stores the vertical position of each category.
   *
   * Example:
   *
   * {
   *   14: 420,
   *   15: 850
   * }
   *
   * When the user taps category 15, we scroll to 850.
   */
  const categoryPositions =
    useRef<{
      [categoryId: number]: number;
    }>({});


  // ==========================================================
  // SELECTED CATEGORY
  // ==========================================================
  /**
   * Used to visually highlight the currently selected
   * category pill.
   */
  const [
    selectedCategoryId,
    setSelectedCategoryId,
  ] = useState<number | null>(
    null,
  );


  // ==========================================================
  // SORT CATEGORIES
  // ==========================================================
  /**
   * The backend provides sortOrder.
   *
   * We create a sorted copy instead of modifying the original
   * API response.
   */
  const sortedCategories =
    useMemo(() => {

      return [
        ...categories,
      ].sort(
        (a, b) => {

          const orderA =
            a.sortOrder ??
            Number.MAX_SAFE_INTEGER;

          const orderB =
            b.sortOrder ??
            Number.MAX_SAFE_INTEGER;

          return orderA - orderB;

        },
      );

    }, [
      categories,
    ]);


  // ==========================================================
  // SET INITIAL CATEGORY
  // ==========================================================
  /**
   * We don't need another effect here.
   *
   * If the user hasn't selected anything yet, the first
   * category can simply be treated as selected in the UI.
   */
  const activeCategoryId =
    selectedCategoryId ??
    sortedCategories[0]
      ?.menuCategoryId ??
    null;


  // ==========================================================
  // CATEGORY POSITION
  // ==========================================================

  const handleCategoryLayout =
    useCallback(
      (
        categoryId: number,
        y: number,
      ) => {

        categoryPositions.current[
          categoryId
        ] = y;

      },
      [],
    );


  // ==========================================================
  // CATEGORY PRESS
  // ==========================================================
  /**
   * Scroll to the selected category.
   */
  const handleCategoryPress =
    useCallback(
      (
        categoryId: number,
      ) => {

        setSelectedCategoryId(
          categoryId,
        );


        const position =
          categoryPositions.current[
            categoryId
          ];


        /**
         * The category may not have been measured yet.
         *
         * In that case we simply don't scroll.
         *
         * This can happen during the first render.
         */
        if (
          position === undefined
        ) {
          return;
        }


        scrollViewRef.current?.scrollTo({
          y: Math.max(
            0,
            position - 8,
          ),

          animated: true,
        });

      },
      [],
    );


  // ==========================================================
  // ADD MENU ITEM
  // ==========================================================

  const handleAddItem =
    useCallback(
      (
        item: MenuItem,
      ) => {

        /**
         * Cart functionality will be implemented later.
         *
         * For now we simply keep the callback ready.
         */
        console.log(
          'Add menu item:',
          item.menuItemId,
        );

      },
      [],
    );


  // ==========================================================
  // LOAD MORE
  // ==========================================================
  /**
   * Called when the last visible item of a category
   * approaches the bottom.
   */
  const handleLoadMore =
    useCallback(
      (
        categoryId: number,
      ) => {

        loadMore(
          categoryId,
        );

      },
      [
        loadMore,
      ],
    );


  // ==========================================================
  // LOADING SCREEN
  // ==========================================================

  if (loading) {

    return (
      <View
        style={
          styles.loaderContainer
        }>

        <ActivityIndicator
          size="large"
          color={
            Colors.orangePrimary
          }
        />

      </View>
    );

  }


  // ==========================================================
  // SCREEN
  // ==========================================================

  return (
    <View
      style={styles.container}>

      <ScrollView
        ref={
          scrollViewRef
        }
        showsVerticalScrollIndicator={
          false
        }
        refreshControl={
          <RefreshControl
            refreshing={
              refreshing
            }
            onRefresh={
              refresh
            }
          />
        }
        contentContainerStyle={
          styles.scrollContent
        }>

        {/* ==================================================
            RESTAURANT HEADER
        ================================================== */}

        <View
          style={
            styles.restaurantHeader
          }>

          {/* ------------------------------------------------
              RESTAURANT NAME
          ------------------------------------------------ */}

          <AppText
            numberOfLines={2}
            style={
              styles.restaurantName
            }>

            {
              restaurant.restaurantName
            }

          </AppText>


          {/* ------------------------------------------------
              ADDRESS
          ------------------------------------------------ */}

          <AppText
            numberOfLines={2}
            style={
              styles.restaurantAddress
            }>

            {
              restaurant.address
            }

          </AppText>


          {/* ------------------------------------------------
              CITY / STATE
          ------------------------------------------------ */}

          <AppText
            style={
              styles.location
            }>

            {
              restaurant.city
            }
            {restaurant.state
              ? `, ${restaurant.state}`
              : ''}

          </AppText>


          {/* ------------------------------------------------
              RATING + REVIEWS
          ------------------------------------------------ */}

          <View
            style={
              styles.restaurantMeta
            }>

            <View
              style={
                styles.ratingBadge
              }>

              <AppText
                style={
                  styles.ratingText
                }>

                ★{' '}
                {Number(
                  restaurant.rating ??
                    0,
                ).toFixed(1)}

              </AppText>

            </View>


            <AppText
              style={
                styles.reviewText
              }>

              {
                restaurant.totalReviews
              }{' '}
              reviews

            </AppText>


            {restaurant.pureVeg && (
              <View
                style={
                  styles.vegBadge
                }>

                <AppText
                  style={
                    styles.vegBadgeText
                  }>

                  PURE VEG

                </AppText>

              </View>
            )}

          </View>

        </View>


        {/* ==================================================
            CATEGORY PILLS
        ================================================== */}

        {sortedCategories.length >
          0 && (

          <View
            style={
              styles.categoryContainer
            }>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={
                false
              }
              contentContainerStyle={
                styles.categoryScroll
              }>

              {sortedCategories.map(
                category => {

                  const isSelected =
                    activeCategoryId ===
                    category.menuCategoryId;


                  return (
                    <TouchableOpacity
                      key={
                        category.menuCategoryId
                      }
                      activeOpacity={
                        0.8
                      }
                      onPress={() =>
                        handleCategoryPress(
                          category.menuCategoryId,
                        )
                      }
                      style={[
                        styles.categoryPill,

                        isSelected &&
                          styles.selectedCategoryPill,
                      ]}>

                      <AppText
                        numberOfLines={
                          1
                        }
                        style={[
                          styles.categoryText,

                          isSelected &&
                            styles.selectedCategoryText,
                        ]}>

                        {
                          category.categoryName
                        }

                      </AppText>

                    </TouchableOpacity>
                  );

                },
              )}

            </ScrollView>

          </View>

        )}


        {/* ==================================================
            MENU SECTIONS
        ================================================== */}

        <View
          style={
            styles.menuContainer
          }>

          {sortedCategories.map(
            category => {

              const categoryId =
                category.menuCategoryId;

              const items =
                menuItemsByCategory[
                  categoryId
                ] ?? [];

              const loadingMore =
                loadingMoreByCategory[
                  categoryId
                ] ?? false;


              return (
                <View
                  key={
                    categoryId
                  }
                  onLayout={
                    event => {

                      const {
                        y,
                      } =
                        event.nativeEvent
                          .layout;

                      handleCategoryLayout(
                        categoryId,
                        y,
                      );

                    }
                  }>

                  {/* ========================================
                      CATEGORY HEADING
                  ======================================== */}

                  <View
                    style={
                      styles.categoryHeading
                    }>

                    <AppText
                      style={
                        styles.categoryTitle
                      }>

                      {
                        category.categoryName
                      }

                    </AppText>


                    {category.totalItems !==
                      null && (

                      <AppText
                        style={
                          styles.categoryCount
                        }>

                        {
                          category.totalItems
                        }{' '}
                        items

                      </AppText>

                    )}

                  </View>


                  {/* ========================================
                      MENU ITEMS
                  ======================================== */}

                  {items.length > 0 ? (

                    items.map(
                      item => (

                        <MenuItemCard
                          key={
                            item.menuItemId
                          }
                          item={
                            item
                          }
                          onAdd={
                            handleAddItem
                          }
                        />

                      ),
                    )

                  ) : (

                    <AppText
                      style={
                        styles.emptyText
                      }>

                      No items available
                      in this category.

                    </AppText>

                  )}


                  {/* ========================================
                      LOAD MORE
                  ======================================== */}

                  {loadingMore && (

                    <ActivityIndicator
                      size="small"
                      color={
                        Colors.orangePrimary
                      }
                      style={
                        styles.categoryLoader
                      }
                    />

                  )}


                  {/* ========================================
                      LOAD MORE BUTTON
                  ======================================== */}

                  {!loadingMore &&
                    items.length >= 10 && (

                    <TouchableOpacity
                      activeOpacity={
                        0.8
                      }
                      style={
                        styles.loadMoreButton
                      }
                      onPress={() =>
                        handleLoadMore(
                          categoryId,
                        )
                      }>

                      <AppText
                        style={
                          styles.loadMoreText
                        }>

                        Load More

                      </AppText>

                    </TouchableOpacity>

                  )}

                </View>
              );

            },
          )}

        </View>

      </ScrollView>

    </View>
  );
};


// ============================================================
// EXPORT
// ============================================================

export default React.memo(
  MenuScreen,
);


// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({

  // ==========================================================
  // CONTAINER
  // ==========================================================

  container: {
    flex: 1,

    backgroundColor:
      Colors.background100,
  },


  scrollContent: {
    paddingBottom: 120,
  },


  // ==========================================================
  // LOADER
  // ==========================================================

  loaderContainer: {
    flex: 1,

    justifyContent:
      'center',

    alignItems:
      'center',

    backgroundColor:
      Colors.background100,
  },


  // ==========================================================
  // RESTAURANT HEADER
  // ==========================================================

  restaurantHeader: {
    backgroundColor:
      Colors.white,

    paddingHorizontal:
      Spacing.md,

    paddingTop:
      Spacing.lg,

    paddingBottom:
      Spacing.lg,

    borderBottomWidth: 1,

    borderBottomColor:
      Colors.background500,
  },


  restaurantName: {
    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.h1,

    lineHeight: 34,

    color:
      Colors.black,
  },


  restaurantAddress: {
    marginTop:
      Spacing.xs,

    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.body,

    lineHeight: 21,

    color:
      Colors.neutral700,
  },


  location: {
    marginTop:
      4,

    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.small,

    color:
      Colors.neutral500,
  },


  restaurantMeta: {
    flexDirection:
      'row',

    alignItems:
      'center',

    marginTop:
      Spacing.sm,
  },


  ratingBadge: {
    backgroundColor:
      Colors.success700,

    borderRadius:
      Radius.md,

    paddingHorizontal:
      9,

    paddingVertical:
      5,
  },


  ratingText: {
    color:
      Colors.white,

    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.small,
  },


  reviewText: {
    marginLeft:
      Spacing.sm,

    fontFamily:
      Fonts.interMedium,

    fontSize:
      Typography.small,

    color:
      Colors.neutral600,
  },


  vegBadge: {
    marginLeft:
      Spacing.sm,

    backgroundColor:
      '#E8F5E9',

    borderRadius:
      Radius.md,

    paddingHorizontal:
      9,

    paddingVertical:
      5,
  },


  vegBadgeText: {
    color:
      Colors.success700,

    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.extraSmall,
  },


  // ==========================================================
  // CATEGORY PILLS
  // ==========================================================

  categoryContainer: {
    backgroundColor:
      Colors.white,

    borderBottomWidth: 1,

    borderBottomColor:
      Colors.background500,
  },


  categoryScroll: {
    paddingHorizontal:
      Spacing.md,

    paddingVertical:
      Spacing.sm,
  },


  categoryPill: {
    backgroundColor:
      Colors.background200,

    borderRadius:
      Radius.lg,

    paddingHorizontal:
      Spacing.md,

    paddingVertical:
      9,

    marginRight:
      Spacing.sm,

    borderWidth: 1,

    borderColor:
      Colors.background300,
  },


  selectedCategoryPill: {
    backgroundColor:
      Colors.orangePrimary,

    borderColor:
      Colors.orangePrimary,
  },


  categoryText: {
    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.small,

    color:
      Colors.neutral700,
  },


  selectedCategoryText: {
    color:
      Colors.white,
  },


  // ==========================================================
  // MENU
  // ==========================================================

  menuContainer: {
    paddingHorizontal:
      Spacing.md,
  },


  categoryHeading: {
    paddingTop:
      Spacing.xl,

    paddingBottom:
      Spacing.md,

    flexDirection:
      'row',

    alignItems:
      'baseline',
  },


  categoryTitle: {
    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.h2,

    color:
      Colors.black,
  },


  categoryCount: {
    marginLeft:
      Spacing.sm,

    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.small,

    color:
      Colors.neutral500,
  },


  // ==========================================================
  // EMPTY STATE
  // ==========================================================

  emptyText: {
    paddingVertical:
      Spacing.md,

    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.small,

    color:
      Colors.neutral500,
  },


  // ==========================================================
  // PAGINATION
  // ==========================================================

  categoryLoader: {
    marginVertical:
      Spacing.md,
  },


  loadMoreButton: {
    alignSelf:
      'center',

    paddingHorizontal:
      Spacing.lg,

    paddingVertical:
      Spacing.sm,

    marginBottom:
      Spacing.md,

    borderRadius:
      Radius.lg,

    backgroundColor:
      Colors.background200,
  },


  loadMoreText: {
    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.small,

    color:
      Colors.orangePrimary,
  },

});