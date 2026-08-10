import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';

import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';

import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {
  Colors,
  Spacing,
} from '../../theme';

import useMapRestaurants from './useMapRestaurants';

import MapRestaurantCard from './MapRestaurantCard';
import MapMarker from './MapMarker';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  MapRestaurant,
} from './MapRestaurant';


// ============================================================
// CONSTANTS
// ============================================================

/* Default location. */
/* This is only used until restaurant coordinates are available. */

const DEFAULT_LATITUDE = 20.5937;

const DEFAULT_LONGITUDE = 78.9629;

const DEFAULT_LATITUDE_DELTA = 15;

const DEFAULT_LONGITUDE_DELTA = 15;


/* Horizontal restaurant card width. */
/* Keep this value synchronized with the width used inside */
/* MapRestaurantCard.tsx. */

const CARD_WIDTH = 370;

const CARD_SPACING = Spacing.md;


// ============================================================
// MAP SCREEN
// ============================================================

const MapScreen = () => {

  // ==========================================================
  // SAFE AREA
  // ==========================================================

  /*
   * This makes sure our UI does not start underneath the
   * Dynamic Island / camera hinge / status-bar area.
   */

  const insets =
    useSafeAreaInsets();

    // ==========================================================
  // BOTTOM TAB BAR HEIGHT
  // ==========================================================

  /*
   * This is used to position the horizontal restaurant list
   * above the bottom tab bar.
   */
    const tabBarHeight =
  useBottomTabBarHeight();

  // ==========================================================
  // MAP REF
  // ==========================================================

  /*
   * Used to control Google Maps programmatically.
   */

  const mapRef =
    useRef<MapView | null>(null);


  // ==========================================================
  // HORIZONTAL LIST REF
  // ==========================================================

  /*
   * Used to move the restaurant list when a map marker is
   * selected.
   */

  const listRef =
    useRef<
      FlatList<MapRestaurant> | null
    >(null);


  // ==========================================================
  // RESTAURANTS
  // ==========================================================

  const {
    restaurants,
    loading,
    loadingMore,
    refreshing,
    refresh,
    loadMore,
    hasMore,
    error,
  } = useMapRestaurants();


  // ==========================================================
  // SELECTED RESTAURANT
  // ==========================================================

  const [
    selectedRestaurantId,
    setSelectedRestaurantId,
  ] = useState<number | null>(
    null,
  );


  // ==========================================================
  // RESTAURANTS WITH VALID COORDINATES
  // ==========================================================

  /*
   * useMapRestaurants already converts coordinates into
   * numbers.
   *
   * We still check them here because the backend may return
   * null/empty coordinates for some restaurants.
   */

  const validRestaurants =
    restaurants.filter(
      restaurant => {

        const latitude =
          restaurant.latitude;

        const longitude =
          restaurant.longitude;


        return (
          typeof latitude ===
            'number' &&
          Number.isFinite(
            latitude,
          ) &&

          typeof longitude ===
            'number' &&
          Number.isFinite(
            longitude,
          )
        );
      },
    );


  // ==========================================================
  // INITIAL REGION
  // ==========================================================

  /*
   * The first restaurant with valid coordinates becomes the
   * initial map position.
   */

  const initialRegion =
    useCallback((): Region => {

      const firstRestaurant =
        validRestaurants[0];


      if (
        firstRestaurant
      ) {

        return {
          latitude:
            firstRestaurant.latitude!,

          longitude:
            firstRestaurant.longitude!,

          latitudeDelta:
            0.04,

          longitudeDelta:
            0.04,
        };
      }


      return {
        latitude:
          DEFAULT_LATITUDE,

        longitude:
          DEFAULT_LONGITUDE,

        latitudeDelta:
          DEFAULT_LATITUDE_DELTA,

        longitudeDelta:
          DEFAULT_LONGITUDE_DELTA,
      };

    }, [
      validRestaurants,
    ]);


   {/* ======================================================
    MOVE TO RESTAURANT
====================================================== */}

  /*
   * This method is used from BOTH:
   *
   * 1. Horizontal restaurant card
   * 2. Map marker
   *
   * It keeps both UI elements synchronized.
   */



            const moveToRestaurant =
            useCallback(
                (
                restaurant: MapRestaurant,
                ) => {

                const latitude =
                    Number(
                    restaurant.latitude,
                    );

                const longitude =
                    Number(
                    restaurant.longitude,
                    );

                console.log(
                    'MAP RESTAURANT:',
                    restaurant.restaurantId,
                    restaurant.restaurantName,
                );

                console.log(
                    'MAP COORDINATES:',
                    latitude,
                    longitude,
                );

                if (
                    !Number.isFinite(latitude) ||
                    !Number.isFinite(longitude)
                ) {

                    console.log(
                    'INVALID RESTAURANT COORDINATES',
                    );

                    return;
                }

      {/* ======================================================
          SELECT RESTAURANT
      ====================================================== */}

      setSelectedRestaurantId(
        restaurant.restaurantId,
      );

      {/* ======================================================
          MOVE GOOGLE MAP
      ====================================================== */}

      mapRef.current?.animateToRegion(
        {
          latitude,
          longitude,
          latitudeDelta: 0.012,
          longitudeDelta: 0.012,
        },
        500,
      );

      {/* ======================================================
          FIND RESTAURANT IN LIST
      ====================================================== */}

      const index =
        restaurants.findIndex(
          item =>
            item.restaurantId ===
            restaurant.restaurantId,
        );

      {/* ======================================================
          SCROLL HORIZONTAL LIST
      ====================================================== */}

      if (index >= 0) {

        setTimeout(() => {

          try {

            listRef.current?.scrollToIndex({
              index,
              animated: true,
              viewPosition: 0.5,
            });

          } catch {

            // Ignore scroll errors.

          }

        }, 100);

      }

    },
    [
      restaurants,
    ],
  );

  // ==========================================================
  // MARKER PRESS
  // ==========================================================

  const handleMarkerPress =
    useCallback(
      (
        restaurant: MapRestaurant,
      ) => {

        moveToRestaurant(
          restaurant,
        );

      },
      [
        moveToRestaurant,
      ],
    );


  // ==========================================================
  // CARD PRESS
  // ==========================================================

  const handleCardPress =
    useCallback(
      (
        restaurant: MapRestaurant,
      ) => {

        moveToRestaurant(
          restaurant,
        );

      },
      [
        moveToRestaurant,
      ],
    );


  // ==========================================================
  // SELECT FIRST RESTAURANT
  // ==========================================================

  /*
   * Once restaurant data arrives, automatically select the
   * first restaurant with valid coordinates.
   *
   * IMPORTANT:
   *
   * We only do this when there is currently no selection.
   *
   * Otherwise the map would jump back to the first restaurant
   * every time the API/list changes.
   */

  useEffect(() => {

    if (
      selectedRestaurantId !==
        null
    ) {
      return;
    }


    if (
      validRestaurants.length ===
        0
    ) {
      return;
    }


    const firstRestaurant =
      validRestaurants[0];


    setSelectedRestaurantId(
      firstRestaurant.restaurantId,
    );


    if (
      typeof firstRestaurant.latitude ===
        'number' &&
      typeof firstRestaurant.longitude ===
        'number'
    ) {

      mapRef.current?.animateToRegion(
        {
          latitude:
            firstRestaurant.latitude,

          longitude:
            firstRestaurant.longitude,

          latitudeDelta:
            0.04,

          longitudeDelta:
            0.04,
        },

        500,
      );
    }

  }, [
    validRestaurants,
    selectedRestaurantId,
  ]);


  // ==========================================================
  // LOAD MORE
  // ==========================================================

  const handleLoadMore =
    useCallback(() => {

      if (
        !hasMore ||
        loadingMore ||
        refreshing
      ) {
        return;
      }


      loadMore();

    }, [
      hasMore,
      loadingMore,
      refreshing,
      loadMore,
    ]);


  // ==========================================================
  // RESTAURANT CARD RENDERER
  // ==========================================================

  const renderRestaurantCard =
    useCallback(
      ({
        item,
      }: {
        item: MapRestaurant;
      }) => {

        return (
          <MapRestaurantCard
            restaurant={
              item
            }

            selected={
              selectedRestaurantId ===
              item.restaurantId
            }

            onPress={() =>
              handleCardPress(
                item,
              )
            }
          />
        );

      },
      [
        selectedRestaurantId,
        handleCardPress,
      ],
    );


  // ==========================================================
  // KEY EXTRACTOR
  // ==========================================================

  const keyExtractor =
    useCallback(
      (
        item: MapRestaurant,
      ) =>
        item.restaurantId.toString(),

      [],
    );


  // ==========================================================
  // INITIAL LOADING
  // ==========================================================

  if (loading) {

    return (
      <View
        style={[
          styles.loaderContainer,

          {
            paddingTop:
              insets.top,
          },
        ]}>

        <ActivityIndicator
          size="large"
          color={
            Colors.orangePrimary
          }
        />

      </View>
    );
  }


  // ==========================================================
  // SCREEN
  // ==========================================================

  return (
    <View
      style={
        styles.container
      }>

      {/* ======================================================
          GOOGLE MAP
      ====================================================== */}

      <MapView
        ref={
          mapRef
        }

        provider={
          PROVIDER_GOOGLE
        }

        style={
          styles.map
        }

        initialRegion={
          initialRegion()
        }

        showsUserLocation={
          true
        }

        showsMyLocationButton={
          true
        }

        showsCompass={
          false
        }

        toolbarEnabled={
          false
        }

        loadingEnabled={
          true
        }

        loadingIndicatorColor={
          Colors.orangePrimary
        }>

        {/* ======================================================
            RESTAURANT MARKERS
        ====================================================== */}

            {validRestaurants.map(restaurant => {

            const latitude = Number(
                restaurant.latitude,
            );

            const longitude = Number(
                restaurant.longitude,
            );

            if (
                !Number.isFinite(latitude) ||
                !Number.isFinite(longitude)
            ) {
                return null;
            }

            return (
                <Marker
                key={`restaurant-marker-${restaurant.restaurantId}`}
                coordinate={{
                    latitude,
                    longitude,
                }}
                anchor={{
                    x: 0.5,
                    y: 1,
                }}
                tracksViewChanges={true}
                onPress={() =>
                    handleMarkerPress(
                    restaurant,
                    )
                }>

                <MapMarker
                    restaurant={
                    restaurant
                    }
                    selected={
                    selectedRestaurantId ===
                    restaurant.restaurantId
                    }
                />

                </Marker>
            );
            })}
      </MapView>


      {/* ======================================================
          TOP SAFE AREA
      ====================================================== */}

      {/*
       * Transparent view only reserves the top safe-area space.
       *
       * The map itself continues underneath it.
       */}

      <View
        pointerEvents="none"
        style={[
          styles.topSafeArea,
          {
            height:
              insets.top,
          },
        ]}
      />


      {/* ======================================================
          ERROR
      ====================================================== */}

      {/*
       * We don't block the map when the API fails.
       *
       * The map can still remain visible if previously loaded
       * data exists.
       */}

      {error &&
        restaurants.length === 0 && (

          <View
            pointerEvents="none"
            style={[
              styles.errorContainer,
              {
                top:
                  insets.top +
                  20,
              },
            ]}>

            <View
              style={
                styles.errorCard
              }>

              {/* Keep this intentionally simple.
                  We can replace it with your AppText later. */}

            </View>

          </View>
        )}


      {/* ======================================================
          HORIZONTAL RESTAURANT LIST
      ====================================================== */}

      <View
        style={[
          styles.restaurantListContainer,

          {
            bottom:
              tabBarHeight +16,
          },
        ]}>

        <FlatList
          ref={
            listRef
          }

          data={
            restaurants
          }

          horizontal

          showsHorizontalScrollIndicator={
            false
          }

          contentContainerStyle={
            styles.restaurantListContent
          }

          renderItem={
            renderRestaurantCard
          }

          keyExtractor={
            keyExtractor
          }

          onEndReached={
            handleLoadMore
          }

          onEndReachedThreshold={
            0.7
          }

          refreshing={
            refreshing
          }

          onRefresh={
            refresh
          }

          getItemLayout={
            (
              _data,
              index,
            ) => ({

              length:
                CARD_WIDTH +
                CARD_SPACING,

              offset:
                (
                  CARD_WIDTH +
                  CARD_SPACING
                ) *
                index,

              index,
            })
          }

          onScrollToIndexFailed={
            info => {

              // ------------------------------------------------
              // Sometimes scrollToIndex runs before FlatList
              // has measured all items.
              //
              // Retry after a short delay.
              // ------------------------------------------------

              setTimeout(() => {

                listRef.current?.scrollToOffset(
                  {
                    offset:
                      info.index *
                      (
                        CARD_WIDTH +
                        CARD_SPACING
                      ),

                    animated:
                      true,
                  },
                );

              }, 100);
            }
          }

          ListFooterComponent={
            loadingMore ? (

              <View
                style={
                  styles.footerLoader
                }>

                <ActivityIndicator
                  size="small"
                  color={
                    Colors.orangePrimary
                  }
                />

              </View>

            ) : null
          }
        />

      </View>

    </View>
  );
};


