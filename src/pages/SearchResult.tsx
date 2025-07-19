import CompactCard from '@/components/ui/card/CompactCard';
import ChipDropDown from '@/components/layout/dropDown/ChipDropDown';
import ChangeSearchBar from '@/components/layout/searchBar/ChangeSearchBar';
import { dummyCategoryList, dummyPlatformList, dummyTagList } from '@/contants/DummyData';
import { useState, useRef, useEffect } from 'react';
import type { ChipProps } from '@/types';
import clsx from 'clsx';
import SaveHeader from '@/components/layout/header/SaveHeader';

const SearchResult = () => {
  // 카테고리, 태그, 플랫폼 칩 드롭다운 상태 관리(더미 데이터)
  const [categoryList, setCategoryList] = useState<ChipProps[]>(dummyCategoryList);
  const [tagList, setTagList] = useState<ChipProps[]>(dummyTagList);
  const [platformList, setPlatformList] = useState<ChipProps[]>(dummyPlatformList);

  // 스크롤 감지를 위한 상태와 ref
  const [hasScroll, setHasScroll] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 스크롤 감지 useEffect
  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        setHasScroll(scrollWidth > clientWidth);
      }
    };

    // DOM이 완전히 렌더링된 후 체크
    const timer = setTimeout(checkScroll, 100);
    window.addEventListener('resize', checkScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkScroll);
    };
  }, [categoryList, tagList, platformList]);

  return (
    <div className='relative min-h-screen flex flex-col gap-4'>
      <SaveHeader />
      <ChangeSearchBar barMarginTop={100} isBackButton={true} />
      <div
        ref={scrollContainerRef}
        className={clsx(
          'flex flex-row gap-3 items-center overflow-x-auto px-4',
          hasScroll ? 'justify-start' : 'justify-center',
        )}
      >
        {/* 카테고리, 태그, 플랫폼 칩 드롭다운 */}
        <ChipDropDown title='카테고리' options={categoryList} onChange={setCategoryList} />
        <ChipDropDown title='태그' options={tagList} onChange={setTagList} />
        <ChipDropDown title='플랫폼' options={platformList} onChange={setPlatformList} />
      </div>
      {/* 카드 더미 리스트 */}
      <div className='flex flex-col gap-5 px-4 mb-10'>
        <CompactCard
          title='제목'
          src='https://picsum.photos/200/300'
          memo='메모'
          category='카테고리'
          tags={['태그1', '태그2']}
        />
        <CompactCard
          title='제목'
          src='https://picsum.photos/200/300'
          memo='메모'
          category='카테고리'
          tags={['태그1', '태그2']}
        />
        <CompactCard
          title='제목'
          src='https://picsum.photos/200/300'
          memo='메모'
          category='카테고리'
          tags={['태그1', '태그2']}
        />
        <CompactCard
          title='제목'
          src='https://picsum.photos/200/300'
          memo='메모'
          category='카테고리'
          tags={['태그1', '태그2']}
        />
        <CompactCard
          title='제목'
          src='https://picsum.photos/200/300'
          memo='메모'
          category='카테고리'
          tags={['태그1', '태그2']}
        />
        <CompactCard
          title='제목'
          src='https://picsum.photos/200/300'
          memo='메모'
          category='카테고리'
          tags={['태그1', '태그2']}
        />
        <CompactCard
          title='제목'
          src='https://picsum.photos/200/300'
          memo='메모'
          category='카테고리'
          tags={['태그1', '태그2']}
        />
        <CompactCard
          title='제목'
          src='https://picsum.photos/200/300'
          memo='메모'
          category='카테고리'
          tags={['태그1', '태그2']}
        />
        <CompactCard
          title='제목'
          src='https://picsum.photos/200/300'
          memo='메모'
          category='카테고리'
          tags={['태그1', '태그2']}
        />
      </div>
    </div>
  );
};

export default SearchResult;
