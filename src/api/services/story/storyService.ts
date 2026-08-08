import api from '../../client/axios';

import {
  Story,
  StoryListRequest,
  StoryListResponse,
} from './Story';

import {SessionManager} from '../../../utils/SessionManager';

const storyService = {
  // =====================================================
  // LIST STORIES
  // =====================================================

  listStories: (
    page: number = 0,
    size: number = 10,
    request: StoryListRequest = {},
  ) =>
    api.post<StoryListResponse>(
      `/api/story/list?page=${page}&size=${size}`,
      request,
    ),

  // =====================================================
  // CREATE STORY
  // =====================================================

  createStory: async (
    mediaUrl: string,
    caption: string,
  ) => {
    // -----------------------------------------------
    // GET USER ID FROM SESSION
    // -----------------------------------------------

    
    const userId =await SessionManager.getUserId()

    if (!userId) {
      throw new Error(
        'User ID not found in session',
      );
    }

    // -----------------------------------------------
    // CREATE STORY
    // -----------------------------------------------

    const response =
      await api.post<{
        status: number;
        data: Story;
        error: string | null;
      }>(
        `/api/story/create/${userId}`,
        {
          mediaUrl,
          mediaType: 'IMAGE',
          caption,
        },
      );

    return response.data;
  },
};

// =====================================================
// EXPORT
// =====================================================

export default storyService;

// import api from '../../client/axios';
// import {Story} from './Story';
// import {SessionManager} from '../../../utils/SessionManager';

// import {
//   StoryListRequest,
//   StoryListResponse,
// } from './Story';

// const storyService = {

//   // =====================================================
//   // STORY
//   // =====================================================
//   listStories: (
//     page: number = 0,
//     size: number = 10,
//     request: StoryListRequest = {},
//   ) =>
//     api.post<StoryListResponse>(
//       `/api/story/list?page=${page}&size=${size}`,
//       request,
//     ),

//     // =====================================================
//     // CREATE STORY
//     // =====================================================
//     createStory: async (
//       userId: number,
//       mediaUrl: string,
//       caption: string,
//     ) => {
//       const token =
//         await SessionManager.getAccessToken();

//       const response =
//         await api.post<{
//           status: number;
//           data: Story;
//           error: string | null;
//         }>(
//           `/api/story/create/${userId}`,
//           {
//             mediaUrl,
//             mediaType: 'IMAGE',
//             caption,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'Content-Type': 'application/json',
//             },
//           },
//         );

//       return response.data;
//     },
// };

// //=====================================================
// // EXPORTS
// //=====================================================
// export default storyService;