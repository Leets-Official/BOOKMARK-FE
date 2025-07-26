import type { ReissueRefreshTokenResponse } from '@/types/api/auth';
import type { ApiResponse } from '@/types/common/api-response';
import axios, { type AxiosRequestConfig } from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

// api 기본 설정
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// get refresh token
const getRefreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error('refreshToken not found');

  const response = await apiRequest<ReissueRefreshTokenResponse>({
    method: 'POST',
    url: '/auth/reissue',
    data: {
      refreshToken: refreshToken,
    },
  });

  if (response.error) {
    throw new Error(response.message || 'refreshToken 갱신 실패');
  }

  const { accessToken, refreshToken: newRefreshToken } = response.data;
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', newRefreshToken);

  return { accessToken, refreshToken: newRefreshToken };
};

// request interceptor
api.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error('request 실패', error);
    return Promise.reject(error);
  },
);

// response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('error', error);
    const request = error.config;
    if (!request) return Promise.reject(error);

    // 토큰 갱신 요청은 무한 반복 방지
    if (request.url?.includes('/auth/reissue')) {
      return Promise.reject(error);
    }

    if (error.response && error.response.status === 401 && !request._retry) {
      request._retry = true;
      try {
        console.log('refreshToken 갱신');
        const { accessToken } = await getRefreshToken();
        request.headers.Authorization = `Bearer ${accessToken}`;
        return api(request);
      } catch (refreshError) {
        console.error('refreshToken 갱신 실패', refreshError);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

// api Helper
export async function apiRequest<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
  try {
    const response = await api(config);
    return { data: response.data.data, error: false };
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
}

export default api;
