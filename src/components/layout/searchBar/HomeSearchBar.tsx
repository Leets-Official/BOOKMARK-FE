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
    console.log(value); // 실제 검색 기능 연결 예정
  };

  return (
    <div className='flex justify-center'>
      <div className='relative top-70 w-4/5 max-w-200 max-sm:w-9/10'>
        <Input
          value={value}
          onChange={onChange}
          className='w-full rounded-[100px] text-lg px-12 py-3 focus:outline-none border-none shadow-[0_0_12px_rgba(0,0,0,0.15)]'
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') EnterFn();
          }}
          placeholder='검색'
        />
        <div className='absolute left-4 top-1/2 -translate-y-1/2'>
          <SearchIcon width={24} height={24} />
        </div>
        <div
          className='absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer hover:brightness-90 transition'
          onClick={() => navigate('/search')} // 아이콘 누르면 /search로 이동
        >
          <FilterIcon width={40} height={40} />
        </div>
      </div>
    </div>
  );
};

export default HomeSearchBar;
