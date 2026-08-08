import React, {
  useCallback,
  useEffect,
  useRef,
} from 'react';

import {
  Animated,
  Dimensions,
  Image,
  Modal,
  PanResponder,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {Story} from '../../api/services/story/Story';
import { Colors, Fonts } from '../../theme';

type Props = {
  story: Story | null;
  visible: boolean;
  onClose: () => void;
};

const {height: SCREEN_HEIGHT} =
  Dimensions.get('window');

const STORY_DURATION = 15000;
const SWIPE_THRESHOLD = 120;

const StoryViewer = ({
  story,
  visible,
  onClose,
}: Props) => {
  const insets = useSafeAreaInsets();

  // =====================================================
  // ANIMATION
  // =====================================================

  const progress = useRef(
    new Animated.Value(0),
  ).current;

  const translateY = useRef(
    new Animated.Value(0),
  ).current;

  // =====================================================
  // CLOSE PROTECTION
  // =====================================================

  const closingRef = useRef(false);

  // =====================================================
  // RESET
  // =====================================================

  useEffect(() => {
    if (!visible || !story) {
      return;
    }

    closingRef.current = false;

    progress.stopAnimation();
    translateY.stopAnimation();

    progress.setValue(0);
    translateY.setValue(0);
  }, [
    visible,
    story,
    progress,
    translateY,
  ]);

  // =====================================================
  // CLOSE
  // =====================================================

  const closeViewer = useCallback(() => {
    if (closingRef.current) {
      return;
    }

    closingRef.current = true;

    progress.stopAnimation();
    translateY.stopAnimation();

    onClose();
  }, [
    onClose,
    progress,
    translateY,
  ]);

  // =====================================================
  // STORY TIMER
  // =====================================================

  useEffect(() => {
    if (!visible || !story) {
      return;
    }

    progress.setValue(0);

    const animation =
      Animated.timing(progress, {
        toValue: 1,
        duration: STORY_DURATION,
        useNativeDriver: false,
      });

    animation.start(({finished}) => {
      if (
        finished &&
        !closingRef.current
      ) {
        closeViewer();
      }
    });

    return () => {
      animation.stop();
    };
  }, [
    visible,
    story,
    progress,
    closeViewer,
  ]);

  // =====================================================
  // SWIPE DOWN
  // =====================================================

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (
        _,
        gestureState,
      ) => {
        const vertical =
          Math.abs(
            gestureState.dy,
          ) >
          Math.abs(
            gestureState.dx,
          );

        return (
          vertical &&
          gestureState.dy > 10
        );
      },

      onPanResponderMove: (
        _,
        gestureState,
      ) => {
        if (
          gestureState.dy > 0
        ) {
          translateY.setValue(
            gestureState.dy,
          );
        }
      },

      onPanResponderRelease: (
        _,
        gestureState,
      ) => {
        if (
          gestureState.dy >
          SWIPE_THRESHOLD
        ) {
          Animated.timing(
            translateY,
            {
              toValue:
                SCREEN_HEIGHT,
              duration: 200,
              useNativeDriver: true,
            },
          ).start(() => {
            translateY.setValue(0);
            closeViewer();
          });

          return;
        }

        Animated.spring(
          translateY,
          {
            toValue: 0,
            tension: 80,
            friction: 10,
            useNativeDriver: true,
          },
        ).start();
      },

      onPanResponderTerminate: () => {
        Animated.spring(
          translateY,
          {
            toValue: 0,
            tension: 80,
            friction: 10,
            useNativeDriver: true,
          },
        ).start();
      },
    }),
  ).current;

  // =====================================================
  // NOTHING TO SHOW
  // =====================================================

  if (!story) {
    return null;
  }

  // =====================================================
  // VIEWER
  // =====================================================

  return (
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle="fullScreen"
      statusBarTranslucent={false}
      onRequestClose={closeViewer}>

      <View
        style={styles.modalBackground}>

        <StatusBar
          hidden={false}
          barStyle="light-content"
          backgroundColor="#000000"
        />

        {/* =================================================
            TOP SAFE AREA

            The black background occupies the Dynamic Island
            area, but story content starts BELOW it.
        ================================================= */}

        <View
          style={[
            styles.topSafeArea,
            {
              height: insets.top,
            },
          ]}
        />

        {/* =================================================
            STORY AREA

            This starts BELOW the Dynamic Island.
        ================================================= */}

        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.storyArea,
            {
              transform: [
                {
                  translateY,
                },
              ],
            },
          ]}>

          {/* =================================================
              STORY IMAGE

              The image fills the available story area.
          ================================================= */}

          <Image
            source={{
              uri: story.mediaUrl,
              cache: 'force-cache',
            }}
            resizeMode="contain"
            style={styles.storyImage}
          />

          {/* =================================================
              TOP GRADIENT-LIKE DARK AREA
          ================================================= */}

          <View
            pointerEvents="none"
            style={styles.topOverlay}
          />

          {/* =================================================
              PROGRESS BAR
          ================================================= */}

          <View
            pointerEvents="none"
            style={styles.progressTrack}>

            <Animated.View
              style={[
                styles.progressFill,
                {
                  width:
                    progress.interpolate({
                      inputRange: [
                        0,
                        1,
                      ],
                      outputRange: [
                        '0%',
                        '100%',
                      ],
                    }),
                },
              ]}
            />

          </View>

          {/* =================================================
              STORY USER INFO
          ================================================= */}

          <View
            pointerEvents="none"
            style={styles.storyHeader}>

            {/* PROFILE IMAGE */}

            <View
              style={
                styles.profileCircle
              }>

              <Image
                source={{
                  uri:
                    story.profileImageUrl ||
                    story.mediaUrl,
                }}
                resizeMode="cover"
                style={
                  styles.profileImage
                }
              />

            </View>

            {/* USER NAME + CAPTION */}

            <View
              style={
                styles.textContainer
              }>

              <Animated.Text
                numberOfLines={1}
                style={styles.name}>

                {story.fullName}

              </Animated.Text>

              {story.caption ? (
                <Animated.Text
                  numberOfLines={1}
                  style={
                    styles.caption
                  }>

                  {story.caption}

                </Animated.Text>
              ) : null}

            </View>

          </View>

        </Animated.View>

        {/* =================================================
            BOTTOM SAFE AREA

            Keeps the viewer away from the home indicator.
        ================================================= */}

        <View
          style={[
            styles.bottomSafeArea,
            {
              height: insets.bottom,
            },
          ]}
        />

      </View>
    </Modal>
  );
};

