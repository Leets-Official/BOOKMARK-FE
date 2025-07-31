import { Navigate, Outlet } from 'react-router-dom';
import Toast from '@/components/common/Toast';

const App = () => {
  const accessToken = localStorage.getItem('accessToken');

  // 로그인이 되어 있지 않으면 로그인 페이지로 이동
  if (!accessToken) {
    return <Navigate to='/login' />;
  }

  return (
    <div className='bg-[#535151]'>
      <Outlet />
      <Toast />
    </div>
  );
};

export default App;
