import SideBar from '@/components/layout/sidebar/SideBar';
import ChangeSearchBar from '@/components/layout/searchBar/ChangeSearchBar';
import CardList from '@/components/ui/cardlist/CardList';
import MobileCardList from '@/components/ui/cardlist/MobileCardList';
import { isMobile } from 'react-device-detect';
import MobileHeader from '@/components/layout/header/MobileHeader';
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
      {/* 데스크탑일 경우 사이드바 나타남 */}
      {!isMobile ? <SideBar /> : <MobileHeader />}

      {/* 검색창 마진값 설정 가능 */}
      <ChangeSearchBar barMarginTop={200} />

      {/* 모바일/데스크탑 구분 */}
      {isMobile ? (
        <>
          <MobileCardList cardList={cardList} />
          <HomeFooter />
        </>
      ) : (
        <CardList cardList={cardList} />
      )}
      <LatestListHeader />
      <Outlet />
    </div>
  );
};

export default Home;
