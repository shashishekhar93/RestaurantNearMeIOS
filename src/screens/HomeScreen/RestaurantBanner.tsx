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

import {Restaurant} from '../../api/services/restaurantList/Restaurant';

type RestaurantWithOptionalDisplayData = Restaurant & {
  coverImageUrl?: string;
  distance?: number;
  distanceInKm?: number;
  closingTime?: string;
  openingTime?: string;
};

type Props = {
  restaurant: Restaurant;
};

const RestaurantBanner = ({restaurant}: Props) => {
  const restaurantData =
    restaurant as RestaurantWithOptionalDisplayData;

  const image =
    restaurantData.coverImageUrl ||
    'https://via.placeholder.com/1000x650';

  const rating = Number(
    restaurantData.rating ?? 0,
  );

  const cuisine =
    restaurantData.cuisine?.trim() ||
    'ITALIAN · CAFÉ';

  const distance =
    restaurantData.distance ??
    restaurantData.distanceInKm ??
    0.3;

  const openingStatus = restaurantData.openNow
    ? 'Open until 10:30 PM'
    : 'Closed';

  return (
    <View style={styles.container}>

      {/* Restaurant Image */}
      <Image
        source={{uri: image}}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Dark gradient-like overlay */}
      <View style={styles.overlayTop} />
      <View style={styles.overlayBottom} />

      {/* Rating */}
      <View style={styles.ratingContainer}>
        <AppText style={styles.star}>
          ★
        </AppText>

        <AppText style={styles.ratingText}>
          {rating.toFixed(1)}
        </AppText>
      </View>

      {/* Bottom Content */}
      <View style={styles.bottomContent}>

        {/* Cuisine */}
        <View style={styles.cuisineContainer}>
          <AppText
            numberOfLines={1}
            style={styles.cuisineText}>
            {cuisine.toUpperCase()}
          </AppText>
        </View>

        {/* Restaurant Name */}
        <AppText
          numberOfLines={1}
          style={styles.restaurantName}>
          {restaurantData.restaurantName}
        </AppText>

        {/* Distance + Open Status */}
        <AppText
          numberOfLines={1}
          style={styles.restaurantMeta}>
          {distance.toFixed(1)} km
          {'  ·  '}
          {openingStatus}
        </AppText>

      </View>
    </View>
  );
};

export default React.memo(RestaurantBanner);

const styles = StyleSheet.create({

  /**
   * Main banner
   *
   * The screenshot has a wide horizontal banner.
   * aspectRatio keeps the proportions consistent
   * across different iPhone sizes.
   */
  container: {
    width: '100%',
    aspectRatio: 1.58,

    borderRadius: Radius.xl,
    overflow: 'hidden',

    marginBottom: Spacing.lg,

    backgroundColor: Colors.black,
  },

  /**
   * Full image.
   */
  image: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },

  /**
   * Subtle dark overlay across the entire image.
   */
  overlayTop: {
    ...StyleSheet.absoluteFill,

    backgroundColor:
      'rgba(0, 0, 0, 0.05)',
  },

  /**
   * Stronger bottom overlay.
   *
   * This gives the text the same readability
   * as the reference screenshot.
   */
  overlayBottom: {
    position: 'absolute',

    left: 0,
    right: 0,
    bottom: 0,

    height: '100%',

    backgroundColor:
      'rgba(0, 0, 0, 0.38)',
  },

  /**
   * Rating pill.
   *
   * Screenshot:
   * white rounded pill
   * gold star
   * black rating
   */
  ratingContainer: {
    position: 'absolute',

    top: Spacing.md,
    right: Spacing.md,

    minWidth: 64,
    height: 38,

    paddingHorizontal: Spacing.md,

    borderRadius: Radius.rounded,

    backgroundColor: Colors.white,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    gap: 5,
  },

  star: {
    color: '#E7A63A',

    fontSize: 18,

    lineHeight: 24,

    fontFamily: Fonts.interBold,
  },

  ratingText: {
    color: Colors.black,

    fontSize: 18,

    lineHeight: 24,

    fontFamily: Fonts.interBold,
  },

  /**
   * Content anchored to bottom.
   */
  bottomContent: {
    position: 'absolute',

    left: Spacing.xl,
    right: Spacing.xl,
    bottom: Spacing.xl,
  },

  /**
   * Cuisine/category pill.
   */
  cuisineContainer: {
    alignSelf: 'flex-start',

    maxWidth: '85%',

    paddingHorizontal: Spacing.lg,
    paddingVertical: 10,

    borderRadius: Radius.rounded,

    backgroundColor:
      'rgba(150, 110, 82, 0.90)',

    marginBottom: Spacing.md,
  },

  cuisineText: {
    color: Colors.white,

    fontFamily: Fonts.interBold,

    fontSize: Typography.body,

    letterSpacing: 0.5,
  },

  /**
   * Restaurant name.
   */
  restaurantName: {
    color: Colors.white,

    fontFamily: Fonts.interBold,

    fontSize: 24,

    lineHeight: 30,

    marginBottom: 4,
  },

  /**
   * Distance + opening time.
   */
  restaurantMeta: {
    color: Colors.white,

    fontFamily: Fonts.interRegular,

    fontSize: 20,

    lineHeight: 28,
  },
});

