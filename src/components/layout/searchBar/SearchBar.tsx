import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { tv } from 'tailwind-variants';
import { FilteringIcon, FixedFilteringIcon, SearchIcon } from '@/assets';
import Input from '@/components/common/Input';
import { searchContentsAtom } from '@/atoms';
import { useAtom } from 'jotai';
import { useMutation } from '@tanstack/react-query';
import { postSearchHistory } from '@/api/searchHistory/searchHistory';

interface IHomeSearchBarProps {
  isFixed?: boolean;
  isBlur?: boolean;
  style?: React.CSSProperties;
  type?: 'isHome' | string;
  isBackButton?: boolean;
}

const inputStyle = tv({
  base: `w-full rounded-[100px] text-md px-[3rem] font-medium focus:outline-none placeholder-stone
  border border-lightGrayBlue shadow-[0_2px_7px_rgba(28,37,53,0.1)] transition duration-300`,
  variants: {
    isFixed: {
      true: 'py-[0.6rem] mx-auto bg-[#FCFCFCCC]/90',
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
      false: 'right-1',
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

const SearchBar = ({
  type,
  isBackButton,
  style,
  isFixed = false,
  isBlur = false,
}: IHomeSearchBarProps) => {
  const [searchContents, setSearchContents] = useAtom(searchContentsAtom);
  const navigate = useNavigate();
  const location = useLocation();

  // 홈으로 돌아갈 땐 무조건 검색어 초기화
  useEffect(() => {
    if (location.pathname === '/') {
      setSearchContents('');
    }
  }, [location.pathname, setSearchContents]);

  const postHistoryMutattion = useMutation({
    mutationFn: postSearchHistory,
    onSuccess: () => {
      navigate(`/search-result?keyword=${encodeURIComponent(searchContents)}`);
      setSearchContents('');
    },
    onError: (error) => {
      console.error('검색 기록 전송 실패', error);
    },
  });

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchContents(e.currentTarget.value);
  };

  // 엔터 누르면 발생하는 함수
  const EnterFn = () => {
    if (!searchContents.trim()) return;
    postHistoryMutattion.mutate(searchContents);
  };

  return (
    <div className='flex justify-center'>
      <div
        className={clsx(
          'relative w-4/5 max-w-[43rem]',
          type === 'isHome' ? '-translate-x-7 sm:-translate-x-2 max-sm:w-[85%]' : 'max-sm:w-9/10',
          isBackButton && 'translate-x-0 sm:-translate-x-6',
        )}
        style={style}
      >
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

export default SearchBar;