export default React.memo(
  StoryViewer,
);

const styles = StyleSheet.create({

  // =====================================================
  // ENTIRE MODAL
  // =====================================================

  modalBackground: {
    flex: 1,
    backgroundColor: '#000000',
  },

  // =====================================================
  // DYNAMIC ISLAND AREA
  // =====================================================

  topSafeArea: {
    width: '100%',
    backgroundColor: '#000000',
  },

  // =====================================================
  // STORY AREA
  // =====================================================

  storyArea: {
    flex: 1,
    backgroundColor: '#000000',
    position: 'relative',
    overflow: 'hidden',
  },

  // =====================================================
  // IMAGE
  // =====================================================

  storyImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
  },

  // =====================================================
  // PROGRESS TRACK
  // =====================================================

  progressTrack: {
    position: 'absolute',

    top: 14,
    left: 12,
    right: 12,

    height: 4,

    borderRadius: 2,

    backgroundColor:
      'rgba(255,255,255,0.35)',

    overflow: 'hidden',
  },

  // =====================================================
  // PROGRESS
  // =====================================================

  progressFill: {
    height: '100%',

    borderRadius: 2,

    backgroundColor: '#FFFFFF',
  },

  // =====================================================
  // STORY HEADER
  // =====================================================

  storyHeader: {
    position: 'absolute',

    top: 48,
    left: 12,
    right: 12,

    flexDirection: 'row',

    alignItems: 'center',
  },

  // =====================================================
  // PROFILE
  // =====================================================

  profileCircle: {
    width: 48,
    height: 48,

    borderRadius: 24,

    backgroundColor:
      '#333333',

    borderWidth: 1.5,

    borderColor:
      'rgba(255,255,255,0.55)',

    overflow: 'hidden',

    justifyContent: 'center',
    alignItems: 'center',
  },

  profileImage: {
    width: '100%',
    height: '100%',
  },

  // =====================================================
  // TEXT
  // =====================================================

  textContainer: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    color: Colors.neutral50,
    fontFamily: Fonts.interSemiBold,
    fontSize: 17,
    fontWeight: '600',
  },

  caption: {
    marginTop: 3,

    color:
      'rgba(255,255,255,0.88)',

    fontSize: 14,

    fontWeight: '400',
  },

  // =====================================================
  // BOTTOM SAFE AREA
  // =====================================================

  bottomSafeArea: {
    width: '100%',
    backgroundColor: '#000000',
  },
});
// import React, {
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
// } from 'react';

