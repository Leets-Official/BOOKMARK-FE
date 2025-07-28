import CommonHeader from '@/components/layout/header/CommonHeader';
import CategoryCard from '@/components/ui/card/CategoryCard';
import { useScrollLock } from '@/hooks/ScrollLock';
import { isMobile } from 'react-device-detect';

const CategoryManagement = () => {
  // 외부 스크롤 방지
  useScrollLock(true);

  return (
    <>
      {/* 헤더 */}
      {isMobile && (
        <div className='absolute top-0 left-0 right-0 z-10'>
          <CommonHeader title='카테고리 / 태그 관리' />
        </div>
      )}
      <div className='flex flex-col items-center justify-center mt-20 p-4 gap-15'>
        <CategoryCard />
        <CategoryCard />
      </div>
    </>
  );
};

export default CategoryManagement;
