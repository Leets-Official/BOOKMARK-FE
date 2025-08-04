import { apiRequest } from '@/api/api';
import type {
  BookmarkProps,
  BookmarkSearchResultRequestProps,
  BookmarkSearchResultProps,
} from '@/types/api/bookmark';
import type { ApiResponse } from '@/types/common/api-response';

export const getBookmarks = async (): Promise<ApiResponse<BookmarkProps[]>> => {
  return apiRequest<BookmarkProps[]>({
    method: 'GET',
    url: '/bookmarks/all',
  });
};

export const postBookmarkSearchResult = async (
  requestData: BookmarkSearchResultRequestProps,
): Promise<ApiResponse<BookmarkSearchResultProps>> => {
  return apiRequest<BookmarkSearchResultProps>({
    method: 'POST',
    url: '/bookmarks/search',
    data: requestData,
  });
};
