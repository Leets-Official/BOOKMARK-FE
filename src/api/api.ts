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
    const response = await api.post('/auth/reissue', { refreshToken });
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
  (response) => {
    return response;
  },
  async (error) => {
    const { request } = error.config;

    // login request error
    if (request.url?.includes('/auth/login')) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !request._retry) {
      request._retry = true;

      try {
        const { accessToken } = await getRefreshToken();
        request.headers.Authorization = `Bearer ${accessToken}`;

        return api(request);
      } catch (refreshError) {
        console.error('refreshToken 갱신 실패', refreshError);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/';
        alert('로그인이 만료되었습니다');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
