import React from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { tv } from 'tailwind-variants';
import { FilteringIcon, FixedFilteringIcon, SearchIcon } from '@/assets';
import Input from '@/components/common/Input';
import { searchContentsAtom } from '@/atoms';
import { useAtom } from 'jotai';

interface IHomeSearchBarProps {
  className?: string;
  isFixed?: boolean;
  isBlur?: boolean;
  style?: React.CSSProperties;
}

const inputStyle = tv({
  base: `w-full rounded-[100px] text-md px-[3rem] font-medium focus:outline-none placeholder-stone
  border-2 border-[rgba(234,237,245,1)] shadow-[0_2px_7px_rgba(28,37,53,0.1)] transition duration-300`,
  variants: {
    isFixed: {
      true: 'py-[0.5rem] mx-auto rounded-[100px] bg-[#FCFCFCCC]/80',
      false: 'py-[1rem]',
    },
    isBlur: {
      true: 'opacity-20',
      false: 'opacity-100',
    },
  },
  defaultVariants: {
    isFixed: false,
    isBlur: false,
  },
});

const searchIconStyle = tv({
  base: 'transition duration-300',
  variants: {
    isFixed: {
      true: 'stroke-stone',
      false: 'stroke-blue',
    },
    isBlur: {
      true: 'opacity-20',
      false: 'opacity-100',
    },
  },
  defaultVariants: {
    isFixed: false,
    isBlur: false,
  },
});

const filterIconStyle = tv({
  base: 'absolute top-1/2 -translate-y-1/2 cursor-pointer hover:brightness-90 transition duration-300',
  variants: {
    isFixed: {
      true: 'right-3',
      false: 'right-1.5',
    },
    isBlur: {
      true: 'opacity-20',
      false: 'opacity-100',
    },
  },
  defaultVariants: {
    isFixed: false,
    isBlur: false,
  },
});

const HomeSearchBar = ({
  className,
  style,
  isFixed = false,
  isBlur = false,
}: IHomeSearchBarProps) => {
  const [searchContents, setSearchContents] = useAtom(searchContentsAtom);
  const navigate = useNavigate();

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchContents(e.currentTarget.value);
  };

  // 엔터 누르면 발생하는 함수
  const EnterFn = () => {
    console.log(searchContents); // 실제 검색 기능 연결 예정
  };

  return (
    <div className='flex justify-center'>
      <div className={clsx('relative w-4/5 max-w-[50rem] max-sm:w-9/10', className)} style={style}>
        <Input
          value={searchContents}
          onChange={onChange}
          className={inputStyle({ isFixed, isBlur })}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') EnterFn();
          }}
          placeholder='제목, 태그 검색'
        />
        <div className='absolute left-5 top-1/2 -translate-y-1/2'>
          <SearchIcon className={searchIconStyle({ isFixed, isBlur })} />
        </div>
        <div
          className={filterIconStyle({ isFixed, isBlur })}
          onClick={() => navigate('/search')} // 아이콘 누르면 /search로 이동
        >
          {isFixed ? <FixedFilteringIcon /> : <FilteringIcon />}
        </div>
      </div>
    </div>
  );
};

export default HomeSearchBar;
