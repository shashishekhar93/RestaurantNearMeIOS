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

const HomeScreen = () => {

  // =========================================
  // RESTAURANTS
  // =========================================

  const {
    restaurants,
    loading,
    loadingMore,
    refreshing,
    refresh,
    loadMore,
  } = useRestaurants();

  // =========================================
  // STORIES
  // =========================================

  const {
    stories,
    loading: storiesLoading,
  } = useStories();

  // =========================================
  // RESTAURANT CARD
  // =========================================

  const renderItem = useCallback(
    ({item}: {item: Restaurant}) => {
      return (
        <RestaurantCard
          restaurant={item}
        />
      );
    },
    [],
  );

  // =========================================
  // KEY EXTRACTOR
  // =========================================

  const keyExtractor = useCallback(
    (item: Restaurant) =>
      item.restaurantId.toString(),
    [],
  );

  // =========================================
  // INITIAL LOADING
  // =========================================

  if (loading) {
    return (
      <MainLayout>
        <View style={styles.loader}>
          <ActivityIndicator
            size="large"
            color={Colors.orangePrimary}
          />
        </View>
      </MainLayout>
    );
  }

  // =========================================
  // HOME
  // =========================================

  return (
    <MainLayout>

      <FlatList
        /*
         * First restaurant is used as
         * the featured banner.
         *
         * Remaining restaurants are
         * displayed in the grid.
         */
        data={restaurants.slice(1)}

        renderItem={renderItem}

        keyExtractor={keyExtractor}

        numColumns={2}

        showsVerticalScrollIndicator={false}

        contentContainerStyle={styles.list}

        columnWrapperStyle={styles.row}

        /*
         * =====================================
         * HEADER
         * =====================================
         *
         * Everything before the restaurant
         * grid lives here.
         */
        ListHeaderComponent={
          <View>

            {/* =================================
                TITLE + SEARCH + FILTERS
            ================================= */}

            <HomeHeader />

            {/* =================================
                STORIES
            ================================= */}

            {!storiesLoading &&
              stories.length > 0 && (
                <RestaurantStories
                  stories={stories}
                />
              )}

            {/* =================================
                FEATURED RESTAURANT
            ================================= */}

            {restaurants.length > 0 && (
              <RestaurantBanner
                restaurant={restaurants[0]}
              />
            )}

            {/* =================================
                NEAR YOU
            ================================= */}

            <View
              style={styles.sectionHeader}>

              <AppText
                style={styles.sectionTitle}>
                Near You
              </AppText>

              <AppText
                style={styles.seeAll}>
                See All
              </AppText>

            </View>

          </View>
        }

        /*
         * =====================================
         * PULL TO REFRESH
         * =====================================
         */

        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor={
              Colors.orangePrimary
            }
          />
        }

        /*
         * =====================================
         * PAGINATION
         * =====================================
         */

        onEndReached={loadMore}

        onEndReachedThreshold={0.5}

        /*
         * =====================================
         * PAGINATION LOADER
         * =====================================
         */

        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator
              size="small"
              color={
                Colors.orangePrimary
              }
              style={styles.footerLoader}
            />
          ) : null
        }
      />

    </MainLayout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({

  // =========================================
  // LIST
  // =========================================

  list: {
    paddingHorizontal: Spacing.md,

    paddingBottom: 120,
  },

  // =========================================
  // INITIAL LOADER
  // =========================================

  loader: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },

  // =========================================
  // RESTAURANT GRID
  // =========================================

  row: {
    justifyContent: 'space-between',

    marginBottom: Spacing.md,
  },

  // =========================================
  // NEAR YOU
  // =========================================

  sectionHeader: {
    flexDirection: 'row',

    justifyContent:
      'space-between',

    alignItems: 'center',

    marginTop: Spacing.md,

    marginBottom: Spacing.lg,
  },

  sectionTitle: {
    fontFamily: Fonts.interBold,

    fontSize: Typography.h2,

    color: Colors.black,
  },

  seeAll: {
    fontFamily: Fonts.interSemiBold,

    fontSize: Typography.body,

    color: Colors.orangePrimary,
  },

  // =========================================
  // PAGINATION
  // =========================================

  footerLoader: {
    marginVertical: 20,
  },
});

// import React, {useCallback} from 'react';
// import {
//   ActivityIndicator,
//   FlatList,
//   RefreshControl,
//   StyleSheet,
//   View,
// } from 'react-native';

// import MainLayout from '../../component/MainLayout';
// import AppText from '../../component/AppText/AppText';

// import {
//   Colors,
//   Fonts,
//   Spacing,
//   Typography,
// } from '../../theme';

