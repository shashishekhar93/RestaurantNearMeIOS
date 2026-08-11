import React from 'react';

import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import AppText from '../../component/AppText/AppText';
import StarIcon from '../../assets/icons/ic_star.svg';
import HeartFilled from '../../assets/icons/ic_heart_filled.svg';

import {
  Colors,
  Fonts,
  Radius,
  Spacing,
  Typography,
} from '../../theme';

// ============================================================
// TYPE
// ============================================================

export type FavoriteRestaurant = {
  id: string;

  name: string;

  cuisine: string;

  type: string;

  distance: string;

  rating: string;

  image: string;

  isOpen: boolean;
};

// ============================================================
// PROPS
// ============================================================

type Props = {
  restaurant: FavoriteRestaurant;

  onPress?: () => void;

  onFavoritePress?: () => void;
};

// ============================================================
// COMPONENT
// ============================================================

const FavoriteRestaurantCard = ({
  restaurant,
  onPress,
  onFavoritePress,
}: Props) => {

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.card}>

      {/* ====================================================
          RESTAURANT IMAGE
      ==================================================== */}

      <View
        style={styles.imageContainer}>

        <Image
          source={{
            uri: restaurant.image,
          }}
          resizeMode="cover"
          style={styles.image}
        />

      </View>

      {/* ====================================================
          RESTAURANT INFORMATION
      ==================================================== */}

      <View
        style={styles.restaurantInfo}>

        {/* ==================================================
            NAME
        ================================================== */}

        <AppText
          numberOfLines={1}
          style={styles.restaurantName}>
          {restaurant.name}
        </AppText>

        {/* ==================================================
            CATEGORY + DISTANCE
        ================================================== */}

        <AppText
          numberOfLines={1}
          style={styles.restaurantDetails}>

          {restaurant.cuisine}
          {' · '}
          {restaurant.type}
          {' · '}
          {restaurant.distance}

        </AppText>

        {/* ==================================================
            RATING + STATUS
        ================================================== */}

        <View
          style={styles.ratingRow}>

          <StarIcon
            width={14}
            height={14}
            style={styles.star}
          />

          <AppText
            style={styles.rating}>
            {restaurant.rating}
          </AppText>

          <View
            style={styles.dot}
          />

          <AppText
            style={[
              styles.openText,
              !restaurant.isOpen &&
                styles.closedText,
            ]}>

            {restaurant.isOpen
              ? 'Open'
              : 'Closed'}

          </AppText>

        </View>

      </View>

      {/* ====================================================
          FAVORITE BUTTON
      ==================================================== */}

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onFavoritePress}
        style={styles.favoriteButton}>

        <HeartFilled
          width={18}
          height={18}
        />

      </TouchableOpacity>

    </TouchableOpacity>
  );
};

// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({

  // ==========================================================
  // CARD
  // ==========================================================

    card: {
  backgroundColor: Colors.white,

  borderRadius: Radius.round,

  borderWidth: 1,

  borderColor: Colors.background500,

  paddingHorizontal: Spacing.md,
  paddingVertical: Spacing.md,

  flexDirection: 'row',

  alignItems: 'center',

  marginBottom: Spacing.md,
},

  // ==========================================================
  // IMAGE
  // ==========================================================

  imageContainer: {
    width: 90,

    height: 90,

    borderRadius: 62,

    overflow: 'hidden',

    marginRight:
      Spacing.md,

    backgroundColor:
      Colors.background300,
  },

  image: {
    width: '100%',

    height: '100%',
  },

  // ==========================================================
  // INFORMATION
  // ==========================================================

  restaurantInfo: {
    flex: 1,

    minWidth: 0,

    justifyContent:
      'center',
  },

  restaurantName: {
    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.title,

    color:
      Colors.neutral900,
  },

  restaurantDetails: {
    marginTop: 4,

    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.caption,

    color:
      Colors.neutral800,
  },

  // ==========================================================
  // RATING
  // ==========================================================

  ratingRow: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop:
      Spacing.sm,
  },

  star: {
    marginRight: 6,
  },

  rating: {
    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.body,

    color:
      Colors.neutral900,
  },

  dot: {
    width: 5,

    height: 5,

    borderRadius: 3,

    marginHorizontal:
      Spacing.sm,

    backgroundColor:
      Colors.neutral400,
  },

  openText: {
    fontFamily:
      Fonts.interMedium,

    fontSize:
      Typography.body,

    color:
      '#299447',
  },

  closedText: {
    color:
      Colors.neutral600,
  },

  // ==========================================================
  // FAVORITE BUTTON
  // ==========================================================

  favoriteButton: {
    width: 48,

    height: 48,

    borderRadius: 32,

    justifyContent: 'center',

    alignItems: 'center',

    marginLeft:
      Spacing.sm,

    backgroundColor:
      Colors.primary50,
  },

  heart: {
    fontSize: 22,

    lineHeight: 30,

    color:
      Colors.primary600,
  },
});

export default React.memo(
  FavoriteRestaurantCard,
);