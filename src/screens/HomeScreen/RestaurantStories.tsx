import React, {useCallback} from 'react';
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
  Radius,
  Spacing,
  Typography,
} from '../../theme';

import {Story} from '../../api/services/story/Story';

import PlusIcon from '../../assets/icons/ic_plus.svg';
import RecordLightIcon from '../../assets/icons/ic_record_light.svg';
import RecordDarkIcon from '../../assets/icons/ic_record_dark.svg';

type Props = {
  stories: Story[];
};

const RestaurantStories = ({stories}: Props) => {
  const handleYourStoryPress = useCallback(() => {
    Alert.alert(
      'Your Story',
      'Story creation coming soon',
    );
  }, []);

  const handleStoryPress = useCallback(
    (story: Story) => {
      Alert.alert(
        story.fullName,
        story.caption || 'Story',
      );
    },
    [],
  );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>

        {/* YOUR STORY */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.storyItem}
          onPress={handleYourStoryPress}>

          <View style={styles.storyCircle}>
            <View style={styles.yourStoryBackground}>
              <PlusIcon
                width={26}
                height={26}
              />
            </View>
          </View>

          <AppText
            numberOfLines={1}
            style={styles.storyName}>
            Your Story
          </AppText>
        </TouchableOpacity>

        {/* STORIES */}
        {stories.map(story => (
          <TouchableOpacity
            key={story.storyId}
            activeOpacity={0.85}
            style={styles.storyItem}
            onPress={() =>
              handleStoryPress(story)
            }>

            <View style={styles.storyCircle}>
              <View style={styles.storyRing}>

                <View style={styles.storyImageContainer}>
                  {story.profileImageUrl ? (
                    <Image
                      source={{
                        uri: story.profileImageUrl,
                      }}
                      style={styles.storyImage}
                    />
                  ) : (
                    <Image
                      source={{
                        uri: story.mediaUrl,
                      }}
                      style={styles.storyImage}
                    />
                  )}

                  
                </View>

              </View>
            </View>

            <AppText
              numberOfLines={1}
              style={styles.storyName}>
              {story.fullName}
            </AppText>
          </TouchableOpacity>
        ))}

      </ScrollView>
    </View>
  );
};

export default React.memo(RestaurantStories);

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
  },

  scrollContent: {
    paddingHorizontal: Spacing.md,
    paddingRight: Spacing.lg,
  },

  storyItem: {
    width: 76,
    alignItems: 'center',
    marginRight: Spacing.md,
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
    borderColor: Colors.orangePrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  storyImageContainer: {
    width: 58,
    height: 58,
    borderRadius: 29,
    overflow: 'hidden',
    backgroundColor: Colors.background300,
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
    backgroundColor: Colors.background200,
    borderWidth: 1,
    borderColor: Colors.background500,
    justifyContent: 'center',
    alignItems: 'center',
  },

  recordIndicator: {
    position: 'absolute',
    right: 0,
    bottom: 0,

    width: 18,
    height: 18,
    borderRadius: 9,

    backgroundColor: Colors.white,

    justifyContent: 'center',
    alignItems: 'center',
  },

  storyName: {
    marginTop: Spacing.xs,

    maxWidth: 72,

    fontFamily: Fonts.interMedium,
    fontSize: Typography.extraSmall,
    color: Colors.neutral700,

    textAlign: 'center',
  },
});