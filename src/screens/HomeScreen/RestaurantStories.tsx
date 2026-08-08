import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import AppText from '../../component/AppText/AppText';

import {
  Colors,
  Fonts,
  Spacing,
  Typography,
} from '../../theme';

import {Story} from '../../api/services/story/Story';

import PlusIcon from '../../assets/icons/ic_plus.svg';

import StoryViewer from './StoryViewer';

type Props = {
  stories: Story[];
};

const RestaurantStories = ({
  stories,
}: Props) => {

  // =====================================================
  // SELECTED STORY
  // =====================================================

  const [
    selectedStory,
    setSelectedStory,
  ] = useState<Story | null>(null);

  // =====================================================
  // PRELOAD STORY IMAGES
  // =====================================================

  useEffect(() => {
    if (!stories.length) {
      return;
    }

    stories.forEach(story => {
      if (story.mediaUrl) {
        Image.prefetch(
          story.mediaUrl,
        ).catch(() => {
          // Ignore preload failures.
          // The viewer will try loading normally.
        });
      }

      if (story.profileImageUrl) {
        Image.prefetch(
          story.profileImageUrl,
        ).catch(() => {});
      }
    });
  }, [stories]);

  // =====================================================
  // YOUR STORY
  // =====================================================

  const handleYourStoryPress =
    useCallback(() => {
      Alert.alert(
        'Your Story',
        'Story creation coming soon',
      );
    }, []);

  // =====================================================
  // STORY PRESS
  // =====================================================

  const handleStoryPress =
    useCallback(
      (story: Story) => {
        setSelectedStory(story);
      },
      [],
    );

  // =====================================================
  // CLOSE VIEWER
  // =====================================================

  const handleCloseStory =
    useCallback(() => {
      setSelectedStory(null);
    }, []);

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>
      <View
        style={styles.container}>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={
            styles.scrollContent
          }>

          {/* =================================================
              YOUR STORY
          ================================================= */}

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.storyItem}
            onPress={
              handleYourStoryPress
            }>

            <View
              style={
                styles.storyCircle
              }>

              <View
                style={
                  styles.yourStoryBackground
                }>

                <PlusIcon
                  width={26}
                  height={26}
                />

              </View>

            </View>

            <AppText
              numberOfLines={1}
              style={
                styles.storyName
              }>

              Your Story

            </AppText>

          </TouchableOpacity>

          {/* =================================================
              STORIES
          ================================================= */}

          {stories.map(story => (
            <TouchableOpacity
              key={story.storyId}
              activeOpacity={0.85}
              style={
                styles.storyItem
              }
              onPress={() =>
                handleStoryPress(
                  story,
                )
              }>

              <View
                style={
                  styles.storyCircle
                }>

                <View
                  style={
                    styles.storyRing
                  }>

                  <View
                    style={
                      styles.storyImageContainer
                    }>

                    <Image
                      source={{
                        uri:
                          story.mediaUrl,
                      }}
                      resizeMode="cover"
                      style={
                        styles.storyImage
                      }
                    />

                  </View>

                </View>

              </View>

              <AppText
                numberOfLines={1}
                style={
                  styles.storyName
                }>

                {story.fullName}

              </AppText>

            </TouchableOpacity>
          ))}

        </ScrollView>

      </View>

      {/* ===================================================
          STORY VIEWER
      =================================================== */}

      <StoryViewer
        story={selectedStory}
        visible={
          selectedStory !== null
        }
        onClose={
          handleCloseStory
        }
      />
    </>
  );
};

export default React.memo(
  RestaurantStories,
);

