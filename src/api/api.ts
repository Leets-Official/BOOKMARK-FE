import axios from 'axios';

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

  try {
    const response = await api.post('/auth/reissue', {
      refreshToken: refreshToken,
    });
    if (response.data.code === 200) {
      const { accessToken, newRefreshToken } = response.data.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      return { accessToken, refreshToken: newRefreshToken };
    } else {
      throw new Error('refreshToken 갱신 실패');
    }
  } catch (error) {
    console.error('refreshToken 요청 실패', error);
    throw error;
  }
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
        // localStorage.removeItem('accessToken');
        // localStorage.removeItem('refreshToken');
        // window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
