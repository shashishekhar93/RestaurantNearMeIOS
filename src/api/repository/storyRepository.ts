import storyService from '../services/story/storyService';

import {
  StoryListRequest,
  StoryListResponse,
} from '../services/story/Story';

const StoryRepository = {
  listStories: async (
    page: number = 0,
    size: number = 10,
    request: StoryListRequest = {},
  ): Promise<StoryListResponse> => {
    const response = await storyService.listStories(
      page,
      size,
      request,
    );

    return response.data;
  },
};

export default StoryRepository;