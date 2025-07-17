import ChangeSearchBar from '@/components/layout/searchBar/ChangeSearchBar';
import CardList from '@/components/ui/cardlist/CardList';
import MobileCardList from '@/components/ui/cardlist/MobileCardList';
import { isMobile } from 'react-device-detect';
import HomeHeader from '@/components/layout/header/HomeHeader';
import { Outlet } from 'react-router-dom';
import HomeFooter from '@/components/layout/footer/HomeFooter';
import SaveCardList from '@/components/ui/cardlist/SaveCardList';
import { dummyCardData } from '@/contants/DummyData';
import type { SaveCardProps } from '@/contants/DummyData';

interface GroupedByCategoryType {
  [category: string]: SaveCardProps[];
}

const Home = () => {
  // 카테고리 기준으로 그룹화(나중에 API 연동할 때 바뀔 수 있는 부분임)
  const groupedByCategory = dummyCardData.reduce((groupedCards, card) => {
    if (!groupedCards[card.category]) groupedCards[card.category] = []; // 새로운 배열 groupedCards에
    groupedCards[card.category].push(card); // 카테고리가 같은 카드를 하나씩 넣음
    return groupedCards;
  }, {} as GroupedByCategoryType);

  // 각 카테고리마다 최신순 3개 이미지까지 추출
  const cardList = Object.entries(groupedByCategory).map(([category, cards]) => {
    const sorted = cards.sort((a, b) => a.id - b.id); // 최신순
    return {
      id: sorted[0].id, // 하나의 카테고리로 묶인 여러 카드의 id중 하나 선택
      category: category,
      images: sorted.slice(0, 3).map((card) => card.image), // 폴더로 보낼 이미지 최대 3개까지(배열 형태로 최신순 부터 앞에 위치)
    };
  });

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
