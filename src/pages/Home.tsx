import CardListHeader from '@/components/layout/header/CardListHeader';
import HomeSearchBar from '@/components/layout/searchBar/HomeSearchBar';
import HomeCardList from '@/components/layout/card/HomeCardList';
import SideBar from '@/components/layout/sidebar/SideBar';
import { isMobile } from 'react-device-detect';

const Home = () => {
  const cardList = Array.from({ length: 11 }, (_, i) => ({
    id: i + 1,
    title: `제목 ${i + 1}`,
  }));

  return (
    <div className='flex relative items-center justify-center flex-col'>
      {!isMobile && (
        <div className='left-0 top-0 absolute'>
          <SideBar />
        </div>
      )}
      <div className='flex items-center justify-center my-70 w-[90%] max-w-200'>
        <HomeSearchBar />
      </div>
      <div className='w-[80%] max-lg:w-[90%]'>
        <CardListHeader currentNum={`${cardList.length}`} />
        <hr className='border-t border-gray-200 my-3' />
        <HomeCardList cardList={cardList} />
      </div>
    </div>
  );
};

export default Home;