const styles = StyleSheet.create({

  container: {
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
  },

  scrollContent: {
    paddingHorizontal:
      Spacing.md,

    paddingRight:
      Spacing.lg,
  },

  storyItem: {
    width: 76,

    alignItems: 'center',

    marginRight:
      Spacing.md,
  },

  storyCircle: {
    width: 68,
    height: 68,

    borderRadius: 34,

    justifyContent: 'center',
    alignItems: 'center',
  },

  storyRing: {
    width: 68,
    height: 68,

    borderRadius: 34,

    borderWidth: 2,

    borderColor:
      Colors.orangePrimary,

    justifyContent: 'center',
    alignItems: 'center',
  },

  storyImageContainer: {
    width: 58,
    height: 58,

    borderRadius: 29,

    overflow: 'hidden',

    backgroundColor:
      Colors.background300,

    justifyContent: 'center',
    alignItems: 'center',
  },

  storyImage: {
    width: '100%',
    height: '100%',
  },

  yourStoryBackground: {
    width: 68,
    height: 68,

    borderRadius: 34,

    backgroundColor:
      Colors.background200,

    borderWidth: 1,

    borderColor:
      Colors.background500,

    justifyContent: 'center',
    alignItems: 'center',
  },

  storyName: {
    marginTop:
      Spacing.xs,

    maxWidth: 72,

    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.extraSmall,

    color:
      Colors.neutral700,

    textAlign: 'center',
  },
});

// import React, {
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
// } from 'react';

// import {
//   Alert,
//   Animated,
//   Dimensions,
//   Image,
//   Modal,
//   PanResponder,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   TouchableOpacity,
//   View,
// } from 'react-native';


// import AppText from '../../component/AppText/AppText';

// import {
//   Colors,
//   Fonts,
//   Spacing,
//   Typography,
// } from '../../theme';

// import {Story} from '../../api/services/story/Story';

// import PlusIcon from '../../assets/icons/ic_plus.svg';

// type Props = {
//   stories: Story[];
// };

// const STORY_DURATION = 15000;

// const {height: SCREEN_HEIGHT} =
//   Dimensions.get('window');

// const RestaurantStories = ({
//   stories,
// }: Props) => {
//   // =====================================================
//   // STORY VIEWER STATE
//   // =====================================================

//   const [
//     selectedStory,
//     setSelectedStory,
//   ] = useState<Story | null>(null);

//   const [
//     storyViewerVisible,
//     setStoryViewerVisible,
//   ] = useState(false);

//   // =====================================================
//   // STORY VIEWER ANIMATIONS
//   // =====================================================

//   const progress = useRef(
//     new Animated.Value(0),
//   ).current;

//   const translateY = useRef(
//     new Animated.Value(0),
//   ).current;

//   // Prevent multiple close calls
//   const isClosingRef = useRef(false);

//   // =====================================================
//   // YOUR STORY
//   // =====================================================

//   const handleYourStoryPress =
//     useCallback(() => {
//       Alert.alert(
//         'Your Story',
//         'Story creation coming soon',
//       );
//     }, []);

//   // =====================================================
//   // OPEN STORY
//   // =====================================================

//   const handleStoryPress =
//     useCallback((story: Story) => {
//       isClosingRef.current = false;

//       setSelectedStory(story);
//       setStoryViewerVisible(true);

//       progress.setValue(0);
//       translateY.setValue(0);
//     }, [progress, translateY]);

//   // =====================================================
//   // CLOSE STORY
//   // =====================================================

//   const closeStoryViewer =
//     useCallback(() => {
//       if (isClosingRef.current) {
//         return;
//       }

//       isClosingRef.current = true;

//       setStoryViewerVisible(false);
//       setSelectedStory(null);

//       progress.stopAnimation();
//       translateY.stopAnimation();

//       progress.setValue(0);
//       translateY.setValue(0);
//     }, [progress, translateY]);

//   // =====================================================
//   // 15 SECOND STORY TIMER
//   // =====================================================

//   useEffect(() => {
//     if (
//       !storyViewerVisible ||
//       !selectedStory
//     ) {
//       return;
//     }

//     isClosingRef.current = false;

//     progress.setValue(0);

