import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import FolderCard from '../card/FolderCard';
import CardListHeader from '@/components/layout/header/CardListHeader';

interface HomeCardListProps {
  cardList: {
    id: number;
    category: string;
    images: string[];
  }[];
}

// 모바일 용 카드리스트
const MobileCardList = ({ cardList }: HomeCardListProps) => {
  const x = useMotionValue(0); // 드래그 위치 상태
  const dragRef = useRef<HTMLDivElement>(null); // 드래그 가능한 카드 리스트 영역
  const containerRef = useRef<HTMLDivElement>(null); // 외부 컨테이너 영역 (실제 보이는 영역)
  const [constraints, setConstraints] = useState({ left: 0, right: 0 }); // 드래그 제약 범위 상태값

  // 카드 리스트 또는 브라우저 크기 변경 시 드래그 범위 재계산
  useEffect(() => {
    const updateConstraints = () => {
      if (dragRef.current && containerRef.current) {
        const dragWidth = dragRef.current.scrollWidth; // 전체 카드 리스트 너비
        const containerWidth = containerRef.current.offsetWidth; // 외부 컨테이너 너비
        const maxDrag = dragWidth - containerWidth; // 최대로 드래그 했을 때 움직 일 수 있는 거리
        const newLeft = -Math.max(0, maxDrag); // 왼쪽으로 갈 수 있는 최대 거리 계산

        setConstraints({ left: newLeft, right: 0 }); // 오른쪽은 0으로 고정

        // 현재 드래그 위치가 범위를 넘었다면 보정
        const currentX = x.get();
        if (currentX < newLeft) {
          x.set(newLeft); // 왼쪽 끝까지 넘어가 있으면 다시 붙여줌
        } else if (currentX > 0) {
          x.set(0); // 오른쪽으로 넘친 경우
        }
      }
    };
    updateConstraints();
    window.addEventListener('resize', updateConstraints); // 창 크기 변경 시 재계산
    return () => window.removeEventListener('resize', updateConstraints);
  }, [cardList, x]);

  return (
    <div className='mt-90'>
      <CardListHeader currentNum={cardList.length.toString()} title='Folder' showCategory={true} />
      <div ref={containerRef} className='relative overflow-hidden w-4/5 max-sm:w-9/10 mx-auto'>
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
            power: 0.01, // 드래그 이동 거리의 가중치와 속도를 낮춰 너무 빨리 넘어가는 것 방지
            timeConstant: 200,
          }}
          className='flex justify-start items-center gap-3 cursor-grab active:cursor-grabbing'
        >
          {cardList.map((card) => (
            <FolderCard key={card.id} category={card.category} images={card.images} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MobileCardList;
