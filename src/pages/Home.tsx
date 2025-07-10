import Card from '@/components/layout/card/Card';

import HomeSearchBar from '@/components/layout/searchBar/HomeSearchBar';

const Home = () => {
  return (
    <div className='bg-gray-300 flex items-center justify-center flex-col'>
      <div className='flex items-center justify-center mt-70 mb-30'>
        <HomeSearchBar />
      </div>
      <Card />
    </div>
  );
};

export default Home;
