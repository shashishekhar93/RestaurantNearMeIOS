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

// import {
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';

import {
  useBottomTabBarHeight,
} from '@react-navigation/bottom-tabs';


import MainLayout from '../../component/MainLayout';

import {
  Colors,
  Spacing,
} from '../../theme';

import useMapRestaurants from './useMapRestaurants';

import MapRestaurantCard from './MapRestaurantCard';

import MapMarker from './MapMarker';

import {
  MapRestaurant,
} from './MapRestaurant';

// ============================================================
// CONSTANTS
// ============================================================

const DEFAULT_LATITUDE = 20.5937;

const DEFAULT_LONGITUDE = 78.9629;

const DEFAULT_LATITUDE_DELTA = 15;

const DEFAULT_LONGITUDE_DELTA = 15;


// ============================================================
// HORIZONTAL CARD SIZE
// ============================================================

const CARD_WIDTH = 370;

const CARD_SPACING = Spacing.md;


// ============================================================
// MAP SCREEN
// ============================================================

const MapScreen = () => {

  // ==========================================================
  // SAFE AREA
  // ==========================================================

  //const insets =useSafeAreaInsets();
  const tabBarHeight =useBottomTabBarHeight();


  // ==========================================================
  // MAP REF
  // ==========================================================

  const mapRef =
    useRef<MapView | null>(null);


  // ==========================================================
  // HORIZONTAL LIST REF
  // ==========================================================

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
  // VALID RESTAURANTS
  // ==========================================================

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


  // ==========================================================
  // MOVE MAP TO RESTAURANT
  // ==========================================================

  const moveToRestaurant =
    useCallback(
      (
        restaurant: MapRestaurant,
      ) => {

        // ------------------------------------------------------
        // VALIDATE COORDINATES
        // ------------------------------------------------------

        if (
          typeof restaurant.latitude !==
            'number' ||
          typeof restaurant.longitude !==
            'number'
        ) {
          return;
        }


        if (
          !Number.isFinite(
            restaurant.latitude,
          ) ||
          !Number.isFinite(
            restaurant.longitude,
          )
        ) {
          return;
        }


        // ------------------------------------------------------
        // SELECT RESTAURANT
        // ------------------------------------------------------

        setSelectedRestaurantId(
          restaurant.restaurantId,
        );


        // ------------------------------------------------------
        // MOVE MAP
        // ------------------------------------------------------

        mapRef.current?.animateToRegion(
          {

            latitude:
              restaurant.latitude,

            longitude:
              restaurant.longitude,

            latitudeDelta:
              0.012,

            longitudeDelta:
              0.012,
          },

          500,
        );


        // ------------------------------------------------------
        // FIND RESTAURANT IN LIST
        // ------------------------------------------------------

        const index =
          restaurants.findIndex(
            item =>
              item.restaurantId ===
              restaurant.restaurantId,
          );


        // ------------------------------------------------------
        // SCROLL LIST
        // ------------------------------------------------------

        if (
          index >= 0
        ) {

          try {

            listRef.current?.scrollToIndex(
              {
                index,

                animated:
                  true,

                viewPosition:
                  0.5,
              },
            );

          } catch {
            // Ignore scroll errors.
          }
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
  // RESTAURANT CARD
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

      <MainLayout>

        <View
          style={
            styles.loaderContainer
          }>

          <ActivityIndicator
            size="large"
            color={
              Colors.orangePrimary
            }
          />

        </View>

      </MainLayout>
    );
  }


  // ==========================================================
  // SCREEN
  // ==========================================================

  return (

    <MainLayout>

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

          {/* ====================================================
              RESTAURANT MARKERS
          ==================================================== */}

          {validRestaurants.map(
            restaurant => (

              <Marker

                key={
                  restaurant.restaurantId
                }

                coordinate={{
                  latitude:
                    restaurant.latitude!,

                  longitude:
                    restaurant.longitude!,
                }}

                anchor={{
                  x: 0.5,

                  y: 1,
                }}

                tracksViewChanges={
                  false
                }

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

            ),
          )}

        </MapView>


        {/* ======================================================
            ERROR
        ====================================================== */}

        {error &&
          restaurants.length === 0 && (

            <View
              pointerEvents="none"
              style={[
                styles.errorContainer,

                {
                  top:
                    20,
                },
              ]}>

              <View
                style={
                  styles.errorCard
                }
              />

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
                tabBarHeight+45,
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

    </MainLayout>
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
//   useBottomTabBarHeight,
// } from '@react-navigation/bottom-tabs';

// import {
//   MapRestaurant,
// } from './MapRestaurant';

// // ============================================================
// // CONSTANTS
// // ============================================================

// const DEFAULT_LATITUDE = 20.5937;

// const DEFAULT_LONGITUDE = 78.9629;

// const DEFAULT_LATITUDE_DELTA = 15;

// const DEFAULT_LONGITUDE_DELTA = 15;

// const CARD_WIDTH = 370;

// const CARD_SPACING = Spacing.md;

// // ============================================================
// // MAP SCREEN
// // ============================================================

// const MapScreen = () => {

//   // ==========================================================
//   // SAFE AREA
//   // ==========================================================

//   const insets =
//     useSafeAreaInsets();

//   // ==========================================================
//   // BOTTOM TAB BAR HEIGHT
//   // ==========================================================

//   const tabBarHeight =
//     useBottomTabBarHeight();

//   // ==========================================================
//   // MAP REF
//   // ==========================================================

//   const mapRef =
//     useRef<MapView | null>(null);

//   // ==========================================================
//   // HORIZONTAL LIST REF
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

//   // ======================================================
//   // MOVE TO RESTAURANT
//   // ======================================================

//   const moveToRestaurant =
//     useCallback(
//       (
//         restaurant: MapRestaurant,
//       ) => {

//         const latitude =
//           Number(
//             restaurant.latitude,
//           );

//         const longitude =
//           Number(
//             restaurant.longitude,
//           );

//         console.log(
//           'MAP RESTAURANT:',
//           restaurant.restaurantId,
//           restaurant.restaurantName,
//         );

//         console.log(
//           'MAP COORDINATES:',
//           latitude,
//           longitude,
//         );

//         if (
//           !Number.isFinite(latitude) ||
//           !Number.isFinite(longitude)
//         ) {

//           console.log(
//             'INVALID RESTAURANT COORDINATES',
//           );

//           return;
//         }

//         // ======================================================
//         // SELECT RESTAURANT
//         // ======================================================

//         setSelectedRestaurantId(
//           restaurant.restaurantId,
//         );

//         // ======================================================
//         // MOVE GOOGLE MAP
//         // ======================================================

//         mapRef.current?.animateToRegion(
//           {
//             latitude,
//             longitude,

//             latitudeDelta:
//               0.012,

//             longitudeDelta:
//               0.012,
//           },

//           500,
//         );

//         // ======================================================
//         // FIND RESTAURANT IN LIST
//         // ======================================================

//         const index =
//           restaurants.findIndex(
//             item =>
//               item.restaurantId ===
//               restaurant.restaurantId,
//           );

//         // ======================================================
//         // SCROLL HORIZONTAL LIST
//         // ======================================================

//         if (
//           index >= 0
//         ) {

//           setTimeout(() => {

//             try {

//               listRef.current?.scrollToIndex({
//                 index,
//                 animated: true,
//                 viewPosition: 0.5,
//               });

//             } catch {

//               // Ignore scroll errors.

//             }

//           }, 100);

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

//   useEffect(() => {

//     if (
//       selectedRestaurantId !==
//       null
//     ) {
//       return;
//     }

//     if (
//       validRestaurants.length ===
//       0
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

//         {/* ======================================================
//             RESTAURANT MARKERS
//         ====================================================== */}

//         {validRestaurants.map(
//           restaurant => {

//             const latitude =
//               Number(
//                 restaurant.latitude,
//               );

//             const longitude =
//               Number(
//                 restaurant.longitude,
//               );

//             if (
//               !Number.isFinite(
//                 latitude,
//               ) ||
//               !Number.isFinite(
//                 longitude,
//               )
//             ) {
//               return null;
//             }

//             return (
//               <Marker
//                 key={
//                   `restaurant-marker-${restaurant.restaurantId}`
//                 }

//                 coordinate={{
//                   latitude,
//                   longitude,
//                 }}

//                 anchor={{
//                   x: 0.5,
//                   y: 1,
//                 }}

//                 tracksViewChanges={
//                   true
//                 }

//                 onPress={() =>
//                   handleMarkerPress(
//                     restaurant,
//                   )
//                 }>

//                 <MapMarker
//                   restaurant={
//                     restaurant
//                   }

//                   selected={
//                     selectedRestaurantId ===
//                     restaurant.restaurantId
//                   }
//                 />

//               </Marker>
//             );
//           },
//         )}

//       </MapView>

//       {/* ======================================================
//           TOP SAFE AREA
//       ====================================================== */}

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
//               } />

//           </View>
//         )}

//       {/* ======================================================
//           RESTAURANT BOTTOM SHEET
//       ====================================================== */}

//       <View
//         pointerEvents="box-none"
//         style={[
//           styles.restaurantSheet,
//           {
//             height:
//               tabBarHeight +
//               190,
//           },
//         ]}>

//         {/* ======================================================
//             RESTAURANT SHEET BACKGROUND
//         ====================================================== */}

//         <View
//           pointerEvents="none"
//           style={
//             styles.restaurantSheetBackground
//           }
//         />

//         {/* ======================================================
//             HORIZONTAL RESTAURANT LIST
//         ====================================================== */}

//         <View
//           style={
//             styles.restaurantListWrapper
//           }>

//           <FlatList
//             ref={
//               listRef
//             }

//             data={
//               restaurants
//             }

//             horizontal

//             showsHorizontalScrollIndicator={
//               false
//             }

//             contentContainerStyle={
//               styles.restaurantListContent
//             }

//             renderItem={
//               renderRestaurantCard
//             }

//             keyExtractor={
//               keyExtractor
//             }

//             onEndReached={
//               handleLoadMore
//             }

//             onEndReachedThreshold={
//               0.7
//             }

//             refreshing={
//               refreshing
//             }

//             onRefresh={
//               refresh
//             }

//             getItemLayout={
//               (
//                 _data,
//                 index,
//               ) => ({

//                 length:
//                   CARD_WIDTH +
//                   CARD_SPACING,

//                 offset:
//                   (
//                     CARD_WIDTH +
//                     CARD_SPACING
//                   ) * index,

//                 index,
//               })
//             }

//             onScrollToIndexFailed={
//               info => {

//                 setTimeout(() => {

//                   listRef.current?.scrollToOffset(
//                     {
//                       offset:
//                         info.index *
//                         (
//                           CARD_WIDTH +
//                           CARD_SPACING
//                         ),

//                       animated:
//                         true,
//                     },
//                   );

//                 }, 100);

//               }
//             }

//             ListFooterComponent={
//               loadingMore ? (

//                 <View
//                   style={
//                     styles.footerLoader
//                   }>

//                   <ActivityIndicator
//                     size="small"
//                     color={
//                       Colors.orangePrimary
//                     }
//                   />

//                 </View>

//               ) : null
//             }

//           />

//         </View>

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

//     // ======================================================
//     // RESTAURANT BOTTOM SHEET
//     // ======================================================

//     restaurantSheet: {
//       position:
//         'absolute',

//       left: 0,

//       right: 0,

//       bottom: 0,

//       zIndex: 20,

//       elevation: 20,
//     },

//     // ======================================================
//     // RESTAURANT SHEET BACKGROUND
//     // ======================================================

//     restaurantSheetBackground: {
//       position:
//         'absolute',

//       top: 0,

//       left: 0,

//       right: 0,

//       bottom: 0,

//       backgroundColor:
//         '#FCFBF8',

//       borderTopLeftRadius:
//         42,

//       borderTopRightRadius:
//         42,

//       shadowColor:
//         '#000000',

//       shadowOffset: {
//         width: 0,
//         height: -3,
//       },

//       shadowOpacity:
//         0.06,

//       shadowRadius:
//         10,

//       elevation:
//         10,
//     },

//     // ======================================================
//     // RESTAURANT LIST WRAPPER
//     // ======================================================

//     restaurantListWrapper: {
//       position:
//         'absolute',

//       top: 24,

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
