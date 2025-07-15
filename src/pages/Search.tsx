import { useState } from 'react';
import FilterSearchBar from '@/components/layout/searchBar/FilterSearchBar';
import { FilterIcon, SearchIcon } from '@/assets';
import Chip from '@/components/common/Chip';

const categories = [
  '개발',
  '공모전',
  '아티클',
  '카테고리',
  '블로그',
  '카테고리',
  '카테고리',
  '카테고리',
];

const Search = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const onCategoryClick = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
  };

  // 개별 카테고리 삭제 핸들러
  const onDeleteCategory = (category: string) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== category));
  };

  return (
    <div className='flex flex-col w-full h-[100vh] bg-gray-100'>
      <div className='bg-white shadow-sm'>
        {/* 삭제 핸들러도 전달 */}
        <FilterSearchBar
          selectedCategories={selectedCategories}
          onDeleteCategory={onDeleteCategory}
        />
      </div>

      <div className='flex flex-col p-4 flex-1'>
        <div className='flex items-center font-semibold text-lg mt-30 mb-4 ml-2'>
          <FilterIcon className='w-5 h-5 mr-2 text-black' />
          필터
        </div>

        <div className='bg-white p-4 rounded-lg shadow-sm'>
          <div className='mb-2 text-sm font-semibold text-gray-800'>카테고리(파일)</div>

          <div className='flex flex-wrap gap-2 mb-6'>
            {categories.map((category, idx) => (
              <Chip
                key={idx}
                id={`category-${idx}`}
                content={category}
                type='category'
                isSelected={selectedCategories.includes(category)}
                onClick={() => onCategoryClick(category)}
                className='h-7 px-2 py-0.5 text-sm max-w-[80px] truncate w-1/4'
              />
            ))}
          </div>

          <div className='w-full bg-gray-100 rounded-lg px-2 py-2 mb-4'>태그</div>
        </div>

        <div className='mt-4 bg-white rounded-lg px-4 py-2'>플랫폼</div>

        <div className='fixed bottom-0 left-0 w-full bg-white px-8 py-4 flex justify-between items-center z-20'>
          <button
            className='text-black underline font-semibold'
            onClick={() => setSelectedCategories([])}
          >
            초기화
          </button>
          <button className='flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-md text-sm'>
            <SearchIcon className='w-4 h-4' />
            검색
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
