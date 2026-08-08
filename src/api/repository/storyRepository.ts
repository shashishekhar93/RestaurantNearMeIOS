import storyService from '../services/story/storyService';

const StoryRepository = {
  // =====================================================
  // LIST STORIES
  // =====================================================

  listStories: async (
    page: number = 0,
    size: number = 10,
    request = {},
  ) => {
    const response =
      await storyService.listStories(
        page,
        size,
        request,
      );

    return response.data;
  },

  // =====================================================
  // CREATE STORY
  // =====================================================

  createStory: async (
    mediaUrl: string,
    caption: string,
  ) => {
    const response =
      await storyService.createStory(
        mediaUrl,
        caption,
      );

    return response;
  },
};

export default StoryRepository;