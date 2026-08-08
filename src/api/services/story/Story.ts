export interface StoryListRequest {
  userId?: number;
  active?: boolean;
  keyword?: string;
}

export interface Story {
  storyId: number;
  userId: number;
  fullName: string;
  profileImageUrl: string | null;

  mediaUrl: string;
  mediaType: string;

  caption: string;

  active: boolean;

  viewsCount: number;

  expiresAt: number;
  createdAt: number;
  updatedAt: number;
}

export interface StoryPage {
  index: number;
  size: number;
  total: number;
  count: number;
}

export interface StoryListResponse {
  status: number;

  data: {
    results: Story[];
    page: StoryPage;
  };

  error: string | null;
}