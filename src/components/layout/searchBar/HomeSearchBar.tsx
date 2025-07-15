import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilteringIcon, FixedFilteringIcon, SearchIcon } from '@/assets';
import Input from '@/components/common/Input';
import clsx from 'clsx';

interface IHomeSearchBarProps {
  className?: string;
  isFixed?: boolean;
}

const HomeSearchBar = ({ className, isFixed = false }: IHomeSearchBarProps) => {
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
      <div className={clsx('relative w-4/5 max-w-[50rem] max-sm:w-9/10', className)}>
        <Input
          value={value}
          onChange={onChange}
          className={clsx(
            'w-full rounded-[100px] text-md px-[3rem] font-medium focus:outline-none placeholder-stone',
            'border-2 border-[rgba(234,237,245,1)] shadow-[0_2px_7px_rgba(28,37,53,0.1)]',
            isFixed ? 'py-[0.5rem]' : 'py-[1rem]',
          )}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') EnterFn();
          }}
          placeholder='제목, 태그 검색'
        />
        <div className='absolute left-5 top-1/2 -translate-y-1/2'>
          <SearchIcon className={clsx(isFixed ? 'stroke-stone' : 'stroke-blue')} />
        </div>
        <div
          className={clsx(
            'absolute top-1/2 -translate-y-1/2 cursor-pointer hover:brightness-90 transition',
            isFixed ? 'right-3' : 'right-1.5',
          )}
          onClick={() => navigate('/search')} // 아이콘 누르면 /search로 이동
        >
          {isFixed ? <FixedFilteringIcon /> : <FilteringIcon />}
        </div>
      </div>
    </div>
  );
};

export default HomeSearchBar;
