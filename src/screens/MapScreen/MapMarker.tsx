import React from 'react';

import {
  Image,
  StyleSheet,
  View,
} from 'react-native';

import {MapRestaurant} from './MapRestaurant';

import {
  Colors,
} from '../../theme';

// ============================================================
// PROPS
// ============================================================

type Props = {
  restaurant: MapRestaurant;

  // Whether this marker is currently selected.
  selected?: boolean;
};

// ============================================================
// COMPONENT
// ============================================================

const MapMarker = ({
  restaurant,
  selected = false,
}: Props) => {

  // ==========================================================
  // RESTAURANT IMAGE
  // ==========================================================

  const imageUrl =
    restaurant.coverImageUrl ??
    restaurant.logoUrl ??
    restaurant.imageUrl;

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <View
      style={[
        styles.marker,
        selected && styles.selectedMarker,
      ]}>

      {/* ======================================================
          RESTAURANT IMAGE
      ====================================================== */}

      <View
        style={[
          styles.imageContainer,
          selected &&
            styles.selectedImageContainer,
        ]}>

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
            style={styles.imagePlaceholder}
          />

        )}

      </View>


      {/* ======================================================
          MARKER POINTER
      ====================================================== */}

      <View
        style={[
          styles.pointer,
          selected &&
            styles.selectedPointer,
        ]}
      />

    </View>
  );
};

// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({

  // ==========================================================
  // MARKER
  // ==========================================================

  marker: {
    width: 58,

    height: 72,

    alignItems: 'center',

    justifyContent: 'flex-start',
  },


  // ==========================================================
  // IMAGE
  // ==========================================================

  imageContainer: {
    width: 52,

    height: 52,

    borderRadius: 26,

    overflow: 'hidden',

    backgroundColor:
      Colors.white,

    borderWidth: 3,

    borderColor:
      Colors.white,

    shadowColor:
      '#000000',

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.18,

    shadowRadius: 4,

    elevation: 4,
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
  // SELECTED MARKER
  // ==========================================================

  selectedMarker: {
    transform: [
      {
        scale: 1.12,
      },
    ],
  },


  selectedImageContainer: {
    borderColor:
      Colors.orangePrimary,

    borderWidth: 3,
  },


  // ==========================================================
  // POINTER
  // ==========================================================

  pointer: {
    width: 0,

    height: 0,

    borderLeftWidth: 7,

    borderRightWidth: 7,

    borderTopWidth: 9,

    borderLeftColor:
      'transparent',

    borderRightColor:
      'transparent',

    borderTopColor:
      Colors.white,

    marginTop: -1,
  },


  selectedPointer: {
    borderTopColor:
      Colors.orangePrimary,
  },

});

export default React.memo(
  MapMarker,
);

// import React from 'react';

// import {
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// import {MapRestaurant} from './MapRestaurant';

// import {
//   Colors,
// } from '../../theme';


// // ============================================================
// // PROPS
// // ============================================================

// type Props = {
//   restaurant: MapRestaurant;

//   // Whether this marker is currently selected.
//   selected?: boolean;

//   // Called when the marker is pressed.
//   onPress: () => void;
// };


// // ============================================================
// // COMPONENT
// // ============================================================

// const MapMarker = ({
//   restaurant,
//   selected = false,
//   onPress,
// }: Props) => {

//   return (
//     <TouchableOpacity
//       activeOpacity={0.85}
//       onPress={onPress}
//       style={[
//         styles.marker,
//         selected && styles.selectedMarker,
//       ]}>

//       {/* ======================================================
//           RESTAURANT IMAGE
//       ====================================================== */}

//       <View
//         style={[
//           styles.imageContainer,
//           selected &&
//             styles.selectedImageContainer,
//         ]}>

//         {restaurant.coverImageUrl || restaurant.logoUrl ? (

//           <Image
//             source={{
//               uri:
//                 restaurant.coverImageUrl ?? restaurant.logoUrl,
//             }}
//             resizeMode="cover"
//             style={styles.image}
//           />

//         ) : (

//           <View
//             style={
//               styles.imagePlaceholder
//             }
//           />

//         )}

//       </View>


//       {/* ======================================================
//           MARKER POINTER
//       ====================================================== */}

//       <View
//         style={[
//           styles.pointer,
//           selected &&
//             styles.selectedPointer,
//         ]}
//       />

//     </TouchableOpacity>
//   );
// };


// // ============================================================
// // STYLES
// // ============================================================

// const styles = StyleSheet.create({

//   // ==========================================================
//   // MARKER
//   // ==========================================================

//   marker: {
//     width: 58,
//     height: 72,

//     alignItems: 'center',

//     justifyContent:
//       'flex-start',
//   },


//   // ==========================================================
//   // IMAGE
//   // ==========================================================

//   imageContainer: {
//     width: 52,
//     height: 52,

//     borderRadius: 26,

//     overflow: 'hidden',

//     backgroundColor:
//       Colors.white,

//     borderWidth: 3,

//     borderColor:
//       Colors.white,

//     shadowColor:
//       '#000000',

//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },

//     shadowOpacity: 0.18,

//     shadowRadius: 4,

//     elevation: 4,
//   },


//   image: {
//     width: '100%',
//     height: '100%',
//   },


//   imagePlaceholder: {
//     flex: 1,

//     backgroundColor:
//       Colors.background300,
//   },


//   // ==========================================================
//   // SELECTED MARKER
//   // ==========================================================

//   selectedMarker: {
//     transform: [
//       {
//         scale: 1.12,
//       },
//     ],
//   },


//   selectedImageContainer: {
//     borderColor:
//       Colors.orangePrimary,

//     borderWidth: 3,
//   },


//   // ==========================================================
//   // POINTER
//   // ==========================================================

//   pointer: {
//     width: 0,
//     height: 0,

//     borderLeftWidth: 7,
//     borderRightWidth: 7,

//     borderTopWidth: 9,

//     borderLeftColor:
//       'transparent',

//     borderRightColor:
//       'transparent',

//     borderTopColor:
//       Colors.white,

//     marginTop: -1,
//   },


//   selectedPointer: {
//     borderTopColor:
//       Colors.orangePrimary,
//   },

// });


// export default React.memo(
//   MapMarker,
// );