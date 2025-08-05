import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import FilterSearchBar from '@/components/layout/searchBar/FilterSearchBar';
import { FilterIcon, SearchIcon } from '@/assets';
import { Chip, Button } from '@/components/common';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import {
  selectedSearchCategoriesAtom,
  selectedSearchTagsAtom,
  selectedSearchPlatformsAtom,
  searchContentsAtom,
} from '@/atoms';
import { postSearchHistory } from '@/api/searchHistory/searchHistory';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getCategoriesWithTag } from '@/api/category/category';
import Loading from '@/components/ui/loading/Loading';
import type { SearchCategory, SearchTag } from '@/types/common/search';
import { getPlatforms } from '@/api/platform/platform';
import type { PlatformProps } from '@/types/api/platform';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  // 실제 유저가 입력한 값들
  const [searchContents, setSearchContents] = useAtom(searchContentsAtom);
  const [selectedCategories, setSelectedCategories] = useAtom(selectedSearchCategoriesAtom);
  const [selectedTags, setSelectedTags] = useAtom(selectedSearchTagsAtom);
  const [selectedPlatforms, setSelectedPlatforms] = useAtom(selectedSearchPlatformsAtom);

  // 카테고리 목록
  const [categories, setCategories] = useState<SearchCategory[]>([]);

  // 태그 목록
  const [tags, setTags] = useState<SearchTag[]>([]); // tagName이 중복된 태그를 제외한 태그 목록
  const [visibleTags, setVisibleTags] = useState<SearchTag[]>([]); // 전체 태그
  const [showTags, setShowTags] = useState(false); // 유저가 선택할 수 있는 태그

  // 플랫폼 목록
  const [platforms, setPlatforms] = useState<PlatformProps[]>([]); // 전체 플랫폼
  const [visiblePlatforms, setVisiblePlatforms] = useState<PlatformProps[]>([]); // 유저가 선택할 수 있는 플랫폼

  const navigate = useNavigate();

  const { data: categoriesWithTag, isPending: isCategoriesPending } = useQuery({
    queryKey: ['categoriesWithTags'],
    queryFn: async () => {
      const res = await getCategoriesWithTag();
      if (res.error) {
        throw new Error(res.message);
      }
      return res.data;
    },
  });

  const { data: platformsData, isPending: isPlatformsPending } = useQuery({
    queryKey: ['platforms'],
    queryFn: async () => {
      const res = await getPlatforms();
      if (res.error) {
        throw new Error(res.message);
      }
      return res.data;
    },
  });

  // 중복 태그 처리 함수
  const processDuplicateTags = (tags: { tagId: number; tagName: string; categoryId: number }[]) => {
    const tagMap = new Map<string, { tagName: string; tagIds: number[]; categoryIds: number[] }>();

    tags.forEach((tag) => {
      if (tagMap.has(tag.tagName)) {
        // 기존 태그가 있으면 tagId와 categoryId 추가
        const existing = tagMap.get(tag.tagName)!;
        existing.tagIds.push(tag.tagId);
        existing.categoryIds.push(tag.categoryId);
      } else {
        // 새로운 태그면 새로 생성
        tagMap.set(tag.tagName, {
          tagName: tag.tagName,
          tagIds: [tag.tagId],
          categoryIds: [tag.categoryId],
        });
      }
    });

    // Map을 배열로 변환
    return Array.from(tagMap.values());
  };

  // 카테고리 API 데이터 로드
  useEffect(() => {
    if (!isCategoriesPending) {
      const categories = categoriesWithTag?.map((category) => ({
        categoryId: category.categoryId,
        categoryName: category.categoryName,
        platforms: category.platforms,
      }));

      const allTags = categoriesWithTag?.flatMap((category) =>
        category.tags.map((tag) => ({
          tagId: tag.tagId,
          tagName: tag.tagName,
          categoryId: tag.categoryId,
        })),
      );

      // 중복 태그 처리
      const processedTags = processDuplicateTags(allTags || []);

      setCategories(categories || []);
      setTags(processedTags || []);
    }
  }, [isCategoriesPending, categoriesWithTag]);

  // 플랫폼 API 데이터 로드
  useEffect(() => {
    if (!isPlatformsPending) {
      setPlatforms(platformsData || []);
    }
  }, [isPlatformsPending, platformsData]);

  useEffect(() => {
    if (selectedCategories.length !== 0) {
      const visibleTags = tags.filter((tag) =>
        selectedCategories.some((category) => tag.categoryIds.includes(category.categoryId)),
      );
      const visiblePlatforms = platforms.filter((platform) =>
        selectedCategories.some((category) => category.platforms.includes(platform.platform)),
      );
      setVisibleTags(visibleTags);
      setVisiblePlatforms(visiblePlatforms);
      setShowTags(true);
    } else {
      setVisibleTags([]);
      // 플랫폼 목록 초기화
      setVisiblePlatforms(platforms);
      setShowTags(false);
    }
  }, [selectedCategories, tags, platforms]);

  // 선택된 태그가 현재 보이는 태그에 포함되어 있는지 확인
  useEffect(() => {
    setSelectedTags((prev) => {
      const validSelectedTags = prev.filter((selectedTag) =>
        visibleTags.some((visibleTag) =>
          visibleTag.tagIds.some((tagId) => selectedTag.tagIds.includes(tagId)),
        ),
      );
      return validSelectedTags;
    });
  }, [visibleTags, setSelectedTags]);

  // 선택된 플랫폼이 현재 보이는 플랫폼에 포함되어 있는지 확인
  useEffect(() => {
    setSelectedPlatforms((prev) => {
      const validSelectedPlatforms = prev.filter((selectedPlatform) =>
        visiblePlatforms.some(
          (visiblePlatform) => selectedPlatform.platform === visiblePlatform.platform,
        ),
      );
      return validSelectedPlatforms;
    });
  }, [visiblePlatforms, setSelectedPlatforms]);

  // 카테고리 선택
  const handleCategorySelection = (item: SearchCategory) => {
    setSelectedCategories((prev) => {
      if (prev.some((selected) => selected.categoryId === item.categoryId)) {
        return prev.filter((selected) => selected.categoryId !== item.categoryId);
      }
      return [...prev, item];
    });
  };

  // 태그 선택
  const handleTagSelection = (item: SearchTag) => {
    setSelectedTags((prev) => {
      if (prev.some((selected) => selected.tagIds.includes(item.tagIds[0]))) {
        return prev.filter((selected) => !selected.tagIds.includes(item.tagIds[0]));
      }
      return [...prev, item];
    });
  };

  // 플랫폼 선택
  const handlePlatformSelection = (item: PlatformProps) => {
    setSelectedPlatforms((prev) => {
      if (prev.some((selected) => selected.platform === item.platform)) {
        return prev.filter((selected) => selected.platform !== item.platform);
      }
      return [...prev, item];
    });
  };

  // 검색어 추가
  const { mutate: addSearchHistory } = useMutation({
    mutationFn: postSearchHistory,
    onSuccess: (res) => {
      if (res.error) {
        console.error('검색 기록 저장 실패:', res.message);
        return;
      }
      setSearchContents('');
    },
    onError: (error) => {
      console.error('검색 기록 저장 실패:', error);
    },
  });

  const resetAll = () => {
    setSearchContents('');
    setSelectedCategories([]);
    setSelectedTags([]);
    setSelectedPlatforms([]);
  };

  const handleSearch = () => {
    const queryData = {
      keyword: searchContents,
      categories: selectedCategories,
      tags: selectedTags,
      platforms: selectedPlatforms,
    };

    const hash = btoa(encodeURIComponent(JSON.stringify(queryData)));
    resetAll();
    navigate(`/search-result#${hash}`);
    if (searchContents) addSearchHistory(searchContents);
  };

  return (
    <div className='max-w-[1200px] mx-auto min-h-screen w-full md:w-[768px] flex flex-col'>
      <FilterSearchBar handleSearch={handleSearch} />

      {/* 스크롤 가능한 컨텐츠 영역 */}
      <div className='flex-1 overflow-y-auto p-3 pb-40 hide-scrollbar'>
        <div className='flex items-center justify-between font-semibold text-xl mb-2 sm:my-5 mt-30'>
          <div className='flex items-center gap-1 text-2xl'>
            <FilterIcon width={24} height={24} />
            필터
          </div>
          {!isMobile && (
            <Button onClick={resetAll} className='cursor-pointer font-medium text-15 border-b-3'>
              초기화
            </Button>
          )}
        </div>

        <div className='bg-white p-4 rounded-xl shadow-[0_2px_7px_rgba(2,34,94,0.1)]'>
          <p className='mb-2 text-sm font-semibold text-stone'>카테고리</p>
          <div className='flex flex-wrap gap-2 mb-6 p-0.5'>
            {isCategoriesPending ? (
              <Loading className='w-[15px] h-[15px] my-3' />
            ) : (
              <>
                {categories.map((category) => (
                  <Chip
                    key={category.categoryId}
                    content={category.categoryName}
                    isSelected={selectedCategories.some(
                      (selected) => selected.categoryId === category.categoryId,
                    )}
                    onClick={() => handleCategorySelection(category)}
                    className='border-lightGrayBlue'
                    selectedClassName='border-1 border-lightGreen bg-lightGreen text-white'
                  />
                ))}
              </>
            )}
          </div>
          <hr className='border-1 border-lightGrayBlue mb-3' />
          <p className='text-sm font-semibold text-stone'>태그</p>
          <AnimatePresence mode='wait'>
            {showTags && (
              <motion.div
                key='tagContainer'
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className='overflow-hidden'
              >
                <div className='flex flex-wrap gap-2 p-0.5 mt-4'>
                  {visibleTags.map((tag) => (
                    <Chip
                      key={tag.tagName}
                      content={tag.tagName}
                      isSelected={selectedTags.some((selected) =>
                        selected.tagIds.includes(tag.tagIds[0]),
                      )}
                      onClick={() => handleTagSelection(tag)}
                      className='border-lightGrayBlue'
                      selectedClassName='border-1 border-blue bg-blue/10 text-blue'
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 플랫폼 영역 */}
        <div className='mt-4 bg-white rounded-xl shadow-[0_2px_7px_rgba(2,34,94,0.1)] px-4 py-4'>
          <p className='mb-2 text-sm font-semibold text-stone'>플랫폼</p>
          {isPlatformsPending ? (
            <Loading className='w-[15px] h-[15px] my-3' />
          ) : (
            <div className='flex flex-wrap gap-2'>
              {visiblePlatforms.map((platform, index) => (
                <Chip
                  key={index}
                  content={
                    <span className='flex items-center gap-1'>
                      {platform.faviconUrl && (
                        <img src={platform.faviconUrl} alt='favicon' className='w-4 h-4' />
                      )}
                      <span>{platform.platform}</span>
                    </span>
                  }
                  isSelected={selectedPlatforms.some(
                    (selected) => selected.platform === platform.platform,
                  )}
                  onClick={() => handlePlatformSelection(platform)}
                  className='border-lightGrayBlue'
                  selectedClassName='border-1 border-blue bg-blue/10'
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {isMobile && (
        <>
          {/* 고정된 하단 버튼 영역 */}
          <div className='fixed bottom-0 left-0 right-0 bg-white px-6 flex justify-between items-center border-t border-gray-200 flex-shrink-0 p-4'>
            <Button onClick={resetAll} className='cursor-pointer font-medium text-15 border-b-3'>
              초기화
            </Button>
            <Button
              onClick={() => handleSearch()}
              icon={<SearchIcon className='w-4 h-4' stroke='white' />}
              className='cursor-pointer flex items-center gap-2 px-6 py-3 bg-blue text-white rounded-[10px] text-15 hover:brightness-90 transition'
            >
              검색
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
