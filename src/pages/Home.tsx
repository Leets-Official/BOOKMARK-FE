import SideBar from '@/components/layout/sidebar/SideBar';
import HomeSearchBar from '@/components/layout/searchBar/HomeSearchBar';
import CardList from '@/components/ui/CardList';
import MobileCardList from '@/components/ui/MobileCardList';
import { isMobile } from 'react-device-detect';
import MobileHeader from '@/components/layout/header/MobileHeader';
import { Outlet, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const cardList = Array.from({ length: 11 }, (_, i) => ({
    id: i + 1,
    title: `제목 ${i + 1}`,
  }));

  return (
    <div className='relative min-h-screen'>
      {/* 데스크탑일 경우 사이드바 나타남 */}
      {!isMobile ? <SideBar /> : <MobileHeader />}
      <HomeSearchBar />
      {/* 모바일/데스크탑 구분 */}
      {isMobile ? <MobileCardList cardList={cardList} /> : <CardList cardList={cardList} />}
      <Outlet />
    </div>
  );
};

export default Home;
