import React, {useCallback, useMemo} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';

import MainLayout from '../../component/MainLayout';

import {Colors, Spacing} from '../../theme';

import useRestaurants from './useRestaurants';

import RestaurantBanner from './RestaurantBanner';
import RestaurantCard from './RestaurantCard';

import {Restaurant} from '../../api/services/restaurantList/Restaurant';

const HomeScreen = () => {
  const {
    restaurants,
    loading,
    loadingMore,
    refreshing,
    refresh,
    loadMore,
  } = useRestaurants();

  const renderItem = useCallback(
    ({item, index}: {item: Restaurant; index: number}) => {
      if (index === 0) {
        return (
          <>
            <RestaurantBanner restaurant={item} />

            <View style={styles.gridContainer}>
              {restaurants.length > 1 && (
                <RestaurantCard
                  restaurant={restaurants[1]}
                />
              )}
            </View>
          </>
        );
      }

      if (index === 1) {
        return null;
      }

      return (
        <RestaurantCard restaurant={item} />
      );
    },
    [restaurants],
  );

  const keyExtractor = useCallback(
    (item: Restaurant) =>
      item.restaurantId.toString(),
    [],
  );

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

  return (
    <MainLayout>
      <FlatList
        data={restaurants}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
          />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator
              size="small"
              color={Colors.orangePrimary}
            />
          ) : null
        }
      />
    </MainLayout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  list: {
    paddingBottom: 120,
    paddingHorizontal: Spacing.md,
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  row: {
    justifyContent: 'space-between',
  },

  gridContainer: {
    flex: 1,
  },
});

// import React from 'react';
// import {StyleSheet, View} from 'react-native';

// import MainLayout from '../../component/MainLayout';
// import AppText from '../../component/AppText';
// import {Colors, Fonts, Radius, Spacing, Typography} from '../../theme';

// const HomeScreen = () => {
//   return (
//     <MainLayout>
//       <View style={styles.content}>
//         <View style={styles.heroCard}>
//           <AppText style={styles.welcomeText}>Welcome back!</AppText>

//           <AppText style={styles.screenTitle}>Home</AppText>

//           <AppText style={styles.descriptionText}>
//             Discover the nearest restaurants, deals, and personal favorites
//             from your maps and bookings.
//           </AppText>
//         </View>
//       </View>
//     </MainLayout>
//   );
// };

// const styles = StyleSheet.create({
//   content: {
//     flex: 1,
//     paddingHorizontal: Spacing.md,
//   },

//   heroCard: {
//     backgroundColor: Colors.white,
//     borderRadius: Radius.xl,
//     padding: Spacing.xl,

//     shadowColor: Colors.neutral600,
//     shadowOffset: {
//       width: 0,
//       height: 10,
//     },
//     shadowOpacity: 0.05,
//     shadowRadius: 20,
//     elevation: 6,
//   },

//   welcomeText: {
//     fontFamily: Fonts.interSemiBold,
//     fontSize: Typography.h3,
//     color: Colors.neutral700,
//     marginBottom: Spacing.sm,
//   },

//   screenTitle: {
//     fontFamily: Fonts.interBold,
//     fontSize: Typography.h1,
//     color: Colors.neutral900,
//     marginBottom: Spacing.sm,
//   },

//   descriptionText: {
//     fontFamily: Fonts.interRegular,
//     fontSize: Typography.body,
//     color: Colors.neutral600,
//     lineHeight: 24,
//   },
// });

// export default HomeScreen;
