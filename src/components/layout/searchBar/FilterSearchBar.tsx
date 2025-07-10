import { BackIcon, DeleteIcon } from '@/assets';
import Input from '@/components/common/Input';
import React, { useState } from 'react';

const FilterSearchBar = () => {
  const [value, setValue] = useState('');

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setValue(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('검색어:', value);
    }
  };

  const clearInput = () => {
    setValue('');
  };

  return (
    <div className='relative flex items-center w-full h-12 px-4 shadow-md rounded-md bg-white'>
      {/* 왼쪽 뒤로가기 아이콘 */}
      <div className='mr-2 cursor-pointer'>
        <BackIcon />
      </div>

      {/* 검색 인풋 */}
      <Input
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className='flex-1 border-none focus:outline-none text-sm placeholder-gray-400 bg-transparent'
        placeholder='제목, 메모, 태그'
      />

      {/* 오른쪽 삭제 아이콘 */}
      <div className='ml-2 cursor-pointer' onClick={clearInput}>
        <DeleteIcon />
      </div>
    </div>
  );
};

export default FilterSearchBar;
