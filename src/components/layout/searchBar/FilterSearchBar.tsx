import { BackIcon, DeleteIcon, HistoryIcon } from '@/assets';
import Input from '@/components/common/Input';
import React, { useState } from 'react';

const FilterSearchBar = () => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

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
    <div className='w-full bg-white shadow-sm relative'>
      <div className='flex items-center w-full h-12 px-4 shadow-md bg-white z-10'>
        <div className='mr-2 cursor-pointer'>
          <BackIcon />
        </div>

        {/* 검색 인풋 */}
        <Input
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className='flex-1 border-none focus:outline-none text-sm placeholder-gray-400 bg-transparent'
          placeholder='제목, 메모, 태그'
        />
        <div className='ml-2 cursor-pointer' onClick={clearInput}>
          <DeleteIcon />
        </div>
      </div>
      {isFocused && (
        <div className='absolute top-full left-0 w-full bg-white px-4 shadow-md z-0'>
          <div className='flex items-center justify-between gap-2 my-4 text-sm text-black'>
            <div className='flex items-center gap-2'>
              <HistoryIcon />
              최근기록 1
            </div>
            <div className='cursor-pointer'>
              <DeleteIcon />
            </div>
          </div>
          <div className='flex items-center justify-between gap-2 my-4 text-sm text-black'>
            <div className='flex items-center gap-2'>
              <HistoryIcon />
              최근기록 2
            </div>
            <div className='cursor-pointer'>
              <DeleteIcon />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSearchBar;
