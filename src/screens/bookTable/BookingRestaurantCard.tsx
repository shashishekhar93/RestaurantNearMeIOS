import React from 'react';

import {
  Image,
  StyleSheet,
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


// ============================================================
// PROPS
// ============================================================

type Props = {
  restaurantName: string;

  cuisine: string;

  distance?: string;

  rating?: number;

  imageUrl?: string;
};


// ============================================================
// COMPONENT
// ============================================================

const BookingRestaurantCard = ({
  restaurantName,
  cuisine,
  distance,
  rating = 0,
  imageUrl,
}: Props) => {

  return (
    <View style={styles.card}>

      {/* ======================================================
          RESTAURANT IMAGE
      ====================================================== */}

      <View style={styles.imageContainer}>

        {imageUrl ? (

          <Image
            source={{
              uri: imageUrl,
            }}
            resizeMode="cover"
            style={styles.image}
          />

        ) : (

          <View
            style={
              styles.imagePlaceholder
            }
          />

        )}

      </View>


      {/* ======================================================
          RESTAURANT INFORMATION
      ====================================================== */}

      <View style={styles.restaurantInfo}>

        <AppText
          numberOfLines={1}
          style={styles.restaurantName}>
          {restaurantName}
        </AppText>


        <AppText
          numberOfLines={1}
          style={styles.restaurantDetails}>

          {cuisine}

          {distance
            ? ` · ${distance}`
            : ''}

        </AppText>

      </View>


      {/* ======================================================
          RATING
      ====================================================== */}

      {rating > 0 && (

        <View style={styles.ratingContainer}>

          <AppText
            style={styles.star}>
            ★
          </AppText>

          <AppText
            style={styles.rating}>
            {rating.toFixed(1)}
          </AppText>

        </View>

      )}

    </View>
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
    width: '100%',

    flexDirection: 'row',

    alignItems: 'center',

    padding:
      Spacing.sm,

    borderRadius:
      Radius.xl,

    borderWidth: 1,

    borderColor:
      Colors.background500,

    backgroundColor:
      Colors.white,
  },


  // ==========================================================
  // IMAGE
  // ==========================================================

  imageContainer: {
    width: 42,

    aspectRatio: 1,

    borderRadius: 21,

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
  // RESTAURANT INFORMATION
  // ==========================================================

  restaurantInfo: {
    flex: 1,

    minWidth: 0,

    marginHorizontal:
      Spacing.sm,
  },


  restaurantName: {
    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.small,

    color:
      Colors.neutral900,
  },


  restaurantDetails: {
    marginTop: 2,

    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.extraSmall,

    color:
      Colors.neutral700,
  },


  // ==========================================================
  // RATING
  // ==========================================================

  ratingContainer: {
    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal:
      Spacing.xs,

    paddingVertical:
      Spacing.xs,

    borderRadius:
      Radius.round,

    backgroundColor:
      Colors.background100,
  },


  star: {
    fontSize: 11,

    color:
      '#E9A12B',

    marginRight: 3,
  },


  rating: {
    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.extraSmall,

    color:
      Colors.neutral800,
  },

});


export default React.memo(
  BookingRestaurantCard,
);