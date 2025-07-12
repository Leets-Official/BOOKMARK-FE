import { FilterIcon, SearchIcon } from '@/assets';
import Input from '@/components/common/Input';
import React, { useState } from 'react';

const HomeSearchBar = () => {
  const [value, setValue] = useState('');
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setValue(value);
  };

  const EnterFn = () => {
    console.log(value);
  };
  return (
    <div className='relative w-[100%]'>
      <Input
        value={value}
        onChange={onChange}
        className='border text-lg color-white rounded-[100px] px-12 py-3 w-[100%] mb-5 focus:outline-none border-none shadow-[0_0_12px_rgba(0,0,0,0.15)]'
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') EnterFn();
        }}
        placeholder='검색'
      />
      <div className='absolute left-4 top-[18px]'>
        <SearchIcon />
      </div>
      <div className='absolute right-2 top-[4px] cursor-pointer hover:brightness-90 transition'>
        <FilterIcon />
      </div>
    </div>
  );
};

export default HomeSearchBar;
