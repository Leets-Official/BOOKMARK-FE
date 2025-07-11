import Card from '@/components/layout/card/Card';
import HomeSearchBar from '@/components/layout/searchBar/HomeSearchBar';

const Home = () => {
  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='flex items-center justify-center mt-70 mb-30'>
        <HomeSearchBar />
      </div>
      <div className='mb-5'>
        <p>하이</p>
      </div>
      <Card />
    </div>
  );
};

export default Home;