// ============================================================
// STYLES
// ============================================================

const styles =
  StyleSheet.create({

    // ========================================================
    // MAIN CONTAINER
    // ========================================================

    container: {
      flex: 1,

      backgroundColor:
        Colors.background100,
    },


    // ========================================================
    // GOOGLE MAP
    // ========================================================

    map: {
      ...StyleSheet.absoluteFill,
    },


    // ========================================================
    // INITIAL LOADER
    // ========================================================

    loaderContainer: {
      flex: 1,

      justifyContent:
        'center',

      alignItems:
        'center',

      backgroundColor:
        Colors.background100,
    },


    // ========================================================
    // TOP SAFE AREA
    // ========================================================

    topSafeArea: {
      position:
        'absolute',

      top: 0,

      left: 0,

      right: 0,

      backgroundColor:
        'transparent',
    },


    // ========================================================
    // RESTAURANT LIST CONTAINER
    // ========================================================

    restaurantListContainer: {
      position:
        'absolute',

      left: 0,

      right: 0,
    },


    // ========================================================
    // RESTAURANT LIST CONTENT
    // ========================================================

    restaurantListContent: {
      paddingHorizontal:
        Spacing.md,

      paddingVertical:
        Spacing.sm,
    },


    // ========================================================
    // FOOTER LOADER
    // ========================================================

    footerLoader: {
      width: 50,

      justifyContent:
        'center',

      alignItems:
        'center',

      marginLeft:
        Spacing.sm,
    },


    // ========================================================
    // ERROR
    // ========================================================

    errorContainer: {
      position:
        'absolute',

      left:
        Spacing.md,

      right:
        Spacing.md,

      alignItems:
        'center',
    },


    errorCard: {
      minHeight: 1,

      minWidth: 1,
    },

  });


