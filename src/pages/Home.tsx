import ChangeSearchBar from '@/components/layout/searchBar/ChangeSearchBar';
import CardList from '@/components/ui/cardlist/CardList';
import MobileCardList from '@/components/ui/cardlist/MobileCardList';
import { isMobile } from 'react-device-detect';
import HomeHeader from '@/components/layout/header/HomeHeader';
import { Outlet } from 'react-router-dom';
import HomeFooter from '@/components/layout/footer/HomeFooter';
import LatestListHeader from '@/components/layout/header/LatestListHeader';

const Home = () => {
  const cardList = Array.from({ length: 11 }, (_, i) => ({
    id: i + 1,
    title: `제목 ${i + 1}`,
  }));
  return (
    <div className='relative min-h-screen'>
      <HomeHeader />
      <ChangeSearchBar barMarginTop={250} />

      {/* 모바일/데스크탑 구분 */}
      {isMobile ? <MobileCardList cardList={cardList} /> : <CardList cardList={cardList} />}

      <LatestListHeader />
      <HomeFooter />
      <Outlet />
    </div>
  );
};

export default Home;
