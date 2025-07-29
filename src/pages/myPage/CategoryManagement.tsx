import CommonHeader from '@/components/layout/header/CommonHeader';
import CategoryCard from '@/components/ui/card/CategoryCard';
import { useScrollLock } from '@/hooks/ScrollLock';
import clsx from 'clsx';
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
      <div
        className={clsx(
          'flex flex-col itms-center justify-center p-3 gap-5',
          isMobile ? 'mt-20' : 'mt-10',
        )}
      >
        {!isMobile && (
          <p className='text-2xl font-semibold text-stone self-start px-2 mb-5'>
            카테고리 / 태그 관리
          </p>
        )}
        {categoryCards.map((card) => (
          <CategoryCard key={card.id} color={card.color} categoryName={card.name} />
        ))}
      </div>
    </div>
  );
};

export default CategoryManagement;
