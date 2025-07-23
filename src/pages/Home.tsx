import ChangeSearchBar from '@/components/layout/searchBar/ChangeSearchBar';
import CardList from '@/components/ui/cardList/CardList';
import MobileCardList from '@/components/ui/cardList/MobileCardList';
import { isMobile } from 'react-device-detect';
import HomeHeader from '@/components/layout/header/HomeHeader';
import { Outlet } from 'react-router-dom';
import HomeFooter from '@/components/layout/footer/HomeFooter';
import SaveCardList from '@/components/ui/cardList/SaveCardList';
import { dummyCardData } from '@/contants/DummyData';
import { getGroupedCardList } from '@/utils/GroupedCardList';
import HomLogo from '@/components/ui/HomLogo';

const Home = () => {
  const cardList = getGroupedCardList(dummyCardData);

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
