import { AnimatePresence, motion } from 'framer-motion';
import FolderCard from '../card/FolderCard';
import CardListHeader from '@/components/layout/header/CardListHeader';
import { useEffect, useState } from 'react';
import { getCardsPerSlide } from '@/utils/CardPerSlide';
import { useQueryClient } from '@tanstack/react-query';
import { getBookmarks } from '@/api/bookmark/bookmark';
import type { CategoryProps } from '@/types/api/category';

// 슬라이드 애니메이션용 variants 정의
const rowVariants = {
  start: (direction: 'next' | 'prev') => ({
    x: direction === 'next' ? '100%' : '-100%',
  }),
  variant: {
    x: 0,
  },
  end: (direction: 'next' | 'prev') => ({
    x: direction === 'next' ? '-100%' : '100%',
  }),
};

const CardList = ({ categories }: { categories: CategoryProps[] }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [leaving, setLeaving] = useState(false);
  const [cardsPerSlide, setCardsPerSlide] = useState(getCardsPerSlide()); // 초기 계산
  const queryClient = useQueryClient();

  // 현재 카드 수에 따라 최대 슬라이드 인덱스 계산
  const maxIndex =
    categories.length === 0 ? 0 : Math.floor((categories.length - 1) / cardsPerSlide);

  // 현재 슬라이드에 보여줄 카드만 추출
  const cardSlice = categories.slice(index * cardsPerSlide, index * cardsPerSlide + cardsPerSlide);

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
      const newMaxIndex = Math.floor((categories.length - 1) / newCardsPerSlide); // 새로운 최대 인덱스 계산

      setCardsPerSlide(newCardsPerSlide); // 카드 개수 업데이트

      // index 조정 로직 수정 -> 브라우저 너비에 따라 바뀜
      setIndex((prevIndex) => (prevIndex > newMaxIndex ? newMaxIndex : prevIndex));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [categories.length]); // 카드 수가 변할 때만 다시 바인딩

  // 다음 슬라이드 미리 로드
  useEffect(() => {
    // 카테고리가 없으면 미리 로드하지 않음
    if (categories.length === 0) return;

    // 현재 페이지의 북마크도 미리 로드 (안전장치)
    const currentCategories = categories.slice(index * cardsPerSlide, (index + 1) * cardsPerSlide);

    currentCategories.forEach((category) => {
      queryClient.prefetchQuery({
        queryKey: ['bookmarks', category.id],
        queryFn: () => getBookmarks(category.id),
      });
    });

    // 이전 페이지가 있다면 이전 페이지도 미리 로드
    if (index > 0) {
      const prevIndex = index - 1;
      const prevCategories = categories.slice(
        prevIndex * cardsPerSlide,
        (prevIndex + 1) * cardsPerSlide,
      );

      prevCategories.forEach((category) => {
        queryClient.prefetchQuery({
          queryKey: ['bookmarks', category.id],
          queryFn: () => getBookmarks(category.id),
        });
      });
    }

    // 다음 페이지가 있다면 다음 페이지도 미리 로드
    if (index < maxIndex) {
      const nextIndex = index + 1;
      const nextCategories = categories.slice(
        nextIndex * cardsPerSlide,
        (nextIndex + 1) * cardsPerSlide,
      );

      nextCategories.forEach((category) => {
        queryClient.prefetchQuery({
          queryKey: ['bookmarks', category.id],
          queryFn: () => getBookmarks(category.id),
        });
      });
    }
  }, [index, categories, cardsPerSlide, maxIndex, queryClient]);

  const toggleLeaving = () => {
    setLeaving(false);
  };

  return (
    <div className='mt-70'>
      <CardListHeader
        onNext={increaseIndex}
        onPrev={decreaseIndex}
        currentNum={`${index + 1} / ${maxIndex + 1}`}
        title='카테고리'
        showPagination={true}
      />
      <div className='relative w-4/5 max-sm:w-9/10 mx-auto overflow-hidden'>
        <AnimatePresence custom={direction} initial={false} onExitComplete={toggleLeaving}>
          <motion.div
            key={index}
            variants={rowVariants}
            custom={direction}
            initial='start'
            animate='variant'
            exit='end'
            transition={{ type: 'tween', duration: 1, ease: 'easeInOut' }}
            className='absolute flex w-full justify-start px-2 py-1 gap-5'
            style={{ willChange: 'transform' }} // 애니메이션 최적화 -> 브라우저가 렌더링 최적화를 미리 준비할 수 있게 해줌
          >
            {cardSlice.map((category) => (
              <FolderCard
                key={category.id}
                category={category}
                pages={[index, categories.length, cardsPerSlide, decreaseIndex]}
              />
            ))}
          </motion.div>
        </AnimatePresence>
        {/** 보이지 않는 카드 리스트를 렌더링 해서 부모 div의 높이가 유지되도록 레이아웃을 보정함 */}
        <div className='invisible flex w-full'>
          {cardSlice.map((categories) => (
            <FolderCard key={`ghost-${categories.id}`} category={categories} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardList;
