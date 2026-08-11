import React from 'react';

import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import MainLayout from '../../component/MainLayout';

import AppText from '../../component/AppText/AppText';

import {
  Colors,
  Fonts,
  Spacing,
} from '../../theme';

import FavoriteRestaurantCard, {
  FavoriteRestaurant,
} from './FavoriteRestaurantCard';

// ============================================================
// MOCK DATA
// ============================================================

const favoriteRestaurants: FavoriteRestaurant[] = [
  {
    id: '1',

    name: 'The Cozy Kitchen',

    cuisine: 'Italian',

    type: 'Café',

    distance: '0.3 km',

    rating: '4.8',

    image:
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400',

    isOpen: true,
  },

  {
    id: '2',

    name: 'Sakura Bites',

    cuisine: 'Japanese',

    type: 'Sushi',

    distance: '1.1 km',

    rating: '4.8',

    image:
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400',

    isOpen: true,
  },

  {
    id: '3',

    name: 'La Petite Patisserie',

    cuisine: 'Bakery',

    type: 'Desserts',

    distance: '0.4 km',

    rating: '4.6',

    image:
      'https://images.unsplash.com/photo-1558326567-98ae2405596b?w=400',

    isOpen: true,
  },
];

// ============================================================
// SCREEN
// ============================================================

const FavoritesScreen = () => {
  return (
    <MainLayout>

      <View
        style={styles.container}>

        {/* ==================================================
            HEADER
        ================================================== */}

        <View
          style={styles.header}>

          <AppText
            style={styles.title}>
            Favourites
          </AppText>

          <AppText
            style={styles.subtitle}>
            {favoriteRestaurants.length} saved spots
          </AppText>

        </View>

        {/* ==================================================
            FAVORITES LIST
        ================================================== */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.listContent
          }>

          {favoriteRestaurants.map(
            restaurant => (
              <FavoriteRestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
              />
            ),
          )}

        </ScrollView>

      </View>

    </MainLayout>
  );
};

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
      Colors.mainBackground,
  },

  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    
    paddingHorizontal:
      Spacing.md,

    marginBottom:
      Spacing.lg,
  },

  title: {
    fontFamily:
      Fonts.interBold,

    fontSize: 44,

    lineHeight: 52,

    color:
      Colors.neutral900,
  },

  subtitle: {
    marginTop:
      Spacing.xs,

    fontFamily:
      Fonts.interRegular,

    fontSize: 22,

    color:
      Colors.neutral800,
  },

  // ==========================================================
  // LIST
  // ==========================================================

  listContent: {
    paddingHorizontal:
      Spacing.md,

    paddingBottom:
      120,
  },
});

export default React.memo(
  FavoritesScreen,
);