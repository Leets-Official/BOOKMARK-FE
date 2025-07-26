import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { kakaoLoginApi } from '@/api/auth/auth_api';

function KakaoCallBack() {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      navigate('/', { replace: true }); // 이미 로그인된 경우 홈으로 이동
    }
  }, [navigate]);

  const kakaoLoginMutation = useMutation({
    mutationFn: kakaoLoginApi,
    onSuccess: (res) => {
      if (res.error) {
        console.error('kakao login 실패, error', res.message);
        navigate('/login', { replace: true });
        return;
      }

      const { jwtAccessToken, jwtRefreshToken, profileImage } = res.data;
      localStorage.setItem('accessToken', jwtAccessToken);
      localStorage.setItem('refreshToken', jwtRefreshToken);
      localStorage.setItem('profileImage', profileImage);
      navigate('/', { replace: true });
    },
    onError: (error) => {
      console.error('kakao login 실패, error', error);
      navigate('/login', { replace: true });
    },
  });

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (!code) {
      console.log('Authorization code is not found');
      return;
    }
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);

    kakaoLoginMutation.mutate(code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>카카오 로그인 처리 중...</div>;
}

export default KakaoCallBack;