export default React.memo(
  MapScreen,
);

// import React, {
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
// } from 'react';

// import {
//   ActivityIndicator,
//   FlatList,
//   StyleSheet,
//   View,
// } from 'react-native';

// import MapView, {
//   Marker,
//   PROVIDER_GOOGLE,
//   Region,
// } from 'react-native-maps';

// import {
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';

// import {
//   Colors,
//   Spacing,
// } from '../../theme';

// import useMapRestaurants from './useMapRestaurants';

// import MapRestaurantCard from './MapRestaurantCard';
// import MapMarker from './MapMarker';

// import {
//   MapRestaurant,
// } from './MapRestaurant';


// // ============================================================
// // CONSTANTS
// // ============================================================

// // Default location.
// //
// // This is only used until restaurant coordinates are available.

// const DEFAULT_LATITUDE = 20.5937;

// const DEFAULT_LONGITUDE = 78.9629;

// const DEFAULT_LATITUDE_DELTA = 15;

// const DEFAULT_LONGITUDE_DELTA = 15;


// // Horizontal restaurant card width.
// //
// // Keep this value synchronized with the width used inside
// // MapRestaurantCard.tsx.

// const CARD_WIDTH = 370;

// const CARD_SPACING = Spacing.md;


// // ============================================================
// // MAP SCREEN
// // ============================================================

