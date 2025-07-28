import { apiRequest } from '@/api/api';
import type { ApiResponse } from '@/types/common/api-response';
import type { CategoryProps, CategoryWithTagProps } from '@/types/api/categoryAndTag';

// 카테고리 생성
const createCategory = async (categoryName: string): Promise<ApiResponse<string>> => {
  return apiRequest<string>({
    method: 'POST',
    url: '/categories',
    data: { categoryName },
  });
};

// 카테고리 목록 조회
const getCategories = async (): Promise<ApiResponse<CategoryProps[]>> => {
  return apiRequest<CategoryProps[]>({
    method: 'GET',
    url: '/categories',
  });
};

// 카테고리 + 태그 목록 조회
const getCategoriesWithTag = async (): Promise<ApiResponse<CategoryWithTagProps[]>> => {
  return apiRequest<CategoryWithTagProps[]>({
    method: 'GET',
    url: '/categories/with-tags',
  });
};

export { createCategory, getCategories, getCategoriesWithTag };
