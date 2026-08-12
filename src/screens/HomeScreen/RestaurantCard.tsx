import React from 'react';

import {
  Alert,
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
} from '../../theme';

import {Restaurant} from '../../api/services/restaurantList/Restaurant';

import HeartIcon from '../../assets/icons/ic_favorites.svg';
import StarIcon from '../../assets/icons/ic_star.svg';


// =====================================================
// PROPS
// =====================================================

type Props = {
  restaurant: Restaurant;

  /*
   * Called when the user taps the restaurant card.
   *
   * HomeScreen will use this callback to navigate
   * to MenuScreen and pass the complete restaurant object.
   */
  onPress?: () => void;
};


// =====================================================
// COMPONENT
// =====================================================

const RestaurantCard = ({
  restaurant,
  onPress,
}: Props) => {

  // ===================================================
  // RATING
  // ===================================================

  const rating = Number(
    restaurant.rating ?? 0,
  );


  // ===================================================
  // UI
  // ===================================================

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={onPress}
      style={styles.card}>

      {/* =============================================
          IMAGE
      ============================================= */}

      <View style={styles.imageContainer}>

        <Image
          source={{
            uri:
              restaurant.coverImageUrl ||
              'https://via.placeholder.com/500x350',
          }}
          style={styles.image}
          resizeMode="cover"
        />


        {/* ===========================================
            BOOK BUTTON

            This button has its own action, so it
            remains independent from the card click.
        =========================================== */}

        <TouchableOpacity
          style={styles.bookButton}
          activeOpacity={0.8}
          onPress={() =>
            Alert.alert(
              'Booking',
              'Booking feature coming soon',
            )
          }>

          <AppText style={styles.bookText}>
            Book
          </AppText>

        </TouchableOpacity>


        {/* ===========================================
            FAVORITE BUTTON

            This button also keeps its existing
            independent behavior.
        =========================================== */}

        <TouchableOpacity
          style={styles.favoriteButton}
          activeOpacity={0.8}
          onPress={() =>
            Alert.alert(
              'Favourite',
              'Added to favourites',
            )
          }>

          <HeartIcon
            width={14}
            height={14}
            color={Colors.black}
          />

        </TouchableOpacity>

      </View>


      {/* =============================================
          RESTAURANT CONTENT
      ============================================= */}

      <View style={styles.content}>

        {/* ===========================================
            RESTAURANT NAME
        =========================================== */}

        <AppText
          numberOfLines={1}
          style={styles.name}>

          {restaurant.restaurantName}

        </AppText>


        {/* ===========================================
            CUISINE
        =========================================== */}

        <AppText
          numberOfLines={1}
          style={styles.meta}>

          {restaurant.cuisine}

        </AppText>


        {/* ===========================================
            BOTTOM ROW
        =========================================== */}

        <View style={styles.bottomRow}>

          {/* =========================================
              RATING
          ========================================= */}

          <View style={styles.ratingContainer}>

            <StarIcon/>

            {rating === 0 ? (

              <AppText style={styles.rating}>
                New
              </AppText>

            ) : (

              <AppText style={styles.rating}>
                {rating.toFixed(1)}
              </AppText>

            )}

          </View>


          {/* =========================================
              OPEN STATUS
          ========================================= */}

          <AppText
            style={[
              styles.openStatus,
              !restaurant.openNow &&
                styles.closedStatus,
            ]}>

            {restaurant.openNow
              ? 'Open'
              : 'Closed'}

          </AppText>

        </View>

      </View>

    </TouchableOpacity>
  );
};


export default React.memo(
  RestaurantCard,
);


// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({

  // ===================================================
  // CARD
  // ===================================================

  card: {
    width: '48%',

    backgroundColor:
      Colors.white,

    borderRadius: 30,

    overflow: 'hidden',

    borderWidth: 1,

    borderColor: '#E7E4E1',

    marginBottom:
      Spacing.md,

    shadowColor:
      Colors.black,

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.04,

    shadowRadius: 8,

    elevation: 2,
  },


  // ===================================================
  // IMAGE
  // ===================================================

  imageContainer: {
    width: '100%',

    height: 132,

    position: 'relative',

    backgroundColor:
      Colors.background200,
  },


  image: {
    width: '100%',
    height: '100%',
  },


  // ===================================================
  // BOOK BUTTON
  // ===================================================

  bookButton: {
    position: 'absolute',

    top: 12,
    left: 12,

    height: 28,

    minWidth: 56,

    paddingHorizontal: 12,

    borderRadius: 28,

    backgroundColor:
      Colors.white,

    justifyContent:
      'center',

    alignItems:
      'center',

    shadowColor:
      Colors.black,

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.08,

    shadowRadius: 5,

    elevation: 3,
  },


  bookText: {
    color:
      Colors.error600,

    fontFamily:
      Fonts.interBold,

    fontSize: 14,
  },


  // ===================================================
  // FAVORITE BUTTON
  // ===================================================

  favoriteButton: {
    position: 'absolute',

    top: 10,
    right: 10,

    width: 32,
    height: 32,

    borderRadius: 28,

    backgroundColor:
      Colors.neutral50,

    justifyContent:
      'center',

    alignItems:
      'center',

    shadowColor:
      Colors.black,

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.08,

    shadowRadius: 5,

    elevation: 3,
  },


  // ===================================================
  // CONTENT
  // ===================================================

  content: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },


  // ===================================================
  // RESTAURANT NAME
  // ===================================================

  name: {
    fontFamily:
      Fonts.interBold,

    fontSize: 16,

    color:
      Colors.black,
  },


  // ===================================================
  // CUISINE
  // ===================================================

  meta: {
    fontFamily:
      Fonts.interRegular,

    fontSize: 10,

    lineHeight: 24,

    color:
      Colors.neutral600,
  },


  // ===================================================
  // BOTTOM ROW
  // ===================================================

  bottomRow: {
    marginTop: 4,

    flexDirection:
      'row',

    alignItems:
      'center',

    justifyContent:
      'space-between',
  },


  // ===================================================
  // RATING
  // ===================================================

  ratingContainer: {
    flexDirection:
      'row',

    alignItems:
      'center',
  },


  star: {
    color:
      Colors.warning600,

    fontSize: 14,

    fontFamily:
      Fonts.interBold,

    marginRight: 8,
  },


  rating: {
    marginLeft:4,
    color:
      Colors.neutral900,

    fontFamily:
      Fonts.interBold,

    fontSize: 14,
  },


  // ===================================================
  // OPEN STATUS
  // ===================================================

  openStatus: {
    color:
      Colors.success800,

    fontFamily:
      Fonts.interSemiBold,

    fontSize: 12,

    lineHeight: 20,
  },


  closedStatus: {
    fontSize: 12,

    color:
      Colors.error600,
  },

});