//     const animation =
//       Animated.timing(progress, {
//         toValue: 1,
//         duration: STORY_DURATION,
//         useNativeDriver: false,
//       });

//     animation.start(
//       ({finished}) => {
//         if (
//           finished &&
//           !isClosingRef.current
//         ) {
//           closeStoryViewer();
//         }
//       },
//     );

//     return () => {
//       animation.stop();
//     };
//   }, [
//     storyViewerVisible,
//     selectedStory,
//     progress,
//     closeStoryViewer,
//   ]);

//   // =====================================================
//   // SWIPE DOWN HANDLER
//   // =====================================================

//   const panResponder = useRef(
//     PanResponder.create({
//       onMoveShouldSetPanResponder: (
//         _,
//         gestureState,
//       ) => {
//         const isVerticalGesture =
//           Math.abs(
//             gestureState.dy,
//           ) >
//           Math.abs(
//             gestureState.dx,
//           );

//         return (
//           gestureState.dy > 10 &&
//           isVerticalGesture
//         );
//       },

//       onPanResponderMove: (
//         _,
//         gestureState,
//       ) => {
//         if (gestureState.dy > 0) {
//           translateY.setValue(
//             gestureState.dy,
//           );
//         }
//       },

//       onPanResponderRelease: (
//         _,
//         gestureState,
//       ) => {
//         // -----------------------------------------
//         // SWIPE DOWN ENOUGH → CLOSE
//         // -----------------------------------------

//         if (gestureState.dy > 120) {
//           Animated.timing(
//             translateY,
//             {
//               toValue: SCREEN_HEIGHT,
//               duration: 200,
//               useNativeDriver: true,
//             },
//           ).start(() => {
//             closeStoryViewer();
//           });

//           return;
//         }

//         // -----------------------------------------
//         // NOT ENOUGH → RETURN TO POSITION
//         // -----------------------------------------

//         Animated.spring(
//           translateY,
//           {
//             toValue: 0,
//             useNativeDriver: true,
//           },
//         ).start();
//       },

//       onPanResponderTerminate: () => {
//         Animated.spring(
//           translateY,
//           {
//             toValue: 0,
//             useNativeDriver: true,
//           },
//         ).start();
//       },
//     }),
//   ).current;

//   // =====================================================
//   // STORY VIEWER
//   // =====================================================

//   const renderStoryViewer =
//     () => {
//       if (!selectedStory) {
//         return null;
//       }

//       return (
//         <Modal
//           visible={storyViewerVisible}
//           animationType="fade"
//           transparent={false}
//           statusBarTranslucent
//           onRequestClose={
//             closeStoryViewer
//           }>

//           <StatusBar
//             hidden
//             barStyle="light-content"
//           />

//           <View
//             style={
//               styles.viewerContainer
//             }>

//             <Animated.View
//               {...panResponder.panHandlers}
//               style={[
//                 styles.viewerContent,
//                 {
//                   transform: [
//                     {
//                       translateY,
//                     },
//                   ],
//                 },
//               ]}>

//               {/* =====================================
//                   STORY IMAGE
//               ===================================== */}

//               <Image
//                 source={{
//                   uri:
//                     selectedStory.mediaUrl,
//                 }}
//                 resizeMode="contain"
//                 style={
//                   styles.viewerImage
//                 }
//               />

//               {/* =====================================
//                   TOP DARK OVERLAY
//               ===================================== */}

//               <View
//                 pointerEvents="none"
//                 style={
//                   styles.topOverlay
//                 }
//               />

//               {/* =====================================
//                   PROGRESS BAR
//               ===================================== */}

//               <View
//                 pointerEvents="none"
//                 style={
//                   styles.progressBackground
//                 }>

//                 <Animated.View
//                   style={[
//                     styles.progressBar,
//                     {
//                       width:
//                         progress.interpolate(
//                           {
//                             inputRange: [
//                               0,
//                               1,
//                             ],
//                             outputRange: [
//                               '0%',
//                               '100%',
//                             ],
//                           },
//                         ),
//                     },
//                   ]}
//                 />

