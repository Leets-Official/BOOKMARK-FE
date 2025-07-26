import api, { apiRequest } from '@/api/api';
import type { CategoryProps } from '@/types/api/category';
import type { ApiResponse } from '@/types/common/api-response';

export const createCategory = async (categoryName: string): Promise<ApiResponse<string>> => {
  return apiRequest<string>({
    method: 'POST',
    url: '/categories',
    data: { categoryName },
  });
};

export const getCategories = async (): Promise<ApiResponse<CategoryProps[]>> => {
  return apiRequest<CategoryProps[]>({
    method: 'GET',
    url: '/categories',
  });
};

export const getCategoriesWithTag = async () => {
  try {
    const response = await api.get('/categories/with-tags');
    return response.data.data;
  } catch (error: any) {
    return {
      error: true,
      message: error.response?.data?.message || '카테고리 및 태그 조회에 실패했습니다.',
    };
  }
};

export const patchCategory = async (
  categoryId: number,
  categoryName: string,
): Promise<ApiResponse<string>> => {
  return apiRequest<string>({
    method: 'PATCH',
    url: `/categories/${categoryId}`,
    data: { categoryName },
  });
};
