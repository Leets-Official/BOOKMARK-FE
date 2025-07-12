import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { isMobile } from 'react-device-detect';
import clsx from 'clsx';
import FolderCard from '@/components/layout/card/FolderCard';

interface HomeCardListProps {
  cardList: { id: number; title: string }[];
}

const HomeCardList = ({ cardList }: HomeCardListProps) => {
  const x = useMotionValue(0);
  const dragRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    const updateConstraints = () => {
      if (dragRef.current && containerRef.current) {
        const dragWidth = dragRef.current.scrollWidth;
        const containerWidth = containerRef.current.offsetWidth;
        const maxDrag = dragWidth - containerWidth;
        setConstraints({
          left: -Math.max(0, maxDrag),
          right: 0,
        });
      }
    };

    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, [cardList]);

  return (
    <div ref={containerRef} className='relative py-3 h-[320px] overflow-hidden'>
      <motion.div
        ref={dragRef}
        style={{
          x,
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
        drag='x'
        dragConstraints={constraints}
        className='flex w-full justify-start items-center cursor-grab active:cursor-grabbing'
      >
        {cardList.map((card) => (
          <FolderCard key={card.id} title={card.title} />
        ))}
      </motion.div>
    </div>
  );
};

export default HomeCardList;
