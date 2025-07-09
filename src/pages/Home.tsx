import React from 'react';
import Chip from '@/components/common/Chip';
import Input from '@/components/common/Input';
import Card from '@/components/layout/card/Card';
import { useState } from 'react';
import { FilterIcon } from '@/assets';

const Home = () => {
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
    <div className='m-10 flex items-center justify-center flex-col'>
      <div className=' flex items-center justify-center w-300 h-130 flex-col'>
        <div className='relative'>
          <Input
            value={value}
            onChange={onChange}
            className='border color-white rounded-[100px] px-4 py-3 w-200 mb-5 focus:outline-none border-gray-200 shadow-md'
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') EnterFn();
            }}
            placeholder='검색'
          />
          <div className='absolute right-2 top-[0px] cursor-pointer hover:brightness-90 transition'>
            <FilterIcon />
          </div>
        </div>
        <Chip />
      </div>
      <Card />
    </div>
  );
};

export default Home;