// const MapScreen = () => {

//   // ==========================================================
//   // SAFE AREA
//   // ==========================================================
//   //
//   // This makes sure our UI does not start underneath the
//   // Dynamic Island / camera hinge / status-bar area.
//   // ==========================================================

//   const insets =
//     useSafeAreaInsets();


//   // ==========================================================
//   // MAP REF
//   // ==========================================================
//   //
//   // Used to control Google Maps programmatically.
//   // ==========================================================

//   const mapRef =
//     useRef<MapView | null>(null);


//   // ==========================================================
//   // HORIZONTAL LIST REF
//   // ==========================================================
//   //
//   // Used to move the restaurant list when a map marker is
//   // selected.
//   // ==========================================================

//   const listRef =
//     useRef<
//       FlatList<MapRestaurant> | null
//     >(null);


//   // ==========================================================
//   // RESTAURANTS
//   // ==========================================================

//   const {
//     restaurants,
//     loading,
//     loadingMore,
//     refreshing,
//     refresh,
//     loadMore,
//     hasMore,
//     error,
//   } = useMapRestaurants();


//   // ==========================================================
//   // SELECTED RESTAURANT
//   // ==========================================================

//   const [
//     selectedRestaurantId,
//     setSelectedRestaurantId,
//   ] = useState<number | null>(
//     null,
//   );


