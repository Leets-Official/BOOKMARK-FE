import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilterIcon, SearchIcon } from '@/assets';
import Input from '@/components/common/Input';

const HomeSearchBar = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setValue(value);
  };

  // 엔터 누르면 발생하는 함수
  const EnterFn = () => {
    console.log(value);
  };
  return (
    <div className='relative w-full'>
      <Input
        value={value}
        onChange={onChange}
        className='border text-lg color-white rounded-[100px] px-12 py-3 w-full mb-5 focus:outline-none border-none shadow-[0_0_12px_rgba(0,0,0,0.15)]'
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') EnterFn();
        }}
        placeholder='검색'
      />
      <div className='absolute left-4 top-[18px]'>
        <SearchIcon />
      </div>
      <div
        className='absolute right-2 top-[4px] cursor-pointer hover:brightness-90 transition'
        onClick={() => navigate('/search')} // 아이콘 누르면 /search로 이동
      >
        <FilterIcon />
      </div>
    </div>
  );
};

export default HomeSearchBar;
