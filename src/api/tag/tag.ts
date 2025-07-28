import { apiRequest } from '@/api/api';
import type { TagProps } from '@/types/api/categoryAndTag';
import type { ApiResponse } from '@/types/common/api-response';

const createTag = async (categoryId: number, tagName: string): Promise<ApiResponse<TagProps[]>> => {
  return apiRequest<TagProps[]>({
    method: 'POST',
    url: '/tags',
    data: { categoryId, tagName },
  });
};

const getTags = async (categoryId: number): Promise<ApiResponse<TagProps[]>> => {
  return apiRequest<TagProps[]>({
    method: 'GET',
    url: '/tags',
    params: { categoryId },
  });
};

export { createTag, getTags };
