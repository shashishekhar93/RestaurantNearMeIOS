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

import {MapRestaurant} from './MapRestaurant';


// ============================================================
// PROPS
// ============================================================

type Props = {
  restaurant: MapRestaurant;

  // Whether this restaurant is currently selected on the map.
  selected?: boolean;

  // Called when the user taps this restaurant.
  onPress: () => void;
};


// ============================================================
// COMPONENT
// ============================================================

const MapRestaurantCard = ({
  restaurant,
  selected = false,
  onPress,
}: Props) => {

  // ----------------------------------------------------------
  // RESTAURANT NAME
  // ----------------------------------------------------------

  const restaurantName =
    restaurant.restaurantName ??
    restaurant.name ??
    'Restaurant';


  // ----------------------------------------------------------
  // RATING
  // ----------------------------------------------------------

  const rating =
    Number(restaurant.rating ?? 0);


  // ----------------------------------------------------------
  // DISTANCE
  // ----------------------------------------------------------

  const distance =
    restaurant.distance !== undefined &&
    restaurant.distance !== null
      ? `${restaurant.distance} km`
      : null;


  // ----------------------------------------------------------
  // CUISINE
  // ----------------------------------------------------------

  const cuisine =
    restaurant.cuisine ??
    restaurant.category ??
    '';


  // ==========================================================
  // UI
  // ==========================================================

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.card,
        selected && styles.selectedCard,
      ]}>

      {/* ======================================================
          RESTAURANT IMAGE
      ====================================================== */}

    <View style={styles.imageContainer}>
        {restaurant.coverImageUrl ||
            restaurant.logoUrl ? (
            <Image
            source={{
                uri:
                restaurant.coverImageUrl ??
                restaurant.logoUrl,
            }}
            resizeMode="cover"
            style={styles.image}
            />
        ) : (
            <View
            style={styles.imagePlaceholder}
            />
        )}
        </View>


      {/* ======================================================
          RESTAURANT INFORMATION
      ====================================================== */}

      <View style={styles.content}>

        {/* Restaurant name */}

        <AppText
          numberOfLines={1}
          style={styles.name}>
          {restaurantName}
        </AppText>


        {/* Cuisine */}

        {cuisine ? (
          <AppText
            numberOfLines={1}
            style={styles.cuisine}>
            {cuisine}
          </AppText>
        ) : null}


        {/* ====================================================
            RATING + DISTANCE
        ==================================================== */}

        <View style={styles.bottomRow}>

          {/* Rating */}

          <View style={styles.ratingContainer}>

            <AppText
              style={styles.star}>
              ★
            </AppText>

            <AppText
              style={styles.ratingText}>

              {rating === 0
                ? 'New'
                : rating.toFixed(1)}

            </AppText>

          </View>


          {/* Separator */}

          {distance ? (
            <AppText
              style={styles.separator}>
              •
            </AppText>
          ) : null}


          {/* Distance */}

          {distance ? (
            <AppText
              style={styles.distanceText}>
              {distance}
            </AppText>
          ) : null}

        </View>

      </View>

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
    width: 370,

    height: 110,

    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: Spacing.md,

    borderRadius: 64,

    borderWidth: 1,

    borderColor:
      Colors.background500,

    backgroundColor:
      Colors.white,

    marginRight: Spacing.md,
  },


  // ==========================================================
  // SELECTED CARD
  // ==========================================================

  selectedCard: {
    borderColor:
      Colors.orangePrimary,

    borderWidth: 1.5,
  },


  // ==========================================================
  // IMAGE
  // ==========================================================

  imageContainer: {
    width: 64,

    height: 64,

    borderRadius: 32,

    overflow: 'hidden',

    backgroundColor:
      Colors.background300,
  },


  image: {
    width: '100%',

    height: '100%',
  },


  imagePlaceholder: {
    flex: 1,

    backgroundColor:
      Colors.background300,
  },


  // ==========================================================
  // CONTENT
  // ==========================================================

  content: {
    flex: 1,

    marginLeft: Spacing.md,

    justifyContent: 'center',
  },


  // ==========================================================
  // NAME
  // ==========================================================

  name: {
    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.body,

    color:
      Colors.black,
  },


  // ==========================================================
  // CUISINE
  // ==========================================================

  cuisine: {
    marginTop: 4,

    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.small,

    color:
      Colors.neutral700,
  },


  // ==========================================================
  // BOTTOM ROW
  // ==========================================================

  bottomRow: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 4,
  },


  // ==========================================================
  // RATING
  // ==========================================================

  ratingContainer: {
    flexDirection: 'row',

    alignItems: 'center',
  },


  star: {
    fontSize: 15,

    color:
      '#E9A12B',

    marginRight: 5,
  },


  ratingText: {
    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.small,

    color:
      Colors.black,
  },


  // ==========================================================
  // SEPARATOR
  // ==========================================================

  separator: {
    marginHorizontal: 8,

    fontSize: 14,

    color:
      Colors.neutral500,
  },


  // ==========================================================
  // DISTANCE
  // ==========================================================

  distanceText: {
    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.small,

    color:
      '#299447',
  },
});


export default React.memo(
  MapRestaurantCard,
);