//   // ==========================================================
//   // RESTAURANTS WITH VALID COORDINATES
//   // ==========================================================
//   //
//   // useMapRestaurants already converts coordinates into
//   // numbers.
//   //
//   // We still check them here because the backend may return
//   // null/empty coordinates for some restaurants.
//   // ==========================================================

//   const validRestaurants =
//     restaurants.filter(
//       restaurant => {

//         const latitude =
//           restaurant.latitude;

//         const longitude =
//           restaurant.longitude;


//         return (
//           typeof latitude ===
//             'number' &&
//           Number.isFinite(
//             latitude,
//           ) &&
//           typeof longitude ===
//             'number' &&
//           Number.isFinite(
//             longitude,
//           )
//         );
//       },
//     );


//   // ==========================================================
//   // INITIAL REGION
//   // ==========================================================
//   //
//   // The first restaurant with valid coordinates becomes the
//   // initial map position.
//   // ==========================================================

//   const initialRegion =
//     useCallback((): Region => {

//       const firstRestaurant =
//         validRestaurants[0];


//       if (
//         firstRestaurant
//       ) {

//         return {
//           latitude:
//             firstRestaurant.latitude!,

//           longitude:
//             firstRestaurant.longitude!,

//           latitudeDelta:
//             0.04,

//           longitudeDelta:
//             0.04,
//         };
//       }


//       return {
//         latitude:
//           DEFAULT_LATITUDE,

//         longitude:
//           DEFAULT_LONGITUDE,

//         latitudeDelta:
//           DEFAULT_LATITUDE_DELTA,

//         longitudeDelta:
//           DEFAULT_LONGITUDE_DELTA,
//       };

//     }, [
//       validRestaurants,
//     ]);


//   // ==========================================================
//   // MOVE MAP TO RESTAURANT
//   // ==========================================================
//   //
//   // This method is used from BOTH:
//   //
//   // 1. Horizontal restaurant card
//   // 2. Map marker
//   //
//   // It keeps both UI elements synchronized.
//   // ==========================================================

//   const moveToRestaurant =
//     useCallback(
//       (
//         restaurant: MapRestaurant,
//       ) => {

//         // ----------------------------------------------------
//         // Validate coordinates
//         // ----------------------------------------------------

//         if (
//           typeof restaurant.latitude !==
//             'number' ||
//           typeof restaurant.longitude !==
//             'number'
//         ) {
//           return;
//         }


