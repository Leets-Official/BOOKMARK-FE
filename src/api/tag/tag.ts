import { apiRequest } from '@/api/api';
import type { ITag } from '@/types/api/categoryAndTag';
import type { ApiResponse } from '@/types/common/api-response';

const createTag = async (categoryId: number, tagName: string): Promise<ApiResponse<ITag[]>> => {
  return apiRequest<ITag[]>({
    method: 'POST',
    url: '/tags',
    data: { categoryId, tagName },
  });
};

const getTags = async (categoryId: number): Promise<ApiResponse<ITag[]>> => {
  return apiRequest<ITag[]>({
    method: 'GET',
    url: '/tags',
    params: { categoryId },
  });
};

export { createTag, getTags };
