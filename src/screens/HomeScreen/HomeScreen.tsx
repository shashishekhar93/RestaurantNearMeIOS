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

import {Colors, Fonts, Spacing, Typography} from '../../theme';

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
    ({item}: {item: Restaurant}) => (
      <RestaurantCard restaurant={item} />
    ),
    [],
  );

  const keyExtractor = useCallback(
    (item: Restaurant) => item.restaurantId.toString(),
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
        data={restaurants.slice(1)}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={
          <>
            {restaurants.length > 0 && (
              <RestaurantBanner
                restaurant={restaurants[0]}
              />
            )}

            <View style={styles.sectionHeader}>
              <AppText style={styles.sectionTitle}>
                Near You
              </AppText>

              <AppText style={styles.seeAll}>
                See All
              </AppText>
            </View>
          </>
        }
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
              style={{marginVertical: 20}}
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
    paddingHorizontal: Spacing.md,
    paddingBottom: 120,
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  row: {
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    marginTop: Spacing.md,
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
});