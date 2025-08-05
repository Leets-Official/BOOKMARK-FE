import CompactCard from '@/components/ui/card/CompactCard';
import ChipDropDown from '@/components/layout/dropDown/ChipDropDown';
import ChangeSearchBar from '@/components/layout/searchBar/ChangeSearchBar';
import { useState, useRef, useEffect, useMemo } from 'react';
import type { ChipProps } from '@/types/components/components';
import clsx from 'clsx';
import { isMobile } from 'react-device-detect';
import SaveCard from '@/components/ui/card/SaveCard';
import CommonHeader from '@/components/layout/header/CommonHeader';
import ProfileHeader from '@/components/layout/header/ProfileHeader';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { postBookmarkSearchResult } from '@/api/bookmark/bookmark';
import Loading from '@/components/ui/loading/Loading';
import type { SearchCategory, SearchTag } from '@/types/common/search';
import type { PlatformProps } from '@/types/api/platform';
import toast from 'react-hot-toast';
import type { BookmarkSearchResultProps } from '@/types/api/bookmark';

const SearchResult = () => {
  const navigate = useNavigate();

  // 카테고리, 태그, 플랫폼 칩 드롭다운 상태 관리(더미 데이터)
  const [optionCategoryList, setOptionCategoryList] = useState<ChipProps[]>([]);
  const [optionTagList, setOptionTagList] = useState<ChipProps[]>([]);
  const [optionPlatformList, setOptionPlatformList] = useState<ChipProps[]>([]);

  // hash 파라미터 가져오기
  const location = useLocation();

  // 파라미터 상태 관리
  const [searchContents, setSearchContents] = useState('');
  const [paramsCategories, setParamsCategories] = useState<SearchCategory[]>([]);
  const [paramsTags, setParamsTags] = useState<SearchTag[]>([]);
  const [paramsPlatforms, setParamsPlatforms] = useState<PlatformProps[]>([]);

  // 검색 결과
  const [bookmarks, setBookmarks] = useState<BookmarkSearchResultProps['content']>([]);

  // 필터링된 검색 결과
  const filteredBookmarks = useMemo(() => {
    return bookmarks.filter((bookmark) => {
      const selectedCategories = optionCategoryList
        .filter((cat) => cat.isSelected)
        .map((cat) => cat.content);
      const selectedTags = optionTagList.filter((tag) => tag.isSelected).map((tag) => tag.content);
      const selectedPlatforms = optionPlatformList
        .filter((platform) => platform.isSelected)
        .map((platform) => platform.content);

      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(bookmark.categoryTagInfos[0]?.categoryName);
      const tagMatch =
        selectedTags.length === 0 ||
        bookmark.categoryTagInfos[0]?.tags.some((tag) => selectedTags.includes(tag.tagName));
      const platformMatch =
        selectedPlatforms.length === 0 || selectedPlatforms.includes(bookmark.platform);

      return categoryMatch && tagMatch && platformMatch;
    });
  }, [bookmarks, optionCategoryList, optionTagList, optionPlatformList]);

  // 스크롤 감지를 위한 상태와 ref
  const [hasScroll, setHasScroll] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const {
    mutate: BookmarkSearchResultMutation,
    isPending,
    data: searchResult,
  } = useMutation({
    mutationFn: postBookmarkSearchResult,
    onError: (error) => {
      console.error('검색 에러:', error);
    },
  });

  // URL 파라미터에서 값을 가져와서 atom에 설정
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const decoded = atob(hash);
      const queryData = JSON.parse(decodeURIComponent(decoded));

      const keyword = queryData.keyword;
      const categoriesParam = queryData.categories;
      const tagsParam = queryData.tags;
      const platformsParam = queryData.platforms;

      if (keyword) setSearchContents(keyword);

      try {
        if (categoriesParam) {
          setParamsCategories(categoriesParam);
        }
        if (tagsParam) {
          setParamsTags(tagsParam);
        }
        if (platformsParam) {
          setParamsPlatforms(platformsParam);
        }
      } catch (error) {
        toast.error('검색 결과를 불러오는데 실패했습니다.');
        console.error('URL 파라미터 파싱 에러:', error);
        navigate('/', { replace: true });
      }
    }
  }, [
    location.hash,
    navigate,
    setSearchContents,
    setParamsCategories,
    setParamsTags,
    setParamsPlatforms,
  ]);

  useEffect(() => {
    // 마운트될 때 항상 위에서 시작
    window.scrollTo({ top: 0, behavior: 'auto' });

    const categoryTagRequests = paramsCategories.map((category) => {
      // selectedTags에서 categoryId가 categoryIds 배열에 포함된 태그만 필터링
      const tagList = paramsTags
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

    const platforms = paramsPlatforms.map((platform) => platform.platform);

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
  }, [paramsCategories, paramsTags, paramsPlatforms, searchContents, BookmarkSearchResultMutation]);

  // searchResultData가 변경될 때만 searchResult 업데이트
  useEffect(() => {
    if (searchResult?.data) {
      setBookmarks(searchResult.data.content);

      // 중복 제거
      const uniqueCategories = [
        ...new Set(
          searchResult.data.content.map((bookmark) => bookmark.categoryTagInfos[0].categoryName),
        ),
      ];

      const uniqueTags = [
        ...new Set(
          searchResult.data.content.map((bookmark) => bookmark.categoryTagInfos[0].tags[0].tagName),
        ),
      ];

      const uniquePlatforms = [
        ...new Set(searchResult.data.content.map((bookmark) => bookmark.platform)),
      ];

      setOptionCategoryList(
        uniqueCategories.map((category, index) => ({
          id: index,
          content: category.toString(),
          isSelected: false,
          type: 'category',
        })),
      );

      setOptionTagList(
        uniqueTags.map((tag, index) => ({
          id: index,
          content: tag.toString(),
          isSelected: false,
          type: 'tag',
        })),
      );

      setOptionPlatformList(
        uniquePlatforms.map((platform, index) => ({
          id: index,
          content: platform,
          isSelected: false,
          type: 'platform',
        })),
      );
    }
  }, [searchResult]);

  // SearchResult 페이지에서만 body에 스크롤 클래스 추가
  useEffect(() => {
    document.body.classList.add('scroll-visible');

    return () => {
      document.body.classList.remove('scroll-visible');
    };
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
  }, [optionCategoryList, optionTagList, optionPlatformList]);

  return (
    <div className='search-result-page max-w-[1200px] mx-auto relative min-h-screen flex flex-col gap-4 pb-25 bg-white'>
      <CommonHeader title={isMobile ? '링크 검색' : ''} />
      {!isMobile && <ProfileHeader />}
      <ChangeSearchBar barMarginTop={isMobile ? 20 : 50} isBackButton={true} />
      <div
        ref={scrollContainerRef}
        className={clsx(
          'flex flex-row gap-3 items-center overflow-x-auto px-4',
          hasScroll ? 'justify-start' : 'justify-center',
        )}
      >
        {/* 카테고리, 태그, 플랫폼 칩 드롭다운 */}
        <ChipDropDown
          title='카테고리'
          options={optionCategoryList}
          onChange={setOptionCategoryList}
        />
        <ChipDropDown title='태그' options={optionTagList} onChange={setOptionTagList} />
        <ChipDropDown
          title='플랫폼'
          options={optionPlatformList}
          onChange={setOptionPlatformList}
        />
      </div>

      {isPending ? (
        <div className='flex justify-center items-center'>
          <Loading className='w-[15px] h-[15px]' />
        </div>
      ) : (
        <>
          <div className={clsx('flex flex-col gap-3 mb-10', isMobile ? 'px-4' : '')}>
            {isMobile ? (
              filteredBookmarks.map((bookmark) => (
                <CompactCard
                  key={bookmark.id}
                  id={bookmark.id}
                  title={bookmark.title}
                  image={bookmark.file.fileUrl}
                  memo={bookmark.memo}
                  category={bookmark.categoryTagInfos[0].categoryName}
                  tags={bookmark.categoryTagInfos[0].tags.map((tag) => tag.tagName)}
                />
              ))
            ) : (
              <div className='w-[95%] max-sm:w-9/10 mx-auto gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
                {filteredBookmarks.map((bookmark) => (
                  <SaveCard
                    key={bookmark.id}
                    data={{
                      id: bookmark.id,
                      url: bookmark.url,
                      title: bookmark.title,
                      memo: bookmark.memo,
                      platform: bookmark.platform,
                      image: bookmark.file.fileUrl,
                      faviconUrl: bookmark.faviconUrl,
                      category: bookmark.categoryTagInfos[0].categoryName,
                      tags: bookmark.categoryTagInfos[0].tags.map((tag) => tag.tagName),
                      createdAt: bookmark.createdAt,
                    }}
                  />
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
