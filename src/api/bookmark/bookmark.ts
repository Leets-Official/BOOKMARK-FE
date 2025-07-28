import { apiRequest } from '@/api/api';
import type { BookmarkProps } from '@/types/api/bookmark';
import type { ApiResponse } from '@/types/common/api-response';

export const getBookmarks = async (categoryId: number): Promise<ApiResponse<BookmarkProps[]>> => {
  return apiRequest<BookmarkProps[]>({
    method: 'GET',
    url: '/bookmarks',
    params: { categoryId },
  });
};
