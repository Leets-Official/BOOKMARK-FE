import { apiRequest } from '@/api/api';
import type { GetSearchHistoryProps } from '@/types/api/searchHistory';
import type { ApiResponse } from '@/types/common/api-response';

const getSearchHistory = async (): Promise<ApiResponse<GetSearchHistoryProps[]>> => {
  return apiRequest<GetSearchHistoryProps[]>({
    method: 'GET',
    url: '/search-histories',
  });
};

const postSearchHistory = async (searchContent: string): Promise<ApiResponse<string>> => {
  return apiRequest<string>({
    method: 'POST',
    url: '/search-histories',
    data: { keyword: searchContent },
  });
};

const deleteSearchHistory = async (searchHistoryId: number): Promise<ApiResponse<string>> => {
  return apiRequest<string>({
    method: 'DELETE',
    url: `/search-histories/${searchHistoryId}`,
  });
};

export { getSearchHistory, postSearchHistory, deleteSearchHistory };
