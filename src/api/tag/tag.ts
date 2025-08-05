import api, { apiRequest } from '@/api/api';
import type { SuggestionTagApiResponse, TagProps } from '@/types/api/category';
import type { ApiResponse } from '@/types/common/api-response';
import type { AxiosResponse } from 'axios';

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
  try {
    const response: AxiosResponse<SuggestionTagApiResponse> = await api.get('/tags/generate', {
      params: { title },
    });

    return { data: response.data, error: false };
  } catch (error: any) {
    if (error.response && error.response.status < 500) {
      return {
        data: null,
        error: true,
        message: error.response.data?.message || '요청에 실패했습니다.',
      };
    }
    throw error;
  }
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
