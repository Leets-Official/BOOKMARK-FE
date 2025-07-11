import Button from '@/components/common/Button';
import { Outlet, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate('save')}>Home</Button>
      <Outlet />
    </div>
  );
};

export default Home;
