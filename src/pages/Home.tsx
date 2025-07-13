import { useEffect, useState } from 'react';
import CardListHeader from '@/components/layout/header/CardListHeader';
import HomeSearchBar from '@/components/layout/searchBar/HomeSearchBar';
import MobileCardList from '@/components/layout/card/MobileCardList';
import SideBar from '@/components/layout/sidebar/SideBar';
import { isMobile } from 'react-device-detect';
import CardList from '@/components/layout/card/CardList';
import { getCardsPerSlide } from '@/utils/CardPerSlide';

const Home = () => {
  const cardList = Array.from({ length: 11 }, (_, i) => ({
    id: i + 1,
    title: `제목 ${i + 1}`,
  }));

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [leaving, setLeaving] = useState(false);
  const [cardsPerSlide, setCardsPerSlide] = useState(getCardsPerSlide());

  // maxIndex를 cardsPerSlide가 변경될 때마다 다시 계산
  const maxIndex = Math.floor((cardList.length - 1) / cardsPerSlide);

  const increaseIndex = () => {
    if (leaving) return;
    setDirection('next');
    setLeaving(true);
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const decreaseIndex = () => {
    if (leaving) return;
    setDirection('prev');
    setLeaving(true);
    setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    const handleResize = () => {
      const newCardsPerSlide = getCardsPerSlide();
      const newMaxIndex = Math.floor((cardList.length - 1) / newCardsPerSlide);

      setCardsPerSlide(newCardsPerSlide);

      // index 조정 로직 수정
      setIndex((prevIndex) => {
        if (prevIndex > newMaxIndex) {
          return newMaxIndex;
        }
        return prevIndex;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [cardList.length]); // cardsPerSlide 의존성 제거

  return (
    <div className='min-h-screen w-full flex relative items-center justify-center flex-col'>
      {!isMobile && (
        <div className='left-0 top-0 absolute'>
          <SideBar />
        </div>
      )}
      <div className='flex items-center justify-center my-70 w-[90%] max-w-200'>
        <HomeSearchBar />
      </div>
      <div className='w-[80%]'>
        <CardListHeader
          onNext={increaseIndex}
          onPrev={decreaseIndex}
          currentNum={`${index + 1} / ${maxIndex + 1}`}
        />
        <hr className='border-t border-gray-200 my-3' />
        {isMobile ? (
          <MobileCardList cardList={cardList} />
        ) : (
          <CardList
            cardList={cardList}
            index={index}
            direction={direction}
            toggleLeaving={() => setLeaving(false)}
            cardsPerSlide={cardsPerSlide}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
