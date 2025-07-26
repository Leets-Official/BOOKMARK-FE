import ChangeSearchBar from '@/components/layout/searchBar/ChangeSearchBar';
import CardList from '@/components/ui/cardList/CardList';
import MobileCardList from '@/components/ui/cardList/MobileCardList';
import { isMobile } from 'react-device-detect';
import HomeHeader from '@/components/layout/header/HomeHeader';
import { Outlet } from 'react-router-dom';
import HomeFooter from '@/components/layout/footer/HomeFooter';
import SaveCardList from '@/components/ui/cardList/SaveCardList';
import { useGetGroupedCardList } from '@/utils/GroupedCardList';
import HomLogo from '@/components/ui/HomLogo';
import { useEffect } from 'react';

const Home = () => {
  const cardList = useGetGroupedCardList();

  useEffect(() => {
    // 저장된 토큰 콘솔에 출력
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    console.log('🔑 Access Token:', accessToken);
    console.log('🔄 Refresh Token:', refreshToken);
  }, []);

  return (
    <div className='relative min-h-screen'>
      <HomeHeader />
      <HomLogo />
      <ChangeSearchBar barMarginTop={260} />
      {isMobile ? <MobileCardList cardList={cardList} /> : <CardList cardList={cardList} />}
      <SaveCardList />
      <HomeFooter />
      <Outlet />
    </div>
  );
};

export default Home;
