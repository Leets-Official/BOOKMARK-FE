// import React from 'react';
import FilterSearchBar from '@/components/layout/searchBar/FilterSearchBar';
import { HistoryIcon, FilterIcon, SearchIcon } from '@/assets';
import Input from '@/components/common/Input';

const Search = () => {
  return (
    <div className='flex flex-col w-full h-full p-4 bg-gray-100'>
      {/* 상단 검색바 */}
      <FilterSearchBar />

      {/* 최근기록 */}
      <div className='mt-4'>
        <div className='flex items-center text-sm text-black'>
          <HistoryIcon className='w-4 h-4 mr-2' />
          최근기록
        </div>
        <div className='flex items-center text-sm text-black mt-2'>
          <HistoryIcon className='w-4 h-4 mr-2' />
          최근기록
        </div>
      </div>

      {/* 필터 */}
      <div className='flex items-center font-semibold text-lg mt-6 mb-4'>
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
            <div key={idx} className='px-3 py-1 bg-white border border-gray-300 rounded-full text-sm text-black'>
              카테고리
            </div>
          ))}
        </div>

        {/* 태그 인풋 */}
        <div className='w-full bg-gray-100 rounded-lg px-2 py-2 mb-4'>
          <Input
            placeholder='태그'
            value=''
            onChange={() => {}}
            className='w-full bg-transparent focus:outline-none text-sm placeholder-black'
          />
        </div>
      </div>

      {/* 플랫폼 인풋 */}
      <div className='mt-4 bg-white rounded-lg px-4 py-2'>
        <Input
          placeholder='플랫폼'
          value=''
          onChange={() => {}}
          className='w-full bg-transparent focus:outline-none text-sm placeholder-black'
        />
      </div>

      {/* 초기화 / 검색 버튼 */}
      <div className='mt-6 flex justify-between items-center'>
        <button className='text-black underline font-semibold'>초기화</button>
        <button className='flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-md text-sm'>
          <SearchIcon className='w-4 h-4' />
          검색
        </button>
      </div>
    </div>
  );
};

export default Search;
