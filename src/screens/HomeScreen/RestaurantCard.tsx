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
  Typography,
} from '../../theme';

import {Restaurant} from '../../api/services/restaurantList/Restaurant';

import HeartIcon from '../../assets/icons/ic_favorites.svg';
import BookIcon from '../../assets/icons/ic_reservations.svg';

type Props = {
  restaurant: Restaurant;
};

const RestaurantCard = ({restaurant}: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri:
              restaurant.coverImageUrl ||
              'https://via.placeholder.com/500x350',
          }}
          style={styles.image}
        />

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() =>
            Alert.alert(
              'Favourite',
              'Added to favourites',
            )
          }>
          <HeartIcon
            width={18}
            height={18}
            color={Colors.white}
          />
        </TouchableOpacity>

        {restaurant.featured && (
          <View style={styles.featuredBadge}>
            <AppText style={styles.featuredText}>
              Featured
            </AppText>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <AppText
          numberOfLines={1}
          style={styles.name}>
          {restaurant.restaurantName}
        </AppText>

        <AppText
          numberOfLines={2}
          style={styles.address}>
          {restaurant.address}
        </AppText>

        <View style={styles.bottomRow}>
          <View style={styles.ratingContainer}>
            <AppText style={styles.rating}>
              ⭐ {Number(restaurant.rating ?? 0).toFixed(1)}
            </AppText>
          </View>

          <TouchableOpacity
            style={styles.bookButton}
            onPress={() =>
              Alert.alert(
                'Booking',
                'Booking feature coming soon',
              )
            }>
            <BookIcon
              width={16}
              height={16}
              color={Colors.white}
            />

            <AppText style={styles.bookText}>
              Book
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default React.memo(RestaurantCard);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    margin: 6,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  imageContainer: {
    position: 'relative',
  },

  image: {
    width: '100%',
    height: 150,
  },

  favoriteButton: {
    position: 'absolute',
    right: 10,
    top: 10,

    width: 34,
    height: 34,

    borderRadius: 17,
    backgroundColor: 'rgba(0,0,0,0.45)',

    justifyContent: 'center',
    alignItems: 'center',
  },

  featuredBadge: {
    position: 'absolute',
    left: 10,
    top: 10,

    backgroundColor: Colors.orangePrimary,

    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  featuredText: {
    color: Colors.white,
    fontSize: Typography.extraSmall,
    fontFamily: Fonts.interBold,
  },

  content: {
    padding: Spacing.sm,
  },

  name: {
    fontFamily: Fonts.interBold,
    fontSize: Typography.body,
    color: Colors.black,
  },

  address: {
    marginTop: 6,
    fontSize: Typography.small,
    color: Colors.neutral500,
    lineHeight: 18,
    minHeight: 36,
  },

  bottomRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  ratingContainer: {
    backgroundColor: Colors.success700,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  rating: {
    color: Colors.white,
    fontFamily: Fonts.interBold,
    fontSize: Typography.extraSmall,
  },

  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: Colors.orangePrimary,

    borderRadius: 16,

    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  bookText: {
    marginLeft: 4,
    color: Colors.white,
    fontFamily: Fonts.interBold,
    fontSize: Typography.small,
  },
});