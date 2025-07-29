import CommonHeader from '@/components/layout/header/CommonHeader';
import CategoryCard from '@/components/ui/card/CategoryCard';
import { useScrollLock } from '@/hooks/ScrollLock';
import { isMobile } from 'react-device-detect';

const categoryColors = [
  '#397FFF',
  '#4828D7',
  '#80CA14',
  '#9747FF',
  '#F835AA',
  '#FF2C3D',
  '#FF5A39',
  '#FFC400',
];

const CategoryManagement = () => {
  // 외부 스크롤 방지
  useScrollLock(true);

  // 10개의 카테고리 카드 더미 데이터
  const categoryCards = Array.from({ length: 10 }, (_, index) => ({
    id: index,
    color: categoryColors[index % categoryColors.length],
    name: `카테고리 ${index + 1}`,
  }));

  return (
    <div>
      {/* 헤더 */}
      {isMobile && (
        <div className='absolute top-0 left-0 right-0 z-10'>
          <CommonHeader title='카테고리 / 태그 관리' />
        </div>
      )}
      <div className='flex flex-col items-center justify-center mt-20 p-3 gap-5 overflow-y-auto hide-scrollbar'>
        {categoryCards.map((card) => (
          <CategoryCard key={card.id} color={card.color} categoryName={card.name} />
        ))}
      </div>
    </div>
  );
};

export default CategoryManagement;
