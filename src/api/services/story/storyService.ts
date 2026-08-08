import api from '../../client/axios';

import {
  StoryListRequest,
  StoryListResponse,
} from './Story';

const storyService = {
  listStories: (
    page: number = 0,
    size: number = 10,
    request: StoryListRequest = {},
  ) =>
    api.post<StoryListResponse>(
      `/api/story/list?page=${page}&size=${size}`,
      request,
    ),
};

export default storyService;