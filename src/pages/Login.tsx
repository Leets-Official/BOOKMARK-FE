// login.tsx
import KakaoIcon from '@/assets/kakaologin.svg?react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    console.log('카카오 로그인');
    navigate('/home'); // 필요하면 사용
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-white px-'>
      <div className='max-w-sm w-full space-y-6 text-center'>
        <h1 className='text-2xl font-bold'>Logo</h1>

        <button onClick={handleKakaoLogin} className='w-full'>
          <KakaoIcon className='w-full h-auto' />
        </button>
      </div>
    </div>
  );
};

export default Login;
