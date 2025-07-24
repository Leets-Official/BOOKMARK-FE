import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  useEffect(() => {
    // 개발 환경에서만, 토큰이 없을 때만 설정
    if (import.meta.env.DEV) {
      localStorage.setItem('accessToken', 'your-test-token-here');
      localStorage.setItem('refreshToken', 'your-refresh-token-here');
      console.log('🔑 개발용 토큰 설정 완료');
    }
  }, []);
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
