import ChangeSearchBar from '@/components/layout/searchBar/ChangeSearchBar';
import CardList from '@/components/ui/cardlist/CardList';
import MobileCardList from '@/components/ui/cardlist/MobileCardList';
import { isMobile } from 'react-device-detect';
import HomeHeader from '@/components/layout/header/HomeHeader';
import { Outlet } from 'react-router-dom';
import HomeFooter from '@/components/layout/footer/HomeFooter';
import SaveCardList from '@/components/ui/cardlist/SaveCardList';
import { dummyCardData } from '@/contants/DummyData';
import { getGroupedCardList } from '@/utils/GroupedCardList';

const Home = () => {
  const cardList = getGroupedCardList(dummyCardData);

  return (
    <div className='relative min-h-screen'>
      <HomeHeader />
      <ChangeSearchBar barMarginTop={250} />
      {isMobile ? <MobileCardList cardList={cardList} /> : <CardList cardList={cardList} />}
      <SaveCardList />
      <HomeFooter />
      <Outlet />
    </div>
  );
};

export default Home;
