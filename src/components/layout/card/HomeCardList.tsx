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
        const newLeft = -Math.max(0, maxDrag);

        setConstraints({ left: newLeft, right: 0 });
        const currentX = x.get();
        if (currentX < newLeft) {
          x.set(newLeft); // 왼쪽 끝까지 넘어가 있으면 다시 붙여줌
        } else if (currentX > 0) {
          x.set(0); // 오른쪽으로 넘친 경우
        }
      }
    };
    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, [cardList, x]);

  return (
    <div
      ref={containerRef}
      className={clsx('relative py-3 overflow-hidden', isMobile ? 'mb-10' : 'mb-30')}
    >
      <motion.div
        ref={dragRef}
        style={{
          x,
          willChange: 'transform', // 애니메이션 최적화 -> 브라우저가 렌더링 최적화를 미리 준비할 수 있게 해줌
        }}
        drag='x'
        dragConstraints={constraints}
        dragElastic={0.05}
        dragTransition={{
          power: 0.01,
          timeConstant: 200,
        }}
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