// import React from 'react';
// import {
//   Alert,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// import AppText from '../../component/AppText/AppText';
// import {
//   Colors,
//   Fonts,
//   Radius,
//   Spacing,
//   Typography,
// } from '../../theme';

// import {Restaurant} from '../../api/services/restaurantList/Restaurant';
// import HeartIcon from '../../assets/icons/ic_favorites.svg';
// import BookIcon from '../../assets/icons/ic_reservations.svg';

// type Props = {
//   restaurant: Restaurant;
// };

// const RestaurantBanner = ({restaurant}: Props) => {
//   return (
//     <View style={styles.container}>
//       <Image
//         source={{
//           uri:
//             restaurant.coverImageUrl ||
//             'https://via.placeholder.com/800x500',
//         }}
//         style={styles.image}
//       />

//       <View style={styles.overlay} />

//       <View style={styles.content}>
//         <View style={styles.topRow}>
//           <View style={styles.featuredChip}>
//             <AppText style={styles.featuredText}>
//               FEATURED
//             </AppText>
//           </View>

//           <TouchableOpacity
//             style={styles.iconButton}
//             onPress={() =>
//               Alert.alert(
//                 'Favourite',
//                 'Added to favourites',
//               )
//             }>
//             <HeartIcon
//               width={20}
//               height={20}
//               color={Colors.white}
//             />
//           </TouchableOpacity>
//         </View>

//         <View>
//           <AppText
//             numberOfLines={1}
//             style={styles.name}>
//             {restaurant.restaurantName}
//           </AppText>

//           <AppText
//             numberOfLines={2}
//             style={styles.address}>
//             {restaurant.address}
//           </AppText>

//           <View style={styles.badges}>
//             <View style={styles.ratingChip}>
//               <AppText style={styles.rating}>
//                 ⭐ {Number(restaurant.rating ?? 0).toFixed(1)}
//               </AppText>
//             </View>

//             {restaurant.pureVeg && (
//               <View style={styles.vegChip}>
//                 <AppText style={styles.vegText}>
//                   PURE VEG
//                 </AppText>
//               </View>
//             )}
//           </View>

//           <TouchableOpacity
//             style={styles.bookButton}
//             onPress={() =>
//               Alert.alert(
//                 'Booking',
//                 'Booking feature coming soon',
//               )
//             }>
//             <BookIcon
//               width={18}
//               height={18}
//               color={Colors.white}
//             />

//             <AppText style={styles.bookText}>
//               Book Table
//             </AppText>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default React.memo(RestaurantBanner);

// const styles = StyleSheet.create({
//   container: {
//     height: 270,
//     borderRadius: Radius.xl,
//     overflow: 'hidden',
//     marginBottom: Spacing.lg,
//     backgroundColor: Colors.white,
//   },

//   image: {
//     ...StyleSheet.absoluteFill,
//   },

//   overlay: {
//     ...StyleSheet.absoluteFill,
//     backgroundColor: 'rgba(0,0,0,0.35)',
//   },

//   content: {
//     flex: 1,
//     justifyContent: 'space-between',
//     padding: Spacing.md,
//   },

//   topRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },

//   featuredChip: {
//     backgroundColor: Colors.orangePrimary,
//     borderRadius: 20,
//     paddingHorizontal: 14,
//     paddingVertical: 6,
//   },

//   featuredText: {
//     color: Colors.white,
//     fontFamily: Fonts.interBold,
//     fontSize: Typography.small,
//   },

//   iconButton: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: 'rgba(0,0,0,0.30)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   name: {
//     color: Colors.white,
//     fontFamily: Fonts.interBold,
//     fontSize: 28,
//   },

//   address: {
//     marginTop: 8,
//     color: Colors.white,
//     fontSize: Typography.body,
//     lineHeight: 22,
//   },

//   badges: {
//     flexDirection: 'row',
//     marginTop: 14,
//     alignItems: 'center',
//   },

//   ratingChip: {
//     backgroundColor: Colors.success700,
//     borderRadius: 16,
//     paddingHorizontal: 12,
//     paddingVertical: 5,
//     marginRight: 10,
//   },

//   rating: {
//     color: Colors.white,
//     fontFamily: Fonts.interBold,
//     fontSize: Typography.small,
//   },

//   vegChip: {
//     backgroundColor: Colors.white,
//     borderRadius: 16,
//     paddingHorizontal: 12,
//     paddingVertical: 5,
//   },

//   vegText: {
//     color: Colors.success700,
//     fontFamily: Fonts.interBold,
//     fontSize: Typography.small,
//   },

//   bookButton: {
//     marginTop: 18,
//     alignSelf: 'flex-start',
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: Colors.orangePrimary,
//     borderRadius: 24,
//     paddingHorizontal: 20,
//     height: 46,
//   },

//   bookText: {
//     marginLeft: 8,
//     color: Colors.white,
//     fontFamily: Fonts.interBold,
//     fontSize: Typography.body,
//   },
// });