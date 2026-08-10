import React, {useCallback} from 'react';

import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';

import MainLayout from '../../component/MainLayout';
import AppText from '../../component/AppText/AppText';

import {
  Colors,
  Fonts,
  Spacing,
  Typography,
} from '../../theme';

import useRestaurants from './useRestaurants';
import useStories from './useStories';

import HomeHeader from './HomeHeader';
import RestaurantBanner from './RestaurantBanner';
import RestaurantCard from './RestaurantCard';
import RestaurantStories from './RestaurantStories';

import {Restaurant} from '../../api/services/restaurantList/Restaurant';

import {useNavigation} from '@react-navigation/native';

import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import type {HomeStackParamList} from '../../navigation/types';


// =====================================================
// NAVIGATION TYPE
// =====================================================

type HomeNavigationProp =
  NativeStackNavigationProp<
    HomeStackParamList
  >;


// =====================================================
// HOME SCREEN
// =====================================================

const HomeScreen = () => {

  // ===================================================
  // NAVIGATION
  // ===================================================
  //
  // IMPORTANT:
  // Hooks must always be called before any
  // conditional return.
  //
  // ===================================================

  const navigation =
    useNavigation<HomeNavigationProp>();


  // ===================================================
  // RESTAURANTS
  // ===================================================

  const {
    restaurants,
    loading,
    loadingMore,
    refreshing,
    refresh,
    loadMore,
  } = useRestaurants();


  // ===================================================
  // STORIES
  // ===================================================

  const {
    stories,
    refresh: refreshStories,
  } = useStories();


  // ===================================================
  // OPEN MENU SCREEN
  // ===================================================
  //
  // We pass the COMPLETE restaurant object.
  //
  // MenuScreen will receive it through:
  //
  // route.params.restaurant
  //
  // ===================================================

  const openMenuScreen = useCallback(
    (restaurant: Restaurant) => {

      navigation.navigate(
        'MenuScreen',
        {
          restaurant,
        },
      );

    },
    [navigation],
  );


  // ===================================================
  // RESTAURANT CARD
  // ===================================================
  //
  // This is used for every restaurant
  // displayed in the "Near You" grid.
  //
  // ===================================================

  const renderItem = useCallback(
    ({item}: {item: Restaurant}) => {

      return (
        <RestaurantCard
          restaurant={item}
          onPress={() =>
            openMenuScreen(item)
          }
        />
      );

    },
    [openMenuScreen],
  );


  // ===================================================
  // KEY EXTRACTOR
  // ===================================================

  const keyExtractor = useCallback(
    (item: Restaurant) =>
      item.restaurantId.toString(),
    [],
  );


  // ===================================================
  // INITIAL RESTAURANT LOADING
  // ===================================================

  if (loading) {

    return (
      <MainLayout>

        <View style={styles.loader}>

          <ActivityIndicator
            size="large"
            color={
              Colors.orangePrimary
            }
          />

        </View>

      </MainLayout>
    );
  }


  // ===================================================
  // HOME
  // ===================================================

  return (
    <MainLayout>

      <FlatList

        /*
         * =================================================
         * RESTAURANT DATA
         * =================================================
         *
         * The first restaurant is displayed as
         * the featured banner.
         *
         * Therefore we remove it from the grid.
         */

        data={
          restaurants.slice(1)
        }


        /*
         * =================================================
         * RESTAURANT CARD
         * =================================================
         */

        renderItem={
          renderItem
        }


        /*
         * =================================================
         * KEY
         * =================================================
         */

        keyExtractor={
          keyExtractor
        }


        /*
         * =================================================
         * TWO COLUMN GRID
         * =================================================
         */

        numColumns={2}


        /*
         * =================================================
         * UI
         * =================================================
         */

        showsVerticalScrollIndicator={
          false
        }

        contentContainerStyle={
          styles.list
        }

        columnWrapperStyle={
          styles.row
        }


        /*
         * =================================================
         * HEADER
         * =================================================
         *
         * Everything above the restaurant
         * grid is rendered here.
         */

        ListHeaderComponent={

          <View>

            {/* =========================================
                HOME HEADER
            ========================================= */}

            <HomeHeader />


            {/* =========================================
                STORIES
            =========================================
            
                Always render RestaurantStories.

                Even when the API returns:

                results: []

                "Your Story" must still be visible.
            ========================================= */}

            <RestaurantStories
              stories={
                stories
              }

              onStoryCreated={
                refreshStories
              }
            />


            {/* =========================================
                FEATURED RESTAURANT
            =========================================
            
                The first restaurant is the featured
                restaurant.

                Clicking it opens MenuScreen.
            ========================================= */}

            {restaurants.length > 0 && (

              <RestaurantBanner
                restaurant={
                  restaurants[0]
                }

                onPress={() =>
                  openMenuScreen(
                    restaurants[0],
                  )
                }
              />

            )}


            {/* =========================================
                NEAR YOU HEADER
            ========================================= */}

            <View
              style={
                styles.sectionHeader
              }>

              <AppText
                style={
                  styles.sectionTitle
                }>

                Near You

              </AppText>


              <AppText
                style={
                  styles.seeAll
                }>

                See All

              </AppText>

            </View>

          </View>
        }


        /*
         * =================================================
         * PULL TO REFRESH
         * =================================================
         */

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


        /*
         * =================================================
         * PAGINATION
         * =================================================
         */

        onEndReached={
          loadMore
        }

        onEndReachedThreshold={
          0.5
        }


        /*
         * =================================================
         * PAGINATION LOADER
         * =================================================
         */

        ListFooterComponent={

          loadingMore ? (

            <ActivityIndicator
              size="small"
              color={
                Colors.orangePrimary
              }
              style={
                styles.footerLoader
              }
            />

          ) : null

        }

      />

    </MainLayout>
  );
};


// =====================================================
// EXPORT
// =====================================================

export default HomeScreen;


// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({

  // ===================================================
  // LIST
  // ===================================================

  list: {
    paddingHorizontal:
      Spacing.md,

    paddingBottom:
      120,
  },


  // ===================================================
  // INITIAL LOADER
  // ===================================================

  loader: {
    flex: 1,

    justifyContent:
      'center',

    alignItems:
      'center',
  },


  // ===================================================
  // RESTAURANT GRID ROW
  // ===================================================

  row: {
    justifyContent:
      'space-between',

    marginBottom:
      Spacing.md,
  },


  // ===================================================
  // NEAR YOU HEADER
  // ===================================================

  sectionHeader: {
    flexDirection:
      'row',

    justifyContent:
      'space-between',

    alignItems:
      'center',

    marginTop:
      Spacing.md,

    marginBottom:
      Spacing.lg,
  },


  // ===================================================
  // SECTION TITLE
  // ===================================================

  sectionTitle: {
    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.h2,

    color:
      Colors.black,
  },


  // ===================================================
  // SEE ALL
  // ===================================================

  seeAll: {
    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.body,

    color:
      Colors.orangePrimary,
  },


  // ===================================================
  // PAGINATION LOADER
  // ===================================================

  footerLoader: {
    marginVertical: 20,
  },

});