//               </View>

//               {/* =====================================
//                   STORY USER INFORMATION
//               ===================================== */}

//               <View
//                 pointerEvents="none"
//                 style={
//                   styles.storyHeader
//                 }>

//                 {/* PROFILE IMAGE */}

//                 <View
//                   style={
//                     styles.profileContainer
//                   }>

//                   {selectedStory.profileImageUrl ? (
//                     <Image
//                       source={{
//                         uri:
//                           selectedStory.profileImageUrl,
//                       }}
//                       style={
//                         styles.profileImage
//                       }
//                     />
//                   ) : (
//                     <Image
//                       source={{
//                         uri:
//                           selectedStory.mediaUrl,
//                       }}
//                       style={
//                         styles.profileImage
//                       }
//                     />
//                   )}

//                 </View>

//                 {/* NAME + CAPTION */}

//                 <View
//                   style={
//                     styles.storyHeaderText
//                   }>

//                   <AppText
//                     numberOfLines={1}
//                     style={
//                       styles.storyUserName
//                     }>

//                     {
//                       selectedStory.fullName
//                     }

//                   </AppText>

//                   {selectedStory.caption ? (
//                     <AppText
//                       numberOfLines={1}
//                       style={
//                         styles.storyCaption
//                       }>

//                       {
//                         selectedStory.caption
//                       }

//                     </AppText>
//                   ) : null}

//                 </View>

//               </View>

//             </Animated.View>

//           </View>
//         </Modal>
//       );
//     };

//   // =====================================================
//   // MAIN STORY LIST
//   // =====================================================

//   return (
//     <View style={styles.container}>

//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={
//           false
//         }
//         contentContainerStyle={
//           styles.scrollContent
//         }>

//         {/* =========================================
//             YOUR STORY
//         ========================================= */}

//         <TouchableOpacity
//           activeOpacity={0.8}
//           style={styles.storyItem}
//           onPress={
//             handleYourStoryPress
//           }>

//           <View
//             style={styles.storyCircle}>

//             <View
//               style={
//                 styles.yourStoryBackground
//               }>

//               <PlusIcon
//                 width={26}
//                 height={26}
//               />

//             </View>

//           </View>

//           <AppText
//             numberOfLines={1}
//             style={styles.storyName}>

//             Your Story

//           </AppText>

//         </TouchableOpacity>

//         {/* =========================================
//             API STORIES
//         ========================================= */}

//         {stories.map(story => (
//           <TouchableOpacity
//             key={story.storyId}
//             activeOpacity={0.85}
//             style={styles.storyItem}
//             onPress={() =>
//               handleStoryPress(story)
//             }>

//             <View
//               style={styles.storyCircle}>

//               <View
//                 style={styles.storyRing}>

//                 <View
//                   style={
//                     styles.storyImageContainer
//                   }>

//                   <Image
//                     source={{
//                       uri:
//                         story.mediaUrl,
//                     }}
//                     style={
//                       styles.storyImage
//                     }
//                   />

//                 </View>

//               </View>

//             </View>

//             <AppText
//               numberOfLines={1}
//               style={styles.storyName}>

//               {story.fullName}

//             </AppText>

//           </TouchableOpacity>
//         ))}

//       </ScrollView>

//       {/* =========================================
//           FULL SCREEN STORY VIEWER
//       ========================================= */}

//       {renderStoryViewer()}

//     </View>
//   );
// };

// export default React.memo(
//   RestaurantStories,
// );

// // =====================================================
// // STYLES
// // =====================================================

// const styles = StyleSheet.create({

//   // ===================================================
//   // STORY LIST
//   // ===================================================

//   container: {
//     marginTop: Spacing.md,
//     marginBottom: Spacing.md,
//   },

//   scrollContent: {
//     paddingHorizontal:
//       Spacing.md,

