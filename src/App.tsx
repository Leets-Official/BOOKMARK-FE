import { Navigate, Outlet } from 'react-router-dom';
import { ToastProvider } from '@/context/ToastContext';
import GlobalToast from '@/components/common/GlobalToast';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const accessToken = localStorage.getItem('accessToken');

  // 로그인이 되어 있지 않으면 로그인 페이지로 이동
  if (!accessToken) {
    return <Navigate to='/login' />;
  }

  return (
    <ToastProvider>
      <Outlet />
      <GlobalToast />
      <Toaster
        position='top-right'
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </ToastProvider>
  );
};

export default App;
