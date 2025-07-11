import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CardListHeader from '@/components/layout/header/CardListHeader';
import HomeSearchBar from '@/components/layout/searchBar/HomeSearchBar';
import Card from '@/components/layout/card/Card';

const rowVariants = {
  start: (direction: 'next' | 'prev') => ({
    x: direction === 'next' ? 'calc(100%)' : 'calc(-100%)',
  }),
  variant: {
    x: 0,
  },
  end: (direction: 'next' | 'prev') => ({
    x: direction === 'next' ? 'calc(-100%)' : 'calc(100%)',
  }),
};

const Home = () => {
  const cardList = Array.from({ length: 18 }, (_, i) => ({
    id: i + 1,
    title: `제목 ${i + 1}`,
  }));

  const [index, setIndex] = useState(0);
  const maxIndex = Math.floor((cardList.length - 1) / 4);
  const cardLists = cardList.slice(index * 4, index * 4 + 4);
  const currentNum = `${index + 1} / ${maxIndex + 1}`;
  const [leaving, setLeaving] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const incraseIndex = () => {
    if (leaving) return;
    setDirection('next');
    toggleLeaving();
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const decraseIndex = () => {
    if (leaving) return;
    setDirection('prev');
    toggleLeaving();
    setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);

  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='flex items-center justify-center mt-70 mb-70 w-200'>
        <HomeSearchBar />
      </div>
      <div className='w-[81%] h-120'>
        <CardListHeader
          onClickLeft={() => decraseIndex()}
          onClickRight={() => incraseIndex()}
          currentNum={currentNum}
        />
        <hr className='border-t border-gray-200 my-3' />
        <div className='relative h-[320px] overflow-hidden' style={{ transform: 'translateZ(0)' }}>
          <AnimatePresence custom={direction} initial={false} onExitComplete={toggleLeaving}>
            <motion.div
              key={index}
              variants={rowVariants}
              custom={direction}
              initial='start'
              animate='variant'
              exit='end'
              transition={{ type: 'tween', duration: 1, ease: 'easeInOut' }}
              className='absolute w-full h-full flex items-center justify-center '
              style={{
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <div className='flex w-full justify-start items-center'>
                {cardLists.map((card) => (
                  <Card key={card.id} title={card.title} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Home;
