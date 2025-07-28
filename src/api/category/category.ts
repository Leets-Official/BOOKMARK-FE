import { apiRequest } from '@/api/api';
import type { CategoryProps, CategoryWithTagProps } from '@/types/api/categoryAndTag';
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

export const getCategoriesWithTag = async (): Promise<ApiResponse<CategoryWithTagProps[]>> => {
  return apiRequest<CategoryWithTagProps[]>({
    method: 'GET',
    url: '/categories/with-tags',
  });
};

export const updateCategory = async (
  categoryId: number,
  categoryName: string,
): Promise<ApiResponse<string>> => {
  return apiRequest<string>({
    method: 'PATCH',
    url: `/categories/${categoryId}`,
    data: { categoryName },
  });
};

export const deleteCategory = async (categoryId: number): Promise<ApiResponse<string>> => {
  return apiRequest<string>({
    method: 'DELETE',
    url: `/categories/${categoryId}`,
  });
};
