import CompactCard from '@/components/ui/card/CompactCard';
import ChipDropDown from '@/components/layout/dropDown/ChipDropDown';
import ChangeSearchBar from '@/components/layout/searchBar/ChangeSearchBar';
import {
  dummyCardData,
  dummyCategoryList,
  dummyPlatformList,
  dummyTagList,
} from '@/constants/DummyData';
import { useState, useRef, useEffect } from 'react';
import type { ChipProps } from '@/types/components/components';
import clsx from 'clsx';
import { isMobile } from 'react-device-detect';
import SaveCard from '@/components/ui/card/SaveCard';
import CommonHeader from '@/components/layout/header/CommonHeader';
import ProfileHeader from '@/components/layout/header/ProfileHeader';
import { Outlet } from 'react-router-dom';

const SearchResult = () => {
  // 카테고리, 태그, 플랫폼 칩 드롭다운 상태 관리(더미 데이터)
  const [categoryList, setCategoryList] = useState<ChipProps[]>(dummyCategoryList);
  const [tagList, setTagList] = useState<ChipProps[]>(dummyTagList);
  const [platformList, setPlatformList] = useState<ChipProps[]>(dummyPlatformList);

  // 스크롤 감지를 위한 상태와 ref
  const [hasScroll, setHasScroll] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 마운트될 때 항상 위에서 시작
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

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
    <div className='max-w-[1200px] mx-auto relative min-h-screen flex flex-col gap-4 pb-25 bg-white'>
      {isMobile ? <CommonHeader title='링크 검색' /> : <ProfileHeader />}
      <ChangeSearchBar barMarginTop={isMobile ? 20 : 85} isBackButton={true} />
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
      <div className={clsx('flex flex-col gap-3 mb-10', isMobile ? 'px-4' : '')}>
        {isMobile ? (
          dummyCardData.map((card) => (
            <CompactCard
              key={card.id}
              id={card.id}
              title={card.memo}
              image={card.image}
              memo={card.memo}
              category={card.category}
              tags={card.tags}
            />
          ))
        ) : (
          <div className='w-[95%] max-sm:w-9/10 mx-auto gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
            {dummyCardData.map((card) => (
              <SaveCard key={card.id} data={card} />
            ))}
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default SearchResult;
