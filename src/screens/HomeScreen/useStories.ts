import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import StoryRepository from '../../api/repository/storyRepository';

import {
  Story,
  StoryListRequest,
} from '../../api/services/story/Story';

const PAGE_SIZE = 10;

const useStories = (
  filters?: StoryListRequest,
) => {
  const [stories, setStories] = useState<Story[]>([]);

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [error, setError] = useState<string | null>(
    null,
  );

  /**
   * Prevents multiple simultaneous API calls.
   *
   * This is especially important because FlatList's
   * onEndReached can fire more than once.
   */
  const requestInProgress = useRef(false);

  /**
   * Keeps the latest filters without making the
   * load function depend on the object reference.
   */
  const filtersRef = useRef<StoryListRequest>(
    filters ?? {},
  );

  useEffect(() => {
    filtersRef.current = filters ?? {};
  }, [filters]);

  const loadStories = useCallback(
    async (
      pageNumber: number,
      isRefresh: boolean = false,
    ) => {
      if (requestInProgress.current) {
        return;
      }

      requestInProgress.current = true;

      try {
        if (isRefresh) {
          setRefreshing(true);
        } else if (pageNumber === 0) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }

        const response =
          await StoryRepository.listStories(
            pageNumber,
            PAGE_SIZE,
            filtersRef.current,
          );

        if (response.status !== 1) {
          throw new Error(
            response.error ??
              'Unable to load stories',
          );
        }

        const newStories =
          response.data.results ?? [];

        if (
          isRefresh ||
          pageNumber === 0
        ) {
          setStories(newStories);
        } else {
          setStories(previousStories => [
            ...previousStories,
            ...newStories,
          ]);
        }

        setPage(pageNumber);

        /**
         * API page.total represents the total number
         * of pages, matching the restaurant API.
         */
        setHasMore(
          pageNumber + 1 <
            response.data.page.total,
        );

        setError(null);
      } catch (e: any) {
        setError(
          e?.message ??
            'Unable to load stories',
        );
      } finally {
        setLoading(false);
        setLoadingMore(false);
        setRefreshing(false);

        requestInProgress.current = false;
      }
    },
    [],
  );

  /**
   * Initial API call.
   *
   * IMPORTANT:
   * loadStories has an empty dependency array,
   * therefore this effect runs only once when
   * the hook is mounted.
   */
  useEffect(() => {
    loadStories(0);
  }, [loadStories]);

  const refresh = useCallback(() => {
    if (requestInProgress.current) {
      return;
    }

    setHasMore(true);
    loadStories(0, true);
  }, [loadStories]);

  const loadMore = useCallback(() => {
    if (
      requestInProgress.current ||
      loading ||
      loadingMore ||
      refreshing ||
      !hasMore
    ) {
      return;
    }

    loadStories(page + 1);
  }, [
    loadStories,
    page,
    loading,
    loadingMore,
    refreshing,
    hasMore,
  ]);

  return {
    stories,
    loading,
    loadingMore,
    refreshing,
    error,
    refresh,
    loadMore,
    hasMore,
  };
};

export default useStories;