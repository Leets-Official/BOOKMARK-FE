import { apiRequest } from '@/api/api';
import type { BookmarkProps, BookmarkSaveProps, BookMarkURLProps } from '@/types/api/bookmark';
import type { ApiResponse } from '@/types/common/api-response';

export const getBookmarks = async (): Promise<ApiResponse<BookmarkProps[]>> => {
  return apiRequest<BookmarkProps[]>({
    method: 'GET',
    url: '/bookmarks/all',
  });
};

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
