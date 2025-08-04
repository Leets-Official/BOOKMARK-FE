import { apiRequest } from '@/api/api';
import type {
  BookmarkSaveProps,
  BookmarkSearchDataProps,
  BookmarkSearchProps,
  BookMarkURLProps,
} from '@/types/api/bookmark';
import type { ApiResponse } from '@/types/common/api-response';

export const getBookmarksURL = async (url: string): Promise<ApiResponse<BookMarkURLProps[]>> => {
  return apiRequest<BookMarkURLProps[]>({
    method: 'GET',
    url: '/preview',
    params: { url },
  });
};

export const saveBookmarks = async (
  bookmarkData: BookmarkSaveProps,
): Promise<ApiResponse<string>> => {
  return apiRequest<string>({
    method: 'POST',
    url: '/bookmarks',
    data: bookmarkData,
  });
};

export const searchBookmarks = async (
  bookmarkData: BookmarkSearchProps,
): Promise<ApiResponse<BookmarkSearchDataProps>> => {
  return apiRequest<BookmarkSearchDataProps>({
    method: 'POST',
    url: '/bookmarks/search',
    data: bookmarkData,
  });
};

export const deleteBookmarks = async (bookmarkId: number): Promise<ApiResponse<string>> => {
  return apiRequest<string>({
    method: 'DELETE',
    url: `/bookmarks/${bookmarkId}`,
  });
};
