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

const RestaurantBanner = ({restaurant}: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            restaurant.coverImageUrl ||
            'https://via.placeholder.com/800x500',
        }}
        style={styles.image}
      />

      <View style={styles.overlay} />

      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={styles.featuredChip}>
            <AppText style={styles.featuredText}>
              FEATURED
            </AppText>
          </View>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() =>
              Alert.alert(
                'Favourite',
                'Added to favourites',
              )
            }>
            <HeartIcon
              width={20}
              height={20}
              color={Colors.white}
            />
          </TouchableOpacity>
        </View>

        <View>
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

          <View style={styles.badges}>
            <View style={styles.ratingChip}>
              <AppText style={styles.rating}>
                ⭐ {Number(restaurant.rating ?? 0).toFixed(1)}
              </AppText>
            </View>

            {restaurant.pureVeg && (
              <View style={styles.vegChip}>
                <AppText style={styles.vegText}>
                  PURE VEG
                </AppText>
              </View>
            )}
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
              width={18}
              height={18}
              color={Colors.white}
            />

            <AppText style={styles.bookText}>
              Book Table
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default React.memo(RestaurantBanner);

const styles = StyleSheet.create({
  container: {
    height: 270,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
    backgroundColor: Colors.white,
  },

  image: {
    ...StyleSheet.absoluteFill,
  },

  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: Spacing.md,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  featuredChip: {
    backgroundColor: Colors.orangePrimary,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },

  featuredText: {
    color: Colors.white,
    fontFamily: Fonts.interBold,
    fontSize: Typography.small,
  },

  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.30)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  name: {
    color: Colors.white,
    fontFamily: Fonts.interBold,
    fontSize: 28,
  },

  address: {
    marginTop: 8,
    color: Colors.white,
    fontSize: Typography.body,
    lineHeight: 22,
  },

  badges: {
    flexDirection: 'row',
    marginTop: 14,
    alignItems: 'center',
  },

  ratingChip: {
    backgroundColor: Colors.success700,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginRight: 10,
  },

  rating: {
    color: Colors.white,
    fontFamily: Fonts.interBold,
    fontSize: Typography.small,
  },

  vegChip: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },

  vegText: {
    color: Colors.success700,
    fontFamily: Fonts.interBold,
    fontSize: Typography.small,
  },

  bookButton: {
    marginTop: 18,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.orangePrimary,
    borderRadius: 24,
    paddingHorizontal: 20,
    height: 46,
  },

  bookText: {
    marginLeft: 8,
    color: Colors.white,
    fontFamily: Fonts.interBold,
    fontSize: Typography.body,
  },
});