//         if (
//           !Number.isFinite(
//             restaurant.latitude,
//           ) ||
//           !Number.isFinite(
//             restaurant.longitude,
//           )
//         ) {
//           return;
//         }


//         // ----------------------------------------------------
//         // Select restaurant
//         // ----------------------------------------------------

//         setSelectedRestaurantId(
//           restaurant.restaurantId,
//         );


//         // ----------------------------------------------------
//         // Move Google Maps camera
//         // ----------------------------------------------------

//         mapRef.current?.animateToRegion(
//           {
//             latitude:
//               restaurant.latitude,

//             longitude:
//               restaurant.longitude,

//             // Closer zoom than the initial region.

//             latitudeDelta:
//               0.012,

//             longitudeDelta:
//               0.012,
//           },

//           500,
//         );


//         // ----------------------------------------------------
//         // Find restaurant in horizontal list
//         // ----------------------------------------------------

//         const index =
//           restaurants.findIndex(
//             item =>
//               item.restaurantId ===
//               restaurant.restaurantId,
//           );


//         // ----------------------------------------------------
//         // Scroll horizontal list
//         // ----------------------------------------------------

//         if (
//           index >= 0
//         ) {

//           try {

//             listRef.current?.scrollToIndex({
//               index,

//               animated: true,

//               viewPosition: 0.5,
//             });

//           } catch {
//             // Ignore scroll errors.
//           }
//         }

//       },
//       [
//         restaurants,
//       ],
//     );


//   // ==========================================================
//   // MARKER PRESS
//   // ==========================================================

//   const handleMarkerPress =
//     useCallback(
//       (
//         restaurant: MapRestaurant,
//       ) => {

//         moveToRestaurant(
//           restaurant,
//         );

//       },
//       [
//         moveToRestaurant,
//       ],
//     );


//   // ==========================================================
//   // CARD PRESS
//   // ==========================================================

//   const handleCardPress =
//     useCallback(
//       (
//         restaurant: MapRestaurant,
//       ) => {

//         moveToRestaurant(
//           restaurant,
//         );

//       },
//       [
//         moveToRestaurant,
//       ],
//     );


//   // ==========================================================
//   // SELECT FIRST RESTAURANT
//   // ==========================================================
//   //
//   // Once restaurant data arrives, automatically select the
//   // first restaurant with valid coordinates.
//   //
//   // IMPORTANT:
//   //
//   // We only do this when there is currently no selection.
//   //
//   // Otherwise the map would jump back to the first restaurant
//   // every time the API/list changes.
//   // ==========================================================

//   useEffect(() => {

//     if (
//       selectedRestaurantId !==
//         null
//     ) {
//       return;
//     }


//     if (
//       validRestaurants.length ===
//         0
//     ) {
//       return;
//     }


//     const firstRestaurant =
//       validRestaurants[0];


//     setSelectedRestaurantId(
//       firstRestaurant.restaurantId,
//     );


//     if (
//       typeof firstRestaurant.latitude ===
//         'number' &&
//       typeof firstRestaurant.longitude ===
//         'number'
//     ) {

//       mapRef.current?.animateToRegion(
//         {
//           latitude:
//             firstRestaurant.latitude,

//           longitude:
//             firstRestaurant.longitude,

//           latitudeDelta:
//             0.04,

//           longitudeDelta:
//             0.04,
//         },

//         500,
//       );
//     }

//   }, [
//     validRestaurants,
//     selectedRestaurantId,
//   ]);


//   // ==========================================================
//   // LOAD MORE
//   // ==========================================================

//   const handleLoadMore =
//     useCallback(() => {

//       if (
//         !hasMore ||
//         loadingMore ||
//         refreshing
//       ) {
//         return;
//       }


//       loadMore();

//     }, [
//       hasMore,
//       loadingMore,
//       refreshing,
//       loadMore,
//     ]);


//   // ==========================================================
//   // RESTAURANT CARD RENDERER
//   // ==========================================================

