import {useCallback, useState} from 'react';

import FileUploadRepository from '../../api/repository/fileUploadRepository';
import StoryRepository from '../../api/repository/storyRepository';

const STORY_FOLDER = 'espresso_bar';

const DEFAULT_CAPTION = '';

const useCreateStory = () => {
  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const createStory = useCallback(
    async (
      uri: string,
      fileName: string,
      mimeType: string,
      caption: string = DEFAULT_CAPTION,
    ) => {
      try {
        setUploading(true);
        setError(null);

        // =================================================
        // STEP 1: UPLOAD IMAGE TO EMPEDANCE
        // =================================================

        const uploadResponse =
          await FileUploadRepository.uploadImage(
            uri,
            fileName,
            mimeType,
            STORY_FOLDER,
          );

        if (!uploadResponse.file) {
          throw new Error(
            uploadResponse.message ||
              'Image upload failed',
          );
        }

        // URL returned by Empedance
        const imageUrl =
          uploadResponse.file;

        console.log(
          '[Story] Image uploaded:',
          imageUrl,
        );

        // =================================================
        // STEP 2: CREATE STORY
        // =================================================

        const storyResponse =
          await StoryRepository.createStory(
            imageUrl,
            caption,
          );

        if (
          storyResponse.status !== 1 ||
          !storyResponse.data
        ) {
          throw new Error(
            storyResponse.error ||
              'Unable to create story',
          );
        }

        console.log(
          '[Story] Story created:',
          storyResponse.data,
        );

        return storyResponse.data;
      } catch (e: any) {
        const message =
          e?.response?.data?.error ||
          e?.response?.data?.message ||
          e?.message ||
          'Unable to create story';

        console.error(
          '[Story] Create story failed:',
          e,
        );

        setError(message);

        throw new Error(message);
      } finally {
        setUploading(false);
      }
    },
    [],
  );

  return {
    createStory,
    uploading,
    error,
  };
};

export default useCreateStory;