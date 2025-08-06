import { apiRequest } from '@/api/api';
import type { SuggestionTagApiResponse, TagProps } from '@/types/api/category';
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

export const getSuggestionTags = async (
  title: string,
): Promise<ApiResponse<SuggestionTagApiResponse>> => {
  return apiRequest<SuggestionTagApiResponse>({
    method: 'GET',
    url: '/tags/generate',
    params: { title },
  });
};

const updateTag = async (tagId: number, tagName: string): Promise<ApiResponse<string>> => {
  return apiRequest<string>({
    method: 'PATCH',
    url: `/tags/${tagId}`,
    data: { tagName },
  });
};

const deleteTag = async (tagId: number): Promise<ApiResponse<string>> => {
  return apiRequest<string>({
    method: 'DELETE',
    url: `/tags/${tagId}`,
  });
};

export { createTag, getTags, updateTag, deleteTag };
