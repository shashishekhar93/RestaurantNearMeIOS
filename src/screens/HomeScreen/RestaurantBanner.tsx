import React from 'react';

import {
  Image,
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

import {Restaurant} from '../../api/services/restaurantList/Restaurant';


// =====================================================
// OPTIONAL DISPLAY DATA
// =====================================================

type RestaurantWithOptionalDisplayData =
  Restaurant & {
    coverImageUrl?: string;
    distance?: number;
    distanceInKm?: number;
    closingTime?: string;
    openingTime?: string;
  };


// =====================================================
// PROPS
// =====================================================

type Props = {
  restaurant: Restaurant;

  /*
   * Called when the user taps the
   * featured restaurant banner.
   *
   * HomeScreen will use this callback
   * to navigate to MenuScreen.
   */
  onPress?: () => void;
};


// =====================================================
// COMPONENT
// =====================================================

const RestaurantBanner = ({
  restaurant,
  onPress,
}: Props) => {

  /*
   * Restaurant API object may contain
   * additional display fields.
   */
  const restaurantData =
    restaurant as RestaurantWithOptionalDisplayData;


  // ===================================================
  // IMAGE
  // ===================================================

  const image =
    restaurantData.coverImageUrl ||
    'https://via.placeholder.com/1000x650';


  // ===================================================
  // RATING
  // ===================================================

  const rating = Number(
    restaurantData.rating ?? 0,
  );


  // ===================================================
  // CUISINE
  // ===================================================

  const cuisine =
    restaurantData.cuisine?.trim() ||
    'ITALIAN · CAFÉ';


  // ===================================================
  // DISTANCE
  // ===================================================

  const distance =
    restaurantData.distance ??
    restaurantData.distanceInKm ??
    0.3;


  // ===================================================
  // OPENING STATUS
  // ===================================================

  const openingStatus =
    restaurantData.openNow
      ? 'Open until 10:30 PM'
      : 'Closed';


  // ===================================================
  // UI
  // ===================================================

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={onPress}
      style={styles.container}>

      {/* =============================================
          RESTAURANT IMAGE
      ============================================= */}

      <Image
        source={{
          uri: image,
        }}
        style={styles.image}
        resizeMode="cover"
      />


      {/* =============================================
          DARK OVERLAYS
      ============================================= */}

      <View
        pointerEvents="none"
        style={styles.overlayTop}
      />

      <View
        pointerEvents="none"
        style={styles.overlayBottom}
      />


      {/* =============================================
          RATING
      ============================================= */}

      <View
        pointerEvents="none"
        style={styles.ratingContainer}>

        <AppText style={styles.star}>
          ★
        </AppText>

        <AppText style={styles.ratingText}>
          {rating.toFixed(1)}
        </AppText>

      </View>


      {/* =============================================
          BOTTOM CONTENT
      ============================================= */}

      <View
        pointerEvents="none"
        style={styles.bottomContent}>

        {/* =========================================
            CUISINE
        ========================================= */}

        <View
          style={
            styles.cuisineContainer
          }>

          <AppText
            numberOfLines={1}
            style={styles.cuisineText}>

            {cuisine.toUpperCase()}

          </AppText>

        </View>


        {/* =========================================
            RESTAURANT NAME
        ========================================= */}

        <AppText
          numberOfLines={1}
          style={styles.restaurantName}>

          {restaurantData.restaurantName}

        </AppText>


        {/* =========================================
            DISTANCE + OPEN STATUS
        ========================================= */}

        <AppText
          numberOfLines={1}
          style={styles.restaurantMeta}>

          {distance.toFixed(1)}
          {' km'}
          {'  ·  '}
          {openingStatus}

        </AppText>

      </View>

    </TouchableOpacity>
  );
};


export default React.memo(
  RestaurantBanner,
);


// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({

  // =========================================
  // MAIN BANNER
  // =========================================

  container: {
    width: '100%',

    aspectRatio: 1.58,

    borderRadius:
      Radius.xl,

    overflow: 'hidden',

    marginBottom:
      Spacing.lg,

    backgroundColor:
      Colors.black,
  },


  // =========================================
  // RESTAURANT IMAGE
  // =========================================

  image: {
    ...StyleSheet.absoluteFill,

    width: '100%',
    height: '100%',
  },


  // =========================================
  // TOP OVERLAY
  // =========================================

  overlayTop: {
    ...StyleSheet.absoluteFill,

    backgroundColor:
      'rgba(0, 0, 0, 0.05)',
  },


  // =========================================
  // BOTTOM OVERLAY
  // =========================================

  overlayBottom: {
    position: 'absolute',

    left: 0,
    right: 0,
    bottom: 0,

    height: '100%',

    backgroundColor:
      'rgba(0, 0, 0, 0.38)',
  },


  // =========================================
  // RATING
  // =========================================

  ratingContainer: {
    position: 'absolute',

    top: Spacing.md,
    right: Spacing.md,

    minWidth: 64,
    height: 38,

    paddingHorizontal:
      Spacing.md,

    borderRadius:
      Radius.rounded,

    backgroundColor:
      Colors.white,

    flexDirection:
      'row',

    alignItems:
      'center',

    justifyContent:
      'center',

    gap: 5,
  },


  star: {
    color: '#E7A63A',

    fontSize: 18,

    lineHeight: 24,

    fontFamily:
      Fonts.interBold,
  },


  ratingText: {
    color:
      Colors.black,

    fontSize: 18,

    lineHeight: 24,

    fontFamily:
      Fonts.interBold,
  },


  // =========================================
  // BOTTOM CONTENT
  // =========================================

  bottomContent: {
    position: 'absolute',

    left: Spacing.xl,
    right: Spacing.xl,

    bottom: Spacing.xl,
  },


  // =========================================
  // CUISINE
  // =========================================

  cuisineContainer: {
    alignSelf:
      'flex-start',

    maxWidth: '85%',

    paddingHorizontal:
      Spacing.lg,

    paddingVertical: 10,

    borderRadius:
      Radius.rounded,

    backgroundColor:
      'rgba(150, 110, 82, 0.90)',

    marginBottom:
      Spacing.md,
  },


  cuisineText: {
    color:
      Colors.white,

    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.body,

    letterSpacing: 0.5,
  },


  // =========================================
  // RESTAURANT NAME
  // =========================================

  restaurantName: {
    color:
      Colors.white,

    fontFamily:
      Fonts.interBold,

    fontSize: 24,

    lineHeight: 30,

    marginBottom: 4,
  },


  // =========================================
  // DISTANCE + STATUS
  // =========================================

  restaurantMeta: {
    color:
      Colors.white,

    fontFamily:
      Fonts.interRegular,

    fontSize: 20,

    lineHeight: 28,
  },

});