import { getCategoriesWithTag } from '@/api/category/category';
import CommonHeader from '@/components/layout/header/CommonHeader';
import CategoryCard from '@/components/ui/card/CategoryCard';
import Loading from '@/components/ui/loading/Loading';
import { useQuery } from '@tanstack/react-query';
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
  const { data: categoriesWithTag, isPending } = useQuery({
    queryKey: ['categoriesWithTag'],
    queryFn: async () => {
      const res = await getCategoriesWithTag();
      if (res.error) {
        throw new Error(res.message);
      }
      return res.data;
    },
  });

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
        {isPending ? (
          <Loading className='w-[96px] h-[96px] mx-5' />
        ) : (
          categoriesWithTag?.map((card, index) => (
            <CategoryCard
              key={card.categoryId}
              color={categoryColors[index % categoryColors.length]}
              categoryName={card.categoryName}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryManagement;
