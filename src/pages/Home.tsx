import { useEffect, useState } from 'react';
import CardListHeader from '@/components/layout/header/CardListHeader';
import HomeSearchBar from '@/components/layout/searchBar/HomeSearchBar';
import MobileCardList from '@/components/layout/card/MobileCardList';
import SideBar from '@/components/layout/sidebar/SideBar';
import { isMobile } from 'react-device-detect';
import CardList from '@/components/layout/card/CardList';
import { getCardsPerSlide } from '@/utils/CardPerSlide';

const Home = () => {
  // 카드 리스트 임의 생성 (11개)
  const cardList = Array.from({ length: 11 }, (_, i) => ({
    id: i + 1,
    title: `제목 ${i + 1}`,
  }));

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [leaving, setLeaving] = useState(false);
  const [cardsPerSlide, setCardsPerSlide] = useState(getCardsPerSlide()); // 초기 계산

  // 현재 카드 수에 따라 최대 슬라이드 인덱스 계산
  const maxIndex = Math.floor((cardList.length - 1) / cardsPerSlide);

  // 슬라이드 다음으로 이동
  const increaseIndex = () => {
    if (leaving) return; // 애니메이션 도중에는 무시
    setDirection('next');
    setLeaving(true); // 슬라이드 애니메이션 시작 시 leaving 상태 true
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  // 슬라이드 이전으로 이동
  const decreaseIndex = () => {
    if (leaving) return;
    setDirection('prev');
    setLeaving(true);
    setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  // 창 크기 변경 시 카드 개수와 인덱스를 재계산
  useEffect(() => {
    const handleResize = () => {
      const newCardsPerSlide = getCardsPerSlide(); // 새 슬라이드당 카드 수
      const newMaxIndex = Math.floor((cardList.length - 1) / newCardsPerSlide); // 새로운 최대 인덱스 계산

      setCardsPerSlide(newCardsPerSlide); // 카드 개수 업데이트

      // index 조정 로직 수정 -> 브라우저 너비에 따라 바뀜
      setIndex((prevIndex) => {
        if (prevIndex > newMaxIndex) {
          return newMaxIndex;
        }
        return prevIndex;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [cardList.length]); // 카드 수가 변할 때만 다시 바인딩

  return (
    <div className='min-h-screen w-full flex relative items-center justify-center flex-col'>
      {/* 데스크탑일 경우 사이드바 나타남 */}
      {!isMobile && (
        <div className='left-0 top-0 fixed'>
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
        {/* 모바일/데스크탑 구분 */}
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
