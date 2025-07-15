import { BackIcon, DeleteIcon, HistoryIcon } from '@/assets';
import Input from '@/components/common/Input';
import React, { useState } from 'react';

interface FilterSearchBarProps {
  selectedCategories: string[];
  // eslint-disable-next-line no-unused-vars
  onDeleteCategory: (category: string) => void;
}

const FilterSearchBar: React.FC<FilterSearchBarProps> = ({
  selectedCategories,
  onDeleteCategory,
}) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
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
      {selectedCategories.length > 0 && (
        <div className='px-4 py-2 border-t border-gray-200 bg-white flex flex-wrap gap-2'>
          {selectedCategories.map((category, idx) => (
            <span
              key={idx}
              className='flex items-center bg-gray-100 text-black px-3 py-1 rounded-full text-sm max-w-[140px] border border-black'
              title={category}
            >
              <span className='truncate mr-2'>{category}</span>
              <button
                onClick={() => onDeleteCategory(category)}
                className='flex items-center justify-center'
              >
                <DeleteIcon width={14} height={14} fill='#000' />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className='flex items-center w-full h-12 px-4 shadow-md bg-white z-10'>
        <div className='mr-2 cursor-pointer'>
          <BackIcon />
        </div>

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
          <DeleteIcon width={30} height={30} fill='#000000' />
        </div>
      </div>

      {isFocused && (
        <div className='absolute top-full left-0 w-full bg-white px-4 shadow-md z-0'>
          {['최근기록 1', '최근기록 2'].map((record, idx) => (
            <div
              key={idx}
              className='flex items-center justify-between gap-2 my-4 text-sm text-black'
            >
              <div className='flex items-center gap-2'>
                <HistoryIcon />
                {record}
              </div>
              <div className='cursor-pointer'>
                <DeleteIcon width={20} height={20} fill='#000000' />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSearchBar;
