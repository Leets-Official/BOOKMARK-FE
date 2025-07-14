// import React from 'react';
import FilterSearchBar from '@/components/layout/searchBar/FilterSearchBar';
import { FilterIcon, SearchIcon } from '@/assets';

const Search = () => {
  return (
    <div className='flex flex-col w-full h-[100vh] bg-gray-100'>
      {/* 상단 영역 (검색바 + 최근기록) */}
      <div className='bg-white shadow-sm'>
        {/* 검색바 */}
        <FilterSearchBar />
      </div>

      {/* 하단 영역 (필터 등) */}
      <div className='flex flex-col p-4 flex-1'>
        {/* 필터 */}
        <div className='flex items-center font-semibold text-lg mt-30 mb-4 ml-2'>
          <FilterIcon className='w-5 h-5 mr-2 text-black' />
          필터
        </div>

        {/* 필터 영역 박스 */}
        <div className='bg-white p-4 rounded-lg shadow-sm'>
          {/* 카테고리 제목 */}
          <div className='mb-2 text-sm font-semibold text-gray-800'>카테고리(파일)</div>

          {/* 카테고리 태그들 */}
          <div className='flex flex-wrap gap-2 mb-4'>
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className='px-3 py-1 bg-white border border-gray-300 rounded-full text-sm text-black'
              >
                카테고리
              </div>
            ))}
          </div>

          {/* 태그 인풋 */}
          <div className='w-full bg-gray-100 rounded-lg px-2 py-2 mb-4'>태그</div>
        </div>

        {/* 플랫폼 인풋 */}
        <div className='mt-4 bg-white rounded-lg px-4 py-2'>플랫폼</div>

        {/* 초기화 / 검색 버튼 */}
        <div className='fixed bottom-0 left-0 w-full bg-white px-8 py-4 flex justify-between items-center z-20'>
          <button className='text-black underline font-semibold'>초기화</button>
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
