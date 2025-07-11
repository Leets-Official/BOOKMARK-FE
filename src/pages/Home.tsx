import CardListHeader from '@/components/layout/header/CardListHeader';
import HomeSearchBar from '@/components/layout/searchBar/HomeSearchBar';

const Home = () => {
  const cardList = [
    { id: 1, title: '제목 1' },
    { id: 2, title: '제목 2' },
    { id: 3, title: '제목 3' },
    { id: 4, title: '제목 4' },
    { id: 5, title: '제목 5' },
  ];
  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='flex items-center justify-center mt-70 mb-30 w-200'>
        <HomeSearchBar />
      </div>
      <CardListHeader cardList={cardList} />
    </div>
  );
};

export default Home;
