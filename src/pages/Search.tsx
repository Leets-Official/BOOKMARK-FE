// import React from 'react';
import FilterSearchBar from '@/components/layout/searchBar/FilterSearchBar';
import { HistoryIcon } from '@/assets';
// import Input from '@/components/common/Input';

const Search = () => {
  return (
    <div className='flex flex-col w-full h-full p-4 bg-gray-50'>
      {/* 검색바 */}
      <FilterSearchBar />
      {/* 최근기록 */}
      <div className='mt-4'>
        <div className='flex items-center text-sm text-gray-600 bg-gray-50'>
          <HistoryIcon className='w-4 h-4 mr-2' />
          최근기록
        </div>
        <div className='flex items-center text-sm text-gray-600 mt-2'>
          <HistoryIcon className='w-4 h-4 mr-2' />
          최근기록
        </div>
      </div>
    </div>
  );
};

export default Search;
