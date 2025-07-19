import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className='text-[100px]'>안녕</div>
      <Outlet />
    </>
  );
};

export default Home;
