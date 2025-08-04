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
import { useAtom } from 'jotai';
import {
  searchContentsAtom,
  selectedCategoriesAtom,
  selectedPlatformsAtom,
  selectedTagsAtom,
} from '@/atoms';
import { useMutation } from '@tanstack/react-query';
import { postBookmarkSearchResult } from '@/api/bookmark/bookmark';
import Loading from '@/components/ui/loading/Loading';

const SearchResult = () => {
  // 카테고리, 태그, 플랫폼 칩 드롭다운 상태 관리(더미 데이터)
  const [categoryList, setCategoryList] = useState<ChipProps[]>(dummyCategoryList);
  const [tagList, setTagList] = useState<ChipProps[]>(dummyTagList);
  const [platformList, setPlatformList] = useState<ChipProps[]>(dummyPlatformList);

  // 실제 유저가 입력한 값들
  const [searchContents, setSearchContents] = useAtom(searchContentsAtom);
  const [selectedCategories, setSelectedCategories] = useAtom(selectedCategoriesAtom);
  const [selectedTags, setSelectedTags] = useAtom(selectedTagsAtom);
  const [selectedPlatforms, setSelectedPlatforms] = useAtom(selectedPlatformsAtom);

  // 스크롤 감지를 위한 상태와 ref
  const [hasScroll, setHasScroll] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const {
    mutate: BookmarkSearchResultMutation,
    isPending,
    data: searchResult,
  } = useMutation({
    mutationFn: postBookmarkSearchResult,
    onSuccess: (data) => {
      console.log('검색 결과:', data);
      if (data.error) {
        throw new Error(data.message);
      }
      return data.data;
    },
    onError: (error) => {
      console.error('검색 에러:', error);
    },
  });

  useEffect(() => {
    // 마운트될 때 항상 위에서 시작
    window.scrollTo({ top: 0, behavior: 'auto' });

    const categoryTagRequests = selectedCategories.map((category) => {
      // selectedTags에서 categoryId가 categoryIds 배열에 포함된 태그만 필터링
      const tagList = selectedTags
        .filter((tag) => tag.categoryIds.includes(category.categoryId))
        .map((tag) => {
          const tagIdIndex = tag.categoryIds.indexOf(category.categoryId);
          return tag.tagIds[tagIdIndex];
        });

      return {
        categoryId: category.categoryId,
        tagIds: tagList,
      };
    });

    const platforms = selectedPlatforms.map((platform) => platform.platform);

    // POST 요청 데이터 구성
    const requestData = {
      keyword: searchContents,
      categoryTagRequests,
      platforms,
      page: 0,
      size: 9999,
    };

    // POST 요청 보내기
    BookmarkSearchResultMutation(requestData);
    console.log(searchResult);

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <CommonHeader title={isMobile ? '링크 검색' : ''} />
      <ProfileHeader />
      <ChangeSearchBar barMarginTop={isMobile ? 20 : 50} isBackButton={true} />
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

      {isPending ? (
        <div className='flex justify-center items-center'>
          <Loading className='w-[15px] h-[15px]' />
        </div>
      ) : (
        <>
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
        </>
      )}

      <Outlet />
    </div>
  );
};

export default SearchResult;
