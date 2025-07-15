import KakaoIcon from '@/assets/kakaoLogo.svg?react';
import Button from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    console.log('카카오 로그인 클릭');
    navigate('/home');
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-white px-4'>
      <div className='flex flex-col items-center space-y-6 w-full max-w-xs'>
        {/* 로고 텍스트 (나중에 이미지) */}
        <h1 className='text-2xl font-bold'>Logo</h1>

        <Button
          onClick={handleKakaoLogin}
          icon={<KakaoIcon className='mr-2' />}
          className='bg-[#FEE500] text-black hover:brightness-90 disabled:brightness-80 flex items-center justify-center rounded-lg shadow w-full h-[45px]'
        >
          카카오 로그인
        </Button>
      </div>
    </div>
  );
};

export default Login;