//     paddingRight:
//       Spacing.lg,
//   },

//   storyItem: {
//     width: 76,

//     alignItems: 'center',

//     marginRight:
//       Spacing.md,
//   },

//   storyCircle: {
//     width: 68,
//     height: 68,

//     borderRadius: 34,

//     justifyContent:
//       'center',

//     alignItems:
//       'center',
//   },

//   storyRing: {
//     width: 68,
//     height: 68,

//     borderRadius: 34,

//     borderWidth: 2,

//     borderColor:
//       Colors.orangePrimary,

//     justifyContent:
//       'center',

//     alignItems:
//       'center',
//   },

//   storyImageContainer: {
//     width: 58,
//     height: 58,

//     borderRadius: 29,

//     overflow: 'hidden',

//     backgroundColor:
//       Colors.background300,

//     justifyContent:
//       'center',

//     alignItems:
//       'center',
//   },

//   storyImage: {
//     width: '100%',
//     height: '100%',
//   },

//   yourStoryBackground: {
//     width: 68,
//     height: 68,

//     borderRadius: 34,

//     backgroundColor:
//       Colors.background200,

//     borderWidth: 1,

//     borderColor:
//       Colors.background500,

//     justifyContent:
//       'center',

//     alignItems:
//       'center',
//   },

//   storyName: {
//     marginTop:
//       Spacing.xs,

//     maxWidth: 72,

//     fontFamily:
//       Fonts.interMedium,

//     fontSize:
//       Typography.extraSmall,

//     color:
//       Colors.neutral700,

//     textAlign:
//       'center',
//   },

//   // ===================================================
//   // FULL SCREEN VIEWER
//   // ===================================================

//   viewerContainer: {
//     flex: 1,

//     backgroundColor:
//       '#000000',
//   },

//   viewerContent: {
//     flex: 1,

//     backgroundColor:
//       '#000000',
//   },

//   viewerImage: {
//     width: '100%',
//     height: '100%',
//   },

//   // ===================================================
//   // TOP OVERLAY
//   // ===================================================

//   topOverlay: {
//     position: 'absolute',

//     top: 0,
//     left: 0,
//     right: 0,

//     height: 150,

//     backgroundColor:
//       'rgba(0,0,0,0.30)',
//   },

//   // ===================================================
//   // PROGRESS
//   // ===================================================

//   progressBackground: {
//     position: 'absolute',

//     top: 18,

//     left: 12,
//     right: 12,

//     height: 3,

//     borderRadius: 2,

//     overflow: 'hidden',

//     backgroundColor:
//       'rgba(255,255,255,0.35)',
//   },

//   progressBar: {
//     height: '100%',

//     borderRadius: 2,

//     backgroundColor:
//       '#FFFFFF',
//   },

//   // ===================================================
//   // STORY HEADER
//   // ===================================================

//   storyHeader: {
//     position: 'absolute',

//     top: 34,

//     left: 16,
//     right: 16,

//     flexDirection:
//       'row',

//     alignItems:
//       'center',
//   },

//   profileContainer: {
//     width: 38,
//     height: 38,

//     borderRadius: 19,

//     overflow: 'hidden',

//     backgroundColor:
//       'rgba(255,255,255,0.20)',

//     borderWidth: 1,

//     borderColor:
//       'rgba(255,255,255,0.50)',
//   },

//   profileImage: {
//     width: '100%',
//     height: '100%',
//   },

//   storyHeaderText: {
//     flex: 1,

//     marginLeft: 10,
//   },

//   storyUserName: {
//     color:
//       '#FFFFFF',

//     fontFamily:
//       Fonts.interBold,

//     fontSize: 15,
//   },

//   storyCaption: {
//     marginTop: 2,

//     color:
//       'rgba(255,255,255,0.85)',

//     fontFamily:
//       Fonts.interRegular,

//     fontSize: 12,
//   },

// });
