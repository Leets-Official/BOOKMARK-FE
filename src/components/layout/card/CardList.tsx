import { AnimatePresence, motion } from 'framer-motion';
import FolderCard from '@/components/layout/card/FolderCard';

interface HomeCardListProps {
  cardList: { id: number; title: string }[];
  index: number;
  direction: 'next' | 'prev';
  toggleLeaving: () => void;
  cardsPerSlide: number;
}

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

const CardList = ({
  cardList,
  index,
  direction,
  toggleLeaving,
  cardsPerSlide,
}: HomeCardListProps) => {
  const cardSlice = cardList.slice(index * cardsPerSlide, index * cardsPerSlide + cardsPerSlide);

  return (
    <div className='relative py-3 overflow-hidden mb-10 w-full h-[400px]'>
      <div className='relative w-full'>
        <AnimatePresence custom={direction} initial={false} onExitComplete={toggleLeaving}>
          <motion.div
            key={index}
            variants={rowVariants}
            custom={direction}
            initial='start'
            animate='variant'
            exit='end'
            transition={{ type: 'tween', duration: 1, ease: 'easeInOut' }}
            className='absolute flex justify-start items-center w-full'
            style={{
              willChange: 'transform', // 애니메이션 최적화 -> 브라우저가 렌더링 최적화를 미리 준비할 수 있게 해줌
            }}
          >
            {cardSlice.map((card) => (
              <FolderCard key={card.id} title={card.title} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CardList;
