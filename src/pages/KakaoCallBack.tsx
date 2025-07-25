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
      console.log('kakao login 성공', res);
      localStorage.setItem('accessToken', res.jwtAccessToken);
      localStorage.setItem('refreshToken', res.jwtRefreshToken);
      localStorage.setItem('profileImage', res.profileImage);
      navigate('/', { replace: true });
    },
    onError: () => {
      console.error('kakao login 실패');
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