// import useRestaurants from './useRestaurants';
// import useStories from './useStories';

// import RestaurantBanner from './RestaurantBanner';
// import RestaurantCard from './RestaurantCard';
// import RestaurantStories from './RestaurantStories';

// import {Restaurant} from '../../api/services/restaurantList/Restaurant';

// const HomeScreen = () => {
//   // -----------------------------------------
//   // RESTAURANTS
//   // -----------------------------------------
//   const {
//     restaurants,
//     loading,
//     loadingMore,
//     refreshing,
//     refresh,
//     loadMore,
//   } = useRestaurants();

//   // -----------------------------------------
//   // STORIES
//   // -----------------------------------------
//   const {
//     stories,
//     loading: storiesLoading,
//   } = useStories();

//   // -----------------------------------------
//   // RESTAURANT CARD
//   // -----------------------------------------
//   const renderItem = useCallback(
//     ({item}: {item: Restaurant}) => {
//       return (
//         <RestaurantCard
//           restaurant={item}
//         />
//       );
//     },
//     [],
//   );

//   // -----------------------------------------
//   // KEY
//   // -----------------------------------------
//   const keyExtractor = useCallback(
//     (item: Restaurant) =>
//       item.restaurantId.toString(),
//     [],
//   );

//   // -----------------------------------------
//   // INITIAL RESTAURANT LOADING
//   // -----------------------------------------
//   if (loading) {
//     return (
//       <MainLayout>
//         <View style={styles.loader}>
//           <ActivityIndicator
//             size="large"
//             color={Colors.orangePrimary}
//           />
//         </View>
//       </MainLayout>
//     );
//   }

//   // -----------------------------------------
//   // HOME
//   // -----------------------------------------
//   return (
//     <MainLayout>
//       <FlatList
//         /*
//          * First restaurant is used as the featured banner.
//          * Remaining restaurants are displayed in the grid.
//          */
//         data={restaurants.slice(1)}
//         renderItem={renderItem}
//         keyExtractor={keyExtractor}
//         numColumns={2}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.list}
//         columnWrapperStyle={styles.row}
        
//         /*
//          * -------------------------------------
//          * HEADER
//          * -------------------------------------
//          */
//         ListHeaderComponent={
//           <>
//             {/* FEATURED RESTAURANT BANNER */}
//             {restaurants.length > 0 && (
//               <RestaurantBanner
//                 restaurant={restaurants[0]}
//               />
//             )}

//             {/* STORIES */}
//             {!storiesLoading &&
//               stories.length > 0 && (
//                 <RestaurantStories
//                   stories={stories}
//                 />
//               )}

//             {/* NEAR YOU */}
//             <View style={styles.sectionHeader}>
//               <AppText style={styles.sectionTitle}>
//                 Near You
//               </AppText>

//               <AppText style={styles.seeAll}>
//                 See All
//               </AppText>
//             </View>
//           </>
//         }

//         /*
//          * -------------------------------------
//          * PULL TO REFRESH
//          * -------------------------------------
//          */
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={refresh}
//           />
//         }

//         /*
//          * -------------------------------------
//          * PAGINATION
//          * -------------------------------------
//          */
//         onEndReached={loadMore}
//         onEndReachedThreshold={0.5}

//         /*
//          * -------------------------------------
//          * PAGINATION LOADER
//          * -------------------------------------
//          */
//         ListFooterComponent={
//           loadingMore ? (
//             <ActivityIndicator
//               size="small"
//               color={Colors.orangePrimary}
//               style={styles.footerLoader}
//             />
//           ) : null
//         }
//       />
//     </MainLayout>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   /*
//    * Main FlatList content
//    */
//   list: {
//     paddingHorizontal: Spacing.md,
//     paddingBottom: 120,
//   },

//   /*
//    * Initial loading screen
//    */
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   /*
//    * Two-column restaurant grid
//    */
//   row: {
//     justifyContent: 'space-between',
//     marginBottom: Spacing.md,
//   },

//   /*
//    * "Near You" section header
//    */
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',

//     marginBottom: Spacing.lg,
//     marginTop: Spacing.md,
//   },

//   sectionTitle: {
//     fontFamily: Fonts.interBold,
//     fontSize: Typography.h2,
//     color: Colors.black,
//   },

//   seeAll: {
//     fontFamily: Fonts.interSemiBold,
//     fontSize: Typography.body,
//     color: Colors.orangePrimary,
//   },

//   /*
//    * Pagination loader
//    */
//   footerLoader: {
//     marginVertical: 20,
//   },
// });
