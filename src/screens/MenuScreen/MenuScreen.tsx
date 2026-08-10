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
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import AppText from '../../component/AppText/AppText';
import BackIcon from '../../assets/icons/ic_back.svg';
import ShareIcon from '../../assets/icons/ic_share.svg';
import FavoriteIcon from '../../assets/icons/ic_favorites.svg';
import LocationIcon from '../../assets/icons/ic_loc.svg';
import BookIcon from '../../assets/icons/ic_book.svg';
import CallIcon from '../../assets/icons/ic_call.svg';
import ClockIcon from '../../assets/icons/ic_clock.svg';
import StarIcon from '../../assets/icons/ic_star.svg';

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
  MenuItem,
} from '../../api/services/menu/Menu';

import useMenu from './useMenu';

import type {
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import type {
  HomeStackParamList,
} from '../../navigation/types';



// ============================================================
// PROPS
// ============================================================

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
  // SAFE AREA
  // ==========================================================
  //
  // This makes sure the screen starts below the Dynamic Island
  // / camera hinge area on iPhone.
  //
  const insets =
    useSafeAreaInsets();


  // ==========================================================
  // RESTAURANT
  // ==========================================================
  //
  // We receive the complete restaurant object from HomeScreen.
  //
  const restaurant =
    route.params.restaurant;


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

  const scrollViewRef =
    useRef<ScrollView | null>(
      null,
    );


  // ==========================================================
  // CATEGORY POSITIONS
  // ==========================================================
  //
  // Stores the vertical position of every category.
  //
  const categoryPositions =
    useRef<{
      [categoryId: number]: number;
    }>({});


  // ==========================================================
  // SELECTED CATEGORY
  // ==========================================================

  const [
    selectedCategoryId,
    setSelectedCategoryId,
  ] = useState<number | null>(
    null,
  );


  // ==========================================================
  // SORT CATEGORIES
  // ==========================================================
  //
  // We don't modify the API response directly.
  //
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

          return (
            orderA - orderB
          );
        },
      );

    }, [
      categories,
    ]);


  // ==========================================================
  // ACTIVE CATEGORY
  // ==========================================================

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
  //
  // When a category pill is pressed, scroll to that category.
  //
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

        /*
         * The category may not have been measured yet.
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
  //
  // Cart functionality will be implemented later.
  //
  const handleAddItem =
    useCallback(
      (
        item: MenuItem,
      ) => {

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
  // BACK BUTTON
  // ==========================================================

  const handleBack =
    useCallback(() => {
      navigation.goBack();
    }, [
      navigation,
    ]);


  // ==========================================================
  // LOADING SCREEN
  // ==========================================================

  if (loading) {

    return (
      <View
        style={[
          styles.loaderContainer,
          {
            paddingTop:
              insets.top,
          },
        ]}>

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
            tintColor={
              Colors.orangePrimary
            }
          />
        }
        contentContainerStyle={
          styles.scrollContent
        }>

        {/* ==================================================
            RESTAURANT HERO
        ================================================== */}

        <View
          style={[
            styles.heroContainer,
            {
              paddingTop:
                insets.top,
            },
          ]}>

          {/* ------------------------------------------------
              RESTAURANT COVER IMAGE
          ------------------------------------------------ */}

          {restaurant.coverImageUrl ? (

            <Image
              source={{
                uri:
                  restaurant.coverImageUrl,
              }}
              resizeMode="cover"
              style={
                styles.coverImage
              }
            />

          ) : (

            <View
              style={
                styles.coverPlaceholder
              }
            />

          )}


          {/* ------------------------------------------------
              IMAGE OVERLAY
          ------------------------------------------------ */}

          <View
            style={
              styles.heroOverlay
            }
          />


          {/* ------------------------------------------------
              BACK BUTTON
          ------------------------------------------------ */}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={
              handleBack
            }
            style={[
              styles.headerButton,
              styles.backButton,
              {
                top:
                  insets.top +
                  Spacing.sm,
              },
            ]}>

            <BackIcon
              width={24}
              height={24}
            />

          </TouchableOpacity>


          {/* ------------------------------------------------
              SHARE BUTTON
          ------------------------------------------------ */}

          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.headerButton,
              styles.shareButton,
              {
                top:
                  insets.top +
                  Spacing.sm,
              },
            ]}>

            <ShareIcon
              width={24}
              height={24}
            />

          </TouchableOpacity>


          {/* ------------------------------------------------
              FAVOURITE BUTTON
          ------------------------------------------------ */}

          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.headerButton,
              styles.favoriteButton,
              {
                top:
                  insets.top +
                  Spacing.sm,
              },
            ]}>

            <FavoriteIcon
              width={24}
              height={24}
            />

          </TouchableOpacity>


          {/* =================================================
              RESTAURANT INFORMATION CARD
          ================================================= */}

          <View
            style={
              styles.restaurantCard
            }>

            {/* ------------------------------------------------
                RESTAURANT NAME + RATING
            ------------------------------------------------ */}

            <View
              style={
                styles.nameRatingRow
              }>

              <AppText
                numberOfLines={2}
                style={
                  styles.restaurantName
                }>

                {
                  restaurant.restaurantName
                }

              </AppText>


              <View
                style={
                  styles.ratingBadge
                }>

                <StarIcon
                  width={12}
                  height={12}
                />
                <AppText
                  style={styles.ratingText}>
                  {Number(restaurant.rating ?? 0) === 0
                    ? 'New'
                    : Number(restaurant.rating).toFixed(1)}
                </AppText>
              </View>

            </View>


            {/* ------------------------------------------------
                CUISINE
            ------------------------------------------------ */}

            {!!restaurant.cuisine && (

              <AppText
                numberOfLines={1}
                style={
                  styles.cuisineText
                }>

                {
                  restaurant.cuisine
                }

              </AppText>

            )}


            {/* ------------------------------------------------
                RESTAURANT META
            ------------------------------------------------ */}

            <View
              style={
                styles.infoRow
              }>

              <ClockIcon
                width={14}
                height={14}
              />

              <AppText
                numberOfLines={1}
                style={styles.infoText}>
                {restaurant.openingTime ?? '--:--'}{' '}
                -{' '}
                {restaurant.closingTime ?? '--:--'}
              </AppText>
              


             <View style={styles.infoRow}>
              <LocationIcon
                width={14}
                height={14}
              />

              <AppText
                numberOfLines={1}
                style={styles.infoText}>
                {restaurant.city ?? ''}
              </AppText>
            </View>

              

            </View>


            {/* ------------------------------------------------
                BOOK + CALL
            ------------------------------------------------ */}

            <View
              style={
                styles.actionRow
              }>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.primaryButton}
              >
                <View style={styles.primaryButtonContent}>

                  <BookIcon
                    width={18}
                    height={18}
                  />

                  <AppText
                    style={styles.primaryButtonText}>
                    Book a table
                  </AppText>

                </View>
              </TouchableOpacity>


              <TouchableOpacity
                activeOpacity={0.8}
                style={
                  styles.secondaryButton
                }>

                <View style={styles.secondaryButtonContent}>

                  <CallIcon
                    width={18}
                    height={18}
                  />

                <AppText
                  style={
                    styles.secondaryButtonText
                  }>
                  Call
                </AppText>
                </View>

              </TouchableOpacity>

            </View>

          </View>

        </View>


        {/* ==================================================
            SPACE AFTER OVERLAPPING RESTAURANT CARD
        ================================================== */}

        <View
          style={
            styles.heroBottomSpace
          }
        />


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

                        <View
                          key={
                            item.menuItemId
                          }
                          style={
                            styles.menuItemCard
                          }>

                          {/* --------------------------------
                              ITEM TITLE ROW
                          -------------------------------- */}

                          <View
                            style={
                              styles.menuItemTitleRow
                            }>

                            <View
                              style={
                                styles.menuItemTitleContainer
                              }>

                              <AppText
                                numberOfLines={
                                  2
                                }
                                style={
                                  styles.menuItemTitle
                                }>

                                {
                                  item.itemName
                                }

                              </AppText>


                              {/* VEG INDICATOR */}

                              {item.veg && (

                                <View
                                  style={
                                    styles.vegIndicator
                                  }>

                                  <View
                                    style={
                                      styles.vegDot
                                    }
                                  />

                                </View>

                              )}

                            </View>


                            {/* ADD BUTTON */}

                            <TouchableOpacity
                              activeOpacity={
                                0.8
                              }
                              style={
                                styles.addButton
                              }
                              onPress={() =>
                                handleAddItem(
                                  item,
                                )
                              }>

                              <AppText
                                style={
                                  styles.addButtonText
                                }>
                                +
                              </AppText>

                            </TouchableOpacity>

                          </View>


                          {/* --------------------------------
                              FEATURED BADGE
                          -------------------------------- */}

                          {item.featured && (

                            <View
                              style={
                                styles.featuredBadge
                              }>

                              <AppText
                                style={
                                  styles.featuredText
                                }>

                                ★ FEATURED

                              </AppText>

                            </View>

                          )}


                          {/* --------------------------------
                              SPICY BADGE
                          -------------------------------- */}

                          {item.spicy && (

                            <View
                              style={
                                styles.spicyBadge
                              }>

                              <AppText
                                style={
                                  styles.spicyText
                                }>

                                🌶 SPICY

                              </AppText>

                            </View>

                          )}


                          {/* --------------------------------
                              DESCRIPTION
                          -------------------------------- */}

                          {!!item.description && (

                            <AppText
                              numberOfLines={
                                2
                              }
                              style={
                                styles.menuItemDescription
                              }>

                              {
                                item.description
                              }

                            </AppText>

                          )}


                          {/* --------------------------------
                              PRICE
                          -------------------------------- */}

                          <View
                            style={
                              styles.priceRow
                            }>

                            <AppText
                              style={
                                styles.currentPrice
                              }>

                              $
                              {Number(
                                item.discountedPrice ??
                                  item.price ??
                                  0,
                              ).toFixed(2)}

                            </AppText>


                            {item.discountedPrice !==
                              null &&
                              item.discountedPrice !==
                                undefined &&
                              Number(
                                item.discountedPrice,
                              ) <
                                Number(
                                  item.price,
                                ) && (

                              <AppText
                                style={
                                  styles.originalPrice
                                }>

                                $
                                {Number(
                                  item.price ??
                                    0,
                                ).toFixed(2)}

                              </AppText>

                            )}

                          </View>

                        </View>

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
  // MAIN CONTAINER
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
  // RESTAURANT HERO
  // ==========================================================

  heroContainer: {
    height: 405,

    position: 'relative',

    backgroundColor:
      Colors.background300,
  },


  coverImage: {
    position: 'absolute',

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    width: '100%',
    height: '100%',
  },


  coverPlaceholder: {
    position: 'absolute',

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor:
      Colors.background300,
  },


  heroOverlay: {
    position: 'absolute',

    top: 0,
    left: 0,
    right: 0,

    height: 120,

    backgroundColor:
      'rgba(0,0,0,0.12)',
  },


  // ==========================================================
  // TOP BUTTONS
  // ==========================================================

  headerButton: {
    position: 'absolute',

    width: 48,
    height: 48,

    borderRadius: 24,

    backgroundColor:
      Colors.white,

    justifyContent:
      'center',

    alignItems:
      'center',

    zIndex: 10,
  },


  backButton: {
    left: Spacing.md,
  },


  shareButton: {
    right: 72,
  },


  favoriteButton: {
    right: Spacing.md,
  },


  backIcon: {
    fontFamily:
      Fonts.interRegular,

    fontSize: 34,

    lineHeight: 36,

    color:
      Colors.black,

    marginTop: -3,
  },


  headerIcon: {
    fontFamily:
      Fonts.interRegular,

    fontSize: 26,

    lineHeight: 30,

    color:
      Colors.black,
  },


  // ==========================================================
  // RESTAURANT CARD
  // ==========================================================

  restaurantCard: {
    position: 'absolute',

    left: Spacing.md,
    right: Spacing.md,

    bottom: -30,

    backgroundColor:
      Colors.white,

    borderRadius:
      Radius.xl,

    paddingHorizontal:
      Spacing.md,

    paddingTop:
      Spacing.lg,

    paddingBottom:
      Spacing.md,

    borderWidth: 1,

    borderColor:
      Colors.background400,

    shadowColor:
      Colors.black,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.08,

    shadowRadius: 8,

    elevation: 3,

    zIndex: 5,
  },


  nameRatingRow: {
    flexDirection:
      'row',

    alignItems:
      'center',

    justifyContent:
      'space-between',
  },


  restaurantName: {
    flex: 1,

    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.h1,

    lineHeight: 32,

    color:
      Colors.black,

    marginRight:
      Spacing.sm,
  },


  ratingBadge: {
    flexDirection:
      'row',

    alignItems:
      'center',

    backgroundColor:
      Colors.warning100,

    borderRadius:
      Radius.lg,

    paddingHorizontal:
      12,

    paddingVertical:
      7,
  },


  ratingText: {
    marginLeft: Spacing.xs,
    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.small,

    color:
      Colors.neutral900,
  },


  cuisineText: {
    marginTop:
      Spacing.xs,

    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.body,

    color:
      Colors.neutral700,
  },


  infoRow: {
    flexDirection:'row',
    alignItems:'center',
    gap: 5,
    marginTop: Spacing.xs,
  },


  infoText: {
    flexShrink: 1,
    fontFamily:Fonts.interRegular,
    fontSize:Typography.small,
    color:Colors.neutral700,
  },


  // ==========================================================
  // ACTION BUTTONS
  // ==========================================================

  actionRow: {
    flexDirection:
      'row',

    marginTop:
      Spacing.lg,

    gap: Spacing.sm,
  },


  primaryButton: {
    flex: 1,

    height: 46,

    borderRadius:
      Radius.xl,

    backgroundColor:
      Colors.orangePrimary,

    justifyContent:
      'center',

    alignItems:
      'center',
  },

    primaryButtonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },

  primaryButtonText: {
    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.body,

    color:
      Colors.white,
  },


  secondaryButton: {
    flex: 1,

    height: 46,

    borderRadius:
      Radius.xl,

    backgroundColor:
      Colors.background200,

    justifyContent:
      'center',

    alignItems:
      'center',
  },


  secondaryButtonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },

  secondaryButtonText: {
    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.body,

    color:
      Colors.black,
  },


  // ==========================================================
  // SPACE BELOW HERO
  // ==========================================================

  heroBottomSpace: {
    height: 48,
  },


  // ==========================================================
  // CATEGORY PILLS
  // ==========================================================

  categoryContainer: {
    backgroundColor:
      Colors.background100,

    paddingBottom:
      Spacing.sm,
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
  // MENU CONTAINER
  // ==========================================================

  menuContainer: {
    paddingHorizontal:
      Spacing.md,
  },


  // ==========================================================
  // CATEGORY HEADING
  // ==========================================================

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
  // MENU ITEM CARD
  // ==========================================================
  //
  // IMPORTANT:
  // There is intentionally NO Image component here.
  //
  // This matches the Figma design where menu items are
  // text-based cards with an orange + button.
  //

  menuItemCard: {
    backgroundColor:
      Colors.white,

    borderRadius:
      Radius.xl,

    borderWidth: 1,

    borderColor:
      Colors.background400,

    paddingHorizontal:
      Spacing.md,

    paddingVertical:
      Spacing.md,

    marginBottom:
      Spacing.md,
  },


  menuItemTitleRow: {
    flexDirection:
      'row',

    alignItems:
      'center',

    justifyContent:
      'space-between',
  },


  menuItemTitleContainer: {
    flex: 1,

    flexDirection:
      'row',

    alignItems:
      'center',

    marginRight:
      Spacing.sm,
  },


  menuItemTitle: {
    flexShrink: 1,

    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.body,

    lineHeight: 22,

    color:
      Colors.black,
  },


  // ==========================================================
  // VEG INDICATOR
  // ==========================================================

  vegIndicator: {
    width: 17,
    height: 17,

    borderWidth: 2,

    borderColor:
      '#35A853',

    marginLeft:
      Spacing.xs,

    justifyContent:
      'center',

    alignItems:
      'center',
  },


  vegDot: {
    width: 7,
    height: 7,

    borderRadius: 4,

    backgroundColor:
      '#35A853',
  },


  // ==========================================================
  // ADD BUTTON
  // ==========================================================

  addButton: {
    width: 48,
    height: 48,

    borderRadius: 24,

    backgroundColor:
      Colors.orangePrimary,

    justifyContent:
      'center',

    alignItems:
      'center',
  },


  addButtonText: {
    fontFamily:
      Fonts.interRegular,

    fontSize: 30,

    lineHeight: 32,

    color:
      Colors.white,

    marginTop: -2,
  },


  // ==========================================================
  // FEATURED BADGE
  // ==========================================================

  featuredBadge: {
    alignSelf:
      'flex-start',

    marginTop:
      Spacing.xs,

    paddingHorizontal:
      8,

    paddingVertical:
      4,

    borderRadius:
      Radius.md,

    backgroundColor:
      '#FFF0F0',
  },


  featuredText: {
    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.extraSmall,

    color:
      '#C62828',
  },


  // ==========================================================
  // SPICY BADGE
  // ==========================================================

  spicyBadge: {
    alignSelf:
      'flex-start',

    marginTop:
      Spacing.xs,

    paddingHorizontal:
      8,

    paddingVertical:
      4,

    borderRadius:
      Radius.md,

    backgroundColor:
      '#FFF0F0',
  },


  spicyText: {
    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.extraSmall,

    color:
      '#C62828',
  },


  // ==========================================================
  // DESCRIPTION
  // ==========================================================

  menuItemDescription: {
    marginTop:
      Spacing.sm,

    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.small,

    lineHeight: 20,

    color:
      Colors.neutral700,
  },


  // ==========================================================
  // PRICE
  // ==========================================================

  priceRow: {
    flexDirection:
      'row',

    alignItems:
      'center',

    marginTop:
      Spacing.sm,
  },


  currentPrice: {
    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.body,

    color:
      Colors.black,
  },


  originalPrice: {
    marginLeft:
      Spacing.sm,

    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.small,

    color:
      Colors.neutral500,

    textDecorationLine:
      'line-through',
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

// /**
//  * ============================================================
//  * MENU SCREEN
//  * ============================================================
//  *
//  * Displays the complete menu of a selected restaurant.
//  *
//  * Data flow:
//  *
//  * HomeScreen
//  *     ↓
//  * complete Restaurant object
//  *     ↓
//  * MenuScreen
//  *     ↓
//  * useMenu
//  *     ↓
//  * categories + menu items
//  *
//  * ============================================================
//  */

// import React, {
//   useCallback,
//   useMemo,
//   useRef,
//   useState,
// } from 'react';

// import {
//   ActivityIndicator,
//   RefreshControl,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// import AppText from '../../component/AppText/AppText';

// import {
//   Colors,
//   Fonts,
//   Radius,
//   Spacing,
//   Typography,
// } from '../../theme';

// import {
//   Restaurant,
// } from '../../api/services/restaurantList/Restaurant';

// import {
//   MenuCategory,
//   MenuItem,
// } from '../../api/services/menu/Menu';

// import useMenu from './useMenu';

// import MenuItemCard from './MenuItemCard';
// import type {NativeStackScreenProps,} from '@react-navigation/native-stack';
// import type {HomeStackParamList,} from '../../navigation/types';

// // ============================================================
// // PROPS
// // ============================================================

// // type Props = {
// //   /**
// //    * Complete restaurant object received from HomeScreen.
// //    */
// //   restaurant: Restaurant;

// //   /**
// //    * Navigation object.
// //    *
// //    * We keep this generic for now because your navigation
// //    * setup may already have its own navigation types.
// //    */
// //   navigation?: any;
// // };

// type Props =
//   NativeStackScreenProps<
//     HomeStackParamList,
//     'MenuScreen'
//   >;

// // ============================================================
// // COMPONENT
// // ============================================================

// const MenuScreen = ({
//   route,
//   navigation,
// }: Props) => {

//     // ==========================================================
//   // RESTAURANT
//   // ==========================================================
//   /**
//    * We receive the complete Restaurant object from HomeScreen.
//    *
//    * This means we don't need to call the restaurant API again
//    * just to get basic restaurant information.
//    */
//     const restaurant =route.params.restaurant;

//   // ==========================================================
//   // MENU HOOK
//   // ==========================================================

//   const {
//     categories,
//     menuItemsByCategory,
//     loading,
//     refreshing,
//     refresh,
//     loadMore,
//     loadingMoreByCategory,
//   } = useMenu(
//     restaurant.restaurantId,
//   );


//   // ==========================================================
//   // SCROLL VIEW
//   // ==========================================================
//   /**
//    * One ScrollView contains:
//    *
//    * Restaurant header
//    * Category pills
//    * Category sections
//    * Menu items
//    *
//    * We use scrollTo() when a category pill is pressed.
//    */
//   const scrollViewRef =
//     useRef<ScrollView | null>(null);


//   // ==========================================================
//   // CATEGORY POSITIONS
//   // ==========================================================
//   /**
//    * Stores the vertical position of each category.
//    *
//    * Example:
//    *
//    * {
//    *   14: 420,
//    *   15: 850
//    * }
//    *
//    * When the user taps category 15, we scroll to 850.
//    */
//   const categoryPositions =
//     useRef<{
//       [categoryId: number]: number;
//     }>({});


//   // ==========================================================
//   // SELECTED CATEGORY
//   // ==========================================================
//   /**
//    * Used to visually highlight the currently selected
//    * category pill.
//    */
//   const [
//     selectedCategoryId,
//     setSelectedCategoryId,
//   ] = useState<number | null>(
//     null,
//   );


//   // ==========================================================
//   // SORT CATEGORIES
//   // ==========================================================
//   /**
//    * The backend provides sortOrder.
//    *
//    * We create a sorted copy instead of modifying the original
//    * API response.
//    */
//   const sortedCategories =
//     useMemo(() => {

//       return [
//         ...categories,
//       ].sort(
//         (a, b) => {

//           const orderA =
//             a.sortOrder ??
//             Number.MAX_SAFE_INTEGER;

//           const orderB =
//             b.sortOrder ??
//             Number.MAX_SAFE_INTEGER;

//           return orderA - orderB;

//         },
//       );

//     }, [
//       categories,
//     ]);


//   // ==========================================================
//   // SET INITIAL CATEGORY
//   // ==========================================================
//   /**
//    * We don't need another effect here.
//    *
//    * If the user hasn't selected anything yet, the first
//    * category can simply be treated as selected in the UI.
//    */
//   const activeCategoryId =
//     selectedCategoryId ??
//     sortedCategories[0]
//       ?.menuCategoryId ??
//     null;


//   // ==========================================================
//   // CATEGORY POSITION
//   // ==========================================================

//   const handleCategoryLayout =
//     useCallback(
//       (
//         categoryId: number,
//         y: number,
//       ) => {

//         categoryPositions.current[
//           categoryId
//         ] = y;

//       },
//       [],
//     );


//   // ==========================================================
//   // CATEGORY PRESS
//   // ==========================================================
//   /**
//    * Scroll to the selected category.
//    */
//   const handleCategoryPress =
//     useCallback(
//       (
//         categoryId: number,
//       ) => {

//         setSelectedCategoryId(
//           categoryId,
//         );


//         const position =
//           categoryPositions.current[
//             categoryId
//           ];


//         /**
//          * The category may not have been measured yet.
//          *
//          * In that case we simply don't scroll.
//          *
//          * This can happen during the first render.
//          */
//         if (
//           position === undefined
//         ) {
//           return;
//         }


//         scrollViewRef.current?.scrollTo({
//           y: Math.max(
//             0,
//             position - 8,
//           ),

//           animated: true,
//         });

//       },
//       [],
//     );


//   // ==========================================================
//   // ADD MENU ITEM
//   // ==========================================================

//   const handleAddItem =
//     useCallback(
//       (
//         item: MenuItem,
//       ) => {

//         /**
//          * Cart functionality will be implemented later.
//          *
//          * For now we simply keep the callback ready.
//          */
//         console.log(
//           'Add menu item:',
//           item.menuItemId,
//         );

//       },
//       [],
//     );


//   // ==========================================================
//   // LOAD MORE
//   // ==========================================================
//   /**
//    * Called when the last visible item of a category
//    * approaches the bottom.
//    */
//   const handleLoadMore =
//     useCallback(
//       (
//         categoryId: number,
//       ) => {

//         loadMore(
//           categoryId,
//         );

//       },
//       [
//         loadMore,
//       ],
//     );


//   // ==========================================================
//   // LOADING SCREEN
//   // ==========================================================

//   if (loading) {

//     return (
//       <View
//         style={
//           styles.loaderContainer
//         }>

//         <ActivityIndicator
//           size="large"
//           color={
//             Colors.orangePrimary
//           }
//         />

//       </View>
//     );

//   }


//   // ==========================================================
//   // SCREEN
//   // ==========================================================

//   return (
//     <View
//       style={styles.container}>

//       <ScrollView
//         ref={
//           scrollViewRef
//         }
//         showsVerticalScrollIndicator={
//           false
//         }
//         refreshControl={
//           <RefreshControl
//             refreshing={
//               refreshing
//             }
//             onRefresh={
//               refresh
//             }
//           />
//         }
//         contentContainerStyle={
//           styles.scrollContent
//         }>

//         {/* ==================================================
//             RESTAURANT HEADER
//         ================================================== */}

//         <View
//           style={
//             styles.restaurantHeader
//           }>

//           {/* ------------------------------------------------
//               RESTAURANT NAME
//           ------------------------------------------------ */}

//           <AppText
//             numberOfLines={2}
//             style={
//               styles.restaurantName
//             }>

//             {
//               restaurant.restaurantName
//             }

//           </AppText>


//           {/* ------------------------------------------------
//               ADDRESS
//           ------------------------------------------------ */}

//           <AppText
//             numberOfLines={2}
//             style={
//               styles.restaurantAddress
//             }>

//             {
//               restaurant.address
//             }

//           </AppText>


//           {/* ------------------------------------------------
//               CITY / STATE
//           ------------------------------------------------ */}

//           <AppText
//             style={
//               styles.location
//             }>

//             {
//               restaurant.city
//             }
//             {restaurant.state
//               ? `, ${restaurant.state}`
//               : ''}

//           </AppText>


//           {/* ------------------------------------------------
//               RATING + REVIEWS
//           ------------------------------------------------ */}

//           <View
//             style={
//               styles.restaurantMeta
//             }>

//             <View
//               style={
//                 styles.ratingBadge
//               }>

//               <AppText
//                 style={
//                   styles.ratingText
//                 }>

//                 ★{' '}
//                 {Number(
//                   restaurant.rating ??
//                     0,
//                 ).toFixed(1)}

//               </AppText>

//             </View>


//             <AppText
//               style={
//                 styles.reviewText
//               }>

//               {
//                 restaurant.totalReviews
//               }{' '}
//               reviews

//             </AppText>


//             {restaurant.pureVeg && (
//               <View
//                 style={
//                   styles.vegBadge
//                 }>

//                 <AppText
//                   style={
//                     styles.vegBadgeText
//                   }>

//                   PURE VEG

//                 </AppText>

//               </View>
//             )}

//           </View>

//         </View>


//         {/* ==================================================
//             CATEGORY PILLS
//         ================================================== */}

//         {sortedCategories.length >
//           0 && (

//           <View
//             style={
//               styles.categoryContainer
//             }>

//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={
//                 false
//               }
//               contentContainerStyle={
//                 styles.categoryScroll
//               }>

//               {sortedCategories.map(
//                 category => {

//                   const isSelected =
//                     activeCategoryId ===
//                     category.menuCategoryId;


//                   return (
//                     <TouchableOpacity
//                       key={
//                         category.menuCategoryId
//                       }
//                       activeOpacity={
//                         0.8
//                       }
//                       onPress={() =>
//                         handleCategoryPress(
//                           category.menuCategoryId,
//                         )
//                       }
//                       style={[
//                         styles.categoryPill,

//                         isSelected &&
//                           styles.selectedCategoryPill,
//                       ]}>

//                       <AppText
//                         numberOfLines={
//                           1
//                         }
//                         style={[
//                           styles.categoryText,

//                           isSelected &&
//                             styles.selectedCategoryText,
//                         ]}>

//                         {
//                           category.categoryName
//                         }

//                       </AppText>

//                     </TouchableOpacity>
//                   );

//                 },
//               )}

//             </ScrollView>

//           </View>

//         )}


//         {/* ==================================================
//             MENU SECTIONS
//         ================================================== */}

//         <View
//           style={
//             styles.menuContainer
//           }>

//           {sortedCategories.map(
//             category => {

//               const categoryId =
//                 category.menuCategoryId;

//               const items =
//                 menuItemsByCategory[
//                   categoryId
//                 ] ?? [];

//               const loadingMore =
//                 loadingMoreByCategory[
//                   categoryId
//                 ] ?? false;


//               return (
//                 <View
//                   key={
//                     categoryId
//                   }
//                   onLayout={
//                     event => {

//                       const {
//                         y,
//                       } =
//                         event.nativeEvent
//                           .layout;

//                       handleCategoryLayout(
//                         categoryId,
//                         y,
//                       );

//                     }
//                   }>

//                   {/* ========================================
//                       CATEGORY HEADING
//                   ======================================== */}

//                   <View
//                     style={
//                       styles.categoryHeading
//                     }>

//                     <AppText
//                       style={
//                         styles.categoryTitle
//                       }>

//                       {
//                         category.categoryName
//                       }

//                     </AppText>


//                     {category.totalItems !==
//                       null && (

//                       <AppText
//                         style={
//                           styles.categoryCount
//                         }>

//                         {
//                           category.totalItems
//                         }{' '}
//                         items

//                       </AppText>

//                     )}

//                   </View>


//                   {/* ========================================
//                       MENU ITEMS
//                   ======================================== */}

//                   {items.length > 0 ? (

//                     items.map(
//                       item => (

//                         <MenuItemCard
//                           key={
//                             item.menuItemId
//                           }
//                           item={
//                             item
//                           }
//                           onAdd={
//                             handleAddItem
//                           }
//                         />

//                       ),
//                     )

//                   ) : (

//                     <AppText
//                       style={
//                         styles.emptyText
//                       }>

//                       No items available
//                       in this category.

//                     </AppText>

//                   )}


//                   {/* ========================================
//                       LOAD MORE
//                   ======================================== */}

//                   {loadingMore && (

//                     <ActivityIndicator
//                       size="small"
//                       color={
//                         Colors.orangePrimary
//                       }
//                       style={
//                         styles.categoryLoader
//                       }
//                     />

//                   )}


//                   {/* ========================================
//                       LOAD MORE BUTTON
//                   ======================================== */}

//                   {!loadingMore &&
//                     items.length >= 10 && (

//                     <TouchableOpacity
//                       activeOpacity={
//                         0.8
//                       }
//                       style={
//                         styles.loadMoreButton
//                       }
//                       onPress={() =>
//                         handleLoadMore(
//                           categoryId,
//                         )
//                       }>

//                       <AppText
//                         style={
//                           styles.loadMoreText
//                         }>

//                         Load More

//                       </AppText>

//                     </TouchableOpacity>

//                   )}

//                 </View>
//               );

//             },
//           )}

//         </View>

//       </ScrollView>

//     </View>
//   );
// };


// // ============================================================
// // EXPORT
// // ============================================================

// export default React.memo(
//   MenuScreen,
// );


// // ============================================================
// // STYLES
// // ============================================================

// const styles = StyleSheet.create({

//   // ==========================================================
//   // CONTAINER
//   // ==========================================================

//   container: {
//     flex: 1,

//     backgroundColor:
//       Colors.background100,
//   },


//   scrollContent: {
//     paddingBottom: 120,
//   },


//   // ==========================================================
//   // LOADER
//   // ==========================================================

//   loaderContainer: {
//     flex: 1,

//     justifyContent:
//       'center',

//     alignItems:
//       'center',

//     backgroundColor:
//       Colors.background100,
//   },


//   // ==========================================================
//   // RESTAURANT HEADER
//   // ==========================================================

//   restaurantHeader: {
//     backgroundColor:
//       Colors.white,

//     paddingHorizontal:
//       Spacing.md,

//     paddingTop:
//       Spacing.lg,

//     paddingBottom:
//       Spacing.lg,

//     borderBottomWidth: 1,

//     borderBottomColor:
//       Colors.background500,
//   },


//   restaurantName: {
//     fontFamily:
//       Fonts.interBold,

//     fontSize:
//       Typography.h1,

//     lineHeight: 34,

//     color:
//       Colors.black,
//   },


//   restaurantAddress: {
//     marginTop:
//       Spacing.xs,

//     fontFamily:
//       Fonts.interRegular,

//     fontSize:
//       Typography.body,

//     lineHeight: 21,

//     color:
//       Colors.neutral700,
//   },


//   location: {
//     marginTop:
//       4,

//     fontFamily:
//       Fonts.interRegular,

//     fontSize:
//       Typography.small,

//     color:
//       Colors.neutral500,
//   },


//   restaurantMeta: {
//     flexDirection:
//       'row',

//     alignItems:
//       'center',

//     marginTop:
//       Spacing.sm,
//   },


//   ratingBadge: {
//     backgroundColor:
//       Colors.success700,

//     borderRadius:
//       Radius.md,

//     paddingHorizontal:
//       9,

//     paddingVertical:
//       5,
//   },


//   ratingText: {
//     color:
//       Colors.white,

//     fontFamily:
//       Fonts.interBold,

//     fontSize:
//       Typography.small,
//   },


//   reviewText: {
//     marginLeft:
//       Spacing.sm,

//     fontFamily:
//       Fonts.interMedium,

//     fontSize:
//       Typography.small,

//     color:
//       Colors.neutral600,
//   },


//   vegBadge: {
//     marginLeft:
//       Spacing.sm,

//     backgroundColor:
//       '#E8F5E9',

//     borderRadius:
//       Radius.md,

//     paddingHorizontal:
//       9,

//     paddingVertical:
//       5,
//   },


//   vegBadgeText: {
//     color:
//       Colors.success700,

//     fontFamily:
//       Fonts.interBold,

//     fontSize:
//       Typography.extraSmall,
//   },


//   // ==========================================================
//   // CATEGORY PILLS
//   // ==========================================================

//   categoryContainer: {
//     backgroundColor:
//       Colors.white,

//     borderBottomWidth: 1,

//     borderBottomColor:
//       Colors.background500,
//   },


//   categoryScroll: {
//     paddingHorizontal:
//       Spacing.md,

//     paddingVertical:
//       Spacing.sm,
//   },


//   categoryPill: {
//     backgroundColor:
//       Colors.background200,

//     borderRadius:
//       Radius.lg,

//     paddingHorizontal:
//       Spacing.md,

//     paddingVertical:
//       9,

//     marginRight:
//       Spacing.sm,

//     borderWidth: 1,

//     borderColor:
//       Colors.background300,
//   },


//   selectedCategoryPill: {
//     backgroundColor:
//       Colors.orangePrimary,

//     borderColor:
//       Colors.orangePrimary,
//   },


//   categoryText: {
//     fontFamily:
//       Fonts.interSemiBold,

//     fontSize:
//       Typography.small,

//     color:
//       Colors.neutral700,
//   },


//   selectedCategoryText: {
//     color:
//       Colors.white,
//   },


//   // ==========================================================
//   // MENU
//   // ==========================================================

//   menuContainer: {
//     paddingHorizontal:
//       Spacing.md,
//   },


//   categoryHeading: {
//     paddingTop:
//       Spacing.xl,

//     paddingBottom:
//       Spacing.md,

//     flexDirection:
//       'row',

//     alignItems:
//       'baseline',
//   },


//   categoryTitle: {
//     fontFamily:
//       Fonts.interBold,

//     fontSize:
//       Typography.h2,

//     color:
//       Colors.black,
//   },


//   categoryCount: {
//     marginLeft:
//       Spacing.sm,

//     fontFamily:
//       Fonts.interRegular,

//     fontSize:
//       Typography.small,

//     color:
//       Colors.neutral500,
//   },


//   // ==========================================================
//   // EMPTY STATE
//   // ==========================================================

//   emptyText: {
//     paddingVertical:
//       Spacing.md,

//     fontFamily:
//       Fonts.interRegular,

//     fontSize:
//       Typography.small,

//     color:
//       Colors.neutral500,
//   },


//   // ==========================================================
//   // PAGINATION
//   // ==========================================================

//   categoryLoader: {
//     marginVertical:
//       Spacing.md,
//   },


//   loadMoreButton: {
//     alignSelf:
//       'center',

//     paddingHorizontal:
//       Spacing.lg,

//     paddingVertical:
//       Spacing.sm,

//     marginBottom:
//       Spacing.md,

//     borderRadius:
//       Radius.lg,

//     backgroundColor:
//       Colors.background200,
//   },


//   loadMoreText: {
//     fontFamily:
//       Fonts.interSemiBold,

//     fontSize:
//       Typography.small,

//     color:
//       Colors.orangePrimary,
//   },

// });