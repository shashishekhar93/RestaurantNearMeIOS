import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';

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
import useCreateStory from './useCreateStory';

type Props = {
  stories: Story[];

  /**
   * Called after a story is successfully
   * created on the server.
   *
   * HomeScreen will use this to refresh
   * the story list.
   */
  onStoryCreated?: () => void;
};

const RestaurantStories = ({
  stories,
  onStoryCreated,
}: Props) => {
  // =====================================================
  // SELECTED STORY
  // =====================================================

  const [
    selectedStory,
    setSelectedStory,
  ] = useState<Story | null>(null);

  // =====================================================
  // CREATE STORY
  // =====================================================

  const {
    createStory,
    uploading,
  } = useCreateStory();

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
          // StoryViewer will load normally.
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
  // PROCESS PICKED/CAPTURED IMAGE
  // =====================================================

  const processImage = useCallback(
    async (
      response: ImagePickerResponse,
    ) => {
      // -------------------------------------------------
      // USER CANCELLED
      // -------------------------------------------------

      if (response.didCancel) {
        return;
      }

      // -------------------------------------------------
      // PICKER ERROR
      // -------------------------------------------------

      if (response.errorCode) {
        Alert.alert(
          'Unable to select image',
          response.errorMessage ||
            'Something went wrong.',
        );

        return;
      }

      // -------------------------------------------------
      // GET IMAGE
      // -------------------------------------------------

      const asset =
        response.assets?.[0];

      if (!asset?.uri) {
        Alert.alert(
          'Unable to select image',
          'No image was selected.',
        );

        return;
      }

      const uri = asset.uri;

      const fileName =
        asset.fileName ||
        `story_${Date.now()}.jpg`;

      const mimeType =
        asset.type ||
        'image/jpeg';

      // =================================================
      // UPLOAD + CREATE STORY
      // =================================================

      try {
        await createStory(
          uri,
          fileName,
          mimeType,
        );

        // -----------------------------------------------
        // REFRESH STORIES
        // -----------------------------------------------

        onStoryCreated?.();

        Alert.alert(
          'Success',
          'Your story has been added.',
        );
      } catch (error: any) {
        Alert.alert(
          'Story Upload Failed',
          error?.message ||
            'Unable to create story.',
        );
      }
    },
    [
      createStory,
      onStoryCreated,
    ],
  );

  // =====================================================
  // CAMERA
  // =====================================================

  const openCamera = useCallback(() => {
    const options: CameraOptions = {
      mediaType: 'photo',
      cameraType: 'back',
      quality: 0.9,
      saveToPhotos: false,
    };

    launchCamera(
      options,
      processImage,
    );
  }, [processImage]);

  // =====================================================
  // GALLERY
  // =====================================================

  const openGallery = useCallback(() => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 1,
      quality: 0.9,
    };

    launchImageLibrary(
      options,
      processImage,
    );
  }, [processImage]);

  // =====================================================
  // YOUR STORY
  // =====================================================

  const handleYourStoryPress =
    useCallback(() => {
      if (uploading) {
        return;
      }

      Alert.alert(
        'Create Story',
        'Choose an option',
        [
          {
            text: 'Camera',
            onPress: openCamera,
          },
          {
            text: 'Gallery',
            onPress: openGallery,
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
      );
    }, [
      uploading,
      openCamera,
      openGallery,
    ]);

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
      <View style={styles.container}>
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
            disabled={uploading}
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

                {uploading ? (
                  <ActivityIndicator
                    size="small"
                    color={
                      Colors.orangePrimary
                    }
                  />
                ) : (
                  <PlusIcon
                    width={26}
                    height={26}
                  />
                )}

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
              EXISTING STORIES
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