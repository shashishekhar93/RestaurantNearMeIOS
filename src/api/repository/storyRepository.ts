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

// import storyService from '../services/story/storyService';


// import {
//   StoryListRequest,
//   StoryListResponse,
// } from '../services/story/Story';

// const StoryRepository = {
//   // =====================================================
//   // STORY
//   // =====================================================
//   listStories: async (
//     page: number = 0,
//     size: number = 10,
//     request: StoryListRequest = {},
//   ): Promise<StoryListResponse> => {
//     const response = await storyService.listStories(
//       page,
//       size,
//       request,
//     );
//     return response.data;
//   },

//   // =====================================================
//   // CREATE STORY
//   // =====================================================
//    createStory: async (
//     userId: number,
//     mediaUrl: string,
//     caption: string,
//   ) => {
//     return storyService.createStory(
//       userId,
//       mediaUrl,
//       caption,
//     );
//   },
// };

// export default StoryRepository;