//   const renderRestaurantCard =
//     useCallback(
//       ({
//         item,
//       }: {
//         item: MapRestaurant;
//       }) => {

//         return (
//           <MapRestaurantCard
//             restaurant={
//               item
//             }

//             selected={
//               selectedRestaurantId ===
//               item.restaurantId
//             }

//             onPress={() =>
//               handleCardPress(
//                 item,
//               )
//             }
//           />
//         );

//       },
//       [
//         selectedRestaurantId,
//         handleCardPress,
//       ],
//     );


//   // ==========================================================
//   // KEY EXTRACTOR
//   // ==========================================================

//   const keyExtractor =
//     useCallback(
//       (
//         item: MapRestaurant,
//       ) =>
//         item.restaurantId.toString(),

//       [],
//     );


//   // ==========================================================
//   // INITIAL LOADING
//   // ==========================================================

//   if (loading) {

//     return (
//       <View
//         style={[
//           styles.loaderContainer,

//           {
//             paddingTop:
//               insets.top,
//           },
//         ]}>

//         <ActivityIndicator
//           size="large"
//           color={
//             Colors.orangePrimary
//           }
//         />

//       </View>
//     );
//   }


//   // ==========================================================
//   // SCREEN
//   // ==========================================================

//   return (
//     <View
//       style={
//         styles.container
//       }>

//       {/* ======================================================
//           GOOGLE MAP
//       ====================================================== */}

//       <MapView
//         ref={
//           mapRef
//         }

//         provider={
//           PROVIDER_GOOGLE
//         }

//         style={
//           styles.map
//         }

//         initialRegion={
//           initialRegion()
//         }

//         showsUserLocation={
//           true
//         }

//         showsMyLocationButton={
//           true
//         }

//         showsCompass={
//           false
//         }

//         toolbarEnabled={
//           false
//         }

//         loadingEnabled={
//           true
//         }

//         loadingIndicatorColor={
//           Colors.orangePrimary
//         }>

//         {/* ====================================================
//             RESTAURANT MARKERS
//         ==================================================== */}

//         {validRestaurants.map(
//           restaurant => (

//             <Marker
//               key={
//                 restaurant.restaurantId
//               }

//               coordinate={{
//                 latitude:
//                   restaurant.latitude!,

//                 longitude:
//                   restaurant.longitude!,
//               }}

//               anchor={{
//                 x: 0.5,

//                 y: 1,
//               }}

//               tracksViewChanges={
//                 false
//               }

//               onPress={() =>
//                 handleMarkerPress(
//                   restaurant,
//                 )
//               }>

//               <MapMarker
//                 restaurant={
//                   restaurant
//                 }

//                 selected={
//                   selectedRestaurantId ===
//                   restaurant.restaurantId
//                 }

//                 onPress={() =>
//                   handleMarkerPress(
//                     restaurant,
//                   )
//                 }
//               />

//             </Marker>
//           ),
//         )}

//       </MapView>


//       {/* ======================================================
//           TOP SAFE AREA
//       ====================================================== */}
//       //
//       // Transparent view only reserves the top safe-area space.
//       //
//       // The map itself continues underneath it.
//       // ======================================================

//       <View
//         pointerEvents="none"
//         style={[
//           styles.topSafeArea,
//           {
//             height:
//               insets.top,
//           },
//         ]}
//       />


//       {/* ======================================================
//           ERROR
//       ====================================================== */}
//       //
//       // We don't block the map when the API fails.
//       //
//       // The map can still remain visible if previously loaded
//       // data exists.
//       // ======================================================

//       {error &&
//         restaurants.length === 0 && (

//           <View
//             pointerEvents="none"
//             style={[
//               styles.errorContainer,
//               {
//                 top:
//                   insets.top +
//                   20,
//               },
//             ]}>

//             <View
//               style={
//                 styles.errorCard
//               }>

//               {/* Keep this intentionally simple.
//                   We can replace it with your AppText later. */}

//             </View>

//           </View>
//         )}


//       {/* ======================================================
//           HORIZONTAL RESTAURANT LIST
//       ====================================================== */}

//       <View
//         style={[
//           styles.restaurantListContainer,

//           {
//             bottom:
//               insets.bottom +
//               16,
//           },
//         ]}>

//         <FlatList
//           ref={
//             listRef
//           }

//           data={
//             restaurants
//           }

//           horizontal

//           showsHorizontalScrollIndicator={
//             false
//           }

//           contentContainerStyle={
//             styles.restaurantListContent
//           }

//           renderItem={
//             renderRestaurantCard
//           }

//           keyExtractor={
//             keyExtractor
//           }

//           onEndReached={
//             handleLoadMore
//           }

//           onEndReachedThreshold={
//             0.7
//           }

//           refreshing={
//             refreshing
//           }

//           onRefresh={
//             refresh
//           }

//           getItemLayout={
//             (
//               _data,
//               index,
//             ) => ({

//               length:
//                 CARD_WIDTH +
//                 CARD_SPACING,

//               offset:
//                 (
//                   CARD_WIDTH +
//                   CARD_SPACING
//                 ) *
//                 index,

//               index,
//             })
//           }

//           onScrollToIndexFailed={
//             info => {

//               // ------------------------------------------------
//               // Sometimes scrollToIndex runs before FlatList
//               // has measured all items.
//               //
//               // Retry after a short delay.
//               // ------------------------------------------------

//               setTimeout(() => {

//                 listRef.current?.scrollToOffset(
//                   {
//                     offset:
//                       info.index *
//                       (
//                         CARD_WIDTH +
//                         CARD_SPACING
//                       ),

//                     animated:
//                       true,
//                   },
//                 );

//               }, 100);
//             }
//           }

//           ListFooterComponent={
//             loadingMore ? (

//               <View
//                 style={
//                   styles.footerLoader
//                 }>

//                 <ActivityIndicator
//                   size="small"
//                   color={
//                     Colors.orangePrimary
//                   }
//                 />

//               </View>

//             ) : null
//           }
//         />

//       </View>

//     </View>
//   );
// };


// // ============================================================
// // STYLES
// // ============================================================

// const styles =
//   StyleSheet.create({

//     // ========================================================
//     // MAIN CONTAINER
//     // ========================================================

//     container: {
//       flex: 1,

//       backgroundColor:
//         Colors.background100,
//     },


//     // ========================================================
//     // GOOGLE MAP
//     // ========================================================

//     map: {
//       ...StyleSheet.absoluteFill,
//     },


//     // ========================================================
//     // INITIAL LOADER
//     // ========================================================

//     loaderContainer: {
//       flex: 1,

//       justifyContent:
//         'center',

//       alignItems:
//         'center',

//       backgroundColor:
//         Colors.background100,
//     },


//     // ========================================================
//     // TOP SAFE AREA
//     // ========================================================

//     topSafeArea: {
//       position:
//         'absolute',

//       top: 0,

//       left: 0,

//       right: 0,

//       backgroundColor:
//         'transparent',
//     },


//     // ========================================================
//     // RESTAURANT LIST CONTAINER
//     // ========================================================

//     restaurantListContainer: {
//       position:
//         'absolute',

//       left: 0,

//       right: 0,
//     },


//     // ========================================================
//     // RESTAURANT LIST CONTENT
//     // ========================================================

//     restaurantListContent: {
//       paddingHorizontal:
//         Spacing.md,

//       paddingVertical:
//         Spacing.sm,
//     },


//     // ========================================================
//     // FOOTER LOADER
//     // ========================================================

//     footerLoader: {
//       width: 50,

//       justifyContent:
//         'center',

//       alignItems:
//         'center',

//       marginLeft:
//         Spacing.sm,
//     },


//     // ========================================================
//     // ERROR
//     // ========================================================

//     errorContainer: {
//       position:
//         'absolute',

//       left:
//         Spacing.md,

//       right:
//         Spacing.md,

//       alignItems:
//         'center',
//     },


//     errorCard: {
//       minHeight: 1,

//       minWidth: 1,
//     },

//   });


// export default React.memo(
//   MapScreen,
// );