// import {
//   Animated,
//   Dimensions,
//   Modal,
//   PanResponder,
//   StatusBar,
//   StyleSheet,
//   View,
// } from 'react-native';

// import {Story} from '../../api/services/story/Story';

// type Props = {
//   story: Story | null;
//   visible: boolean;
//   onClose: () => void;
// };

// const {height: SCREEN_HEIGHT} =
//   Dimensions.get('window');

// const STORY_DURATION = 15000;

// const StoryViewer = ({
//   story,
//   visible,
//   onClose,
// }: Props) => {
//   const progress = useRef(
//     new Animated.Value(0),
//   ).current;

//   const translateY = useRef(
//     new Animated.Value(0),
//   ).current;

//   const [isClosing, setIsClosing] =
//     useState(false);

//   // -----------------------------------------
//   // RESET VIEWER
//   // -----------------------------------------

//   useEffect(() => {
//     if (visible && story) {
//       progress.setValue(0);
//       translateY.setValue(0);
//       setIsClosing(false);
//     }
//   }, [
//     visible,
//     story,
//     progress,
//     translateY,
//   ]);

//   // -----------------------------------------
//   // CLOSE
//   // -----------------------------------------

//   const closeViewer = useCallback(() => {
//     if (isClosing) {
//       return;
//     }

//     setIsClosing(true);

//     onClose();
//   }, [isClosing, onClose]);

//   // -----------------------------------------
//   // 15 SECOND TIMER
//   // -----------------------------------------

//   useEffect(() => {
//     if (!visible || !story) {
//       return;
//     }

//     progress.setValue(0);

//     const animation =
//       Animated.timing(progress, {
//         toValue: 1,
//         duration: STORY_DURATION,
//         useNativeDriver: false,
//       });

//     animation.start(({finished}) => {
//       if (finished) {
//         closeViewer();
//       }
//     });

//     return () => {
//       animation.stop();
//     };
//   }, [
//     visible,
//     story,
//     progress,
//     closeViewer,
//   ]);

//   // -----------------------------------------
//   // SWIPE DOWN
//   // -----------------------------------------

//   const panResponder =
//     useRef(
//       PanResponder.create({
//         onMoveShouldSetPanResponder: (
//           _,
//           gestureState,
//         ) => {
//           return (
//             gestureState.dy > 10 &&
//             Math.abs(
//               gestureState.dy,
//             ) >
//               Math.abs(
//                 gestureState.dx,
//               )
//           );
//         },

//         onPanResponderMove: (
//           _,
//           gestureState,
//         ) => {
//           if (gestureState.dy > 0) {
//             translateY.setValue(
//               gestureState.dy,
//             );
//           }
//         },

//         onPanResponderRelease: (
//           _,
//           gestureState,
//         ) => {
//           if (gestureState.dy > 120) {
//             Animated.timing(
//               translateY,
//               {
//                 toValue:
//                   SCREEN_HEIGHT,
//                 duration: 200,
//                 useNativeDriver: true,
//               },
//             ).start(() => {
//               translateY.setValue(0);
//               closeViewer();
//             });
//           } else {
//             Animated.spring(
//               translateY,
//               {
//                 toValue: 0,
//                 useNativeDriver: true,
//               },
//             ).start();
//           }
//         },

//         onPanResponderTerminate: () => {
//           Animated.spring(
//             translateY,
//             {
//               toValue: 0,
//               useNativeDriver: true,
//             },
//           ).start();
//         },
//       }),
//     ).current;

//   // -----------------------------------------
//   // NOTHING TO SHOW
//   // -----------------------------------------

//   if (!story) {
//     return null;
//   }

//   return (
//     <Modal
//       visible={visible}
//       animationType="fade"
//       transparent={false}
//       statusBarTranslucent
//       onRequestClose={closeViewer}>

//       <StatusBar
//         hidden
//         barStyle="light-content"
//       />

//       <View style={styles.container}>
//         <Animated.View
//           {...panResponder.panHandlers}
//           style={[
//             styles.storyContainer,
//             {
//               transform: [
//                 {
//                   translateY,
//                 },
//               ],
//             },
//           ]}>

//           {/* STORY IMAGE */}

//           <Animated.Image
//             source={{
//               uri: story.mediaUrl,
//             }}
//             resizeMode="contain"
//             style={styles.storyImage}
//           />

//           {/* DARK GRADIENT-LIKE OVERLAY */}

//           <View
//             pointerEvents="none"
//             style={styles.topOverlay}
//           />

//           {/* PROGRESS BAR */}

//           <View
//             pointerEvents="none"
//             style={styles.progressBackground}>

//             <Animated.View
//               style={[
//                 styles.progress,
//                 {
//                   width: progress.interpolate(
//                     {
//                       inputRange: [0, 1],
//                       outputRange: [
//                         '0%',
//                         '100%',
//                       ],
//                     },
//                   ),
//                 },
//               ]}
//             />

//           </View>

//           {/* STORY INFORMATION */}

//           <View
//             pointerEvents="none"
//             style={styles.storyInfo}>

//             <View
//               style={styles.profileCircle}>
//               {story.profileImageUrl ? (
//                 <Animated.Image
//                   source={{
//                     uri:
//                       story.profileImageUrl,
//                   }}
//                   style={styles.profileImage}
//                 />
//               ) : null}
//             </View>

//             <View
//               style={styles.nameContainer}>

//               <Animated.Text
//                 numberOfLines={1}
//                 style={styles.name}>
//                 {story.fullName}
//               </Animated.Text>

//               {story.caption ? (
//                 <Animated.Text
//                   numberOfLines={1}
//                   style={styles.caption}>
//                   {story.caption}
//                 </Animated.Text>
//               ) : null}

//             </View>

//           </View>

//         </Animated.View>
//       </View>
//     </Modal>
//   );
// };

// export default React.memo(
//   StoryViewer,
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },

//   storyContainer: {
//     flex: 1,
//     backgroundColor: '#000',
//   },

//   storyImage: {
//     width: '100%',
//     height: '100%',
//   },

//   topOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: 140,

//     backgroundColor:
//       'rgba(0,0,0,0.25)',
//   },

//   progressBackground: {
//     position: 'absolute',

//     top: 18,
//     left: 12,
//     right: 12,

//     height: 3,

//     borderRadius: 2,

//     backgroundColor:
//       'rgba(255,255,255,0.35)',

//     overflow: 'hidden',
//   },

//   progress: {
//     height: '100%',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 2,
//   },

//   storyInfo: {
//     position: 'absolute',

//     top: 34,
//     left: 16,
//     right: 16,

//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   profileCircle: {
//     width: 38,
//     height: 38,

//     borderRadius: 19,

//     backgroundColor:
//       'rgba(255,255,255,0.2)',

//     overflow: 'hidden',
//   },

//   profileImage: {
//     width: '100%',
//     height: '100%',
//   },

//   nameContainer: {
//     marginLeft: 10,
//     flex: 1,
//   },

//   name: {
//     color: '#FFFFFF',
//     fontSize: 15,
//     fontWeight: '700',
//   },

//   caption: {
//     marginTop: 2,
//     color: 'rgba(255,255,255,0.85)',
//     fontSize: 12,
//   },
// });