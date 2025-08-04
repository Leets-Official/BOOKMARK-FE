import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import FilterSearchBar from '@/components/layout/searchBar/FilterSearchBar';
import { FilterIcon, SearchIcon } from '@/assets';
import { Chip, Button } from '@/components/common';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import {
  selectedCategoriesAtom,
  selectedTagsAtom,
  selectedPlatformsAtom,
  searchContentsAtom,
} from '@/atoms';
import { postSearchHistory } from '@/api/searchHistory/searchHistory';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getCategoriesWithTag } from '@/api/category/category';
import Loading from '@/components/ui/loading/Loading';
import type { SearchCategory, SearchTag } from '@/types/common/search';

const Search = () => {
  const [searchContents, setSearchContents] = useAtom(searchContentsAtom);
  const [selectedCategories, setSelectedCategories] = useAtom(selectedCategoriesAtom);
  const [selectedTags, setSelectedTags] = useAtom(selectedTagsAtom);
  const [selectedPlatforms, setSelectedPlatforms] = useAtom(selectedPlatformsAtom);
  const [categories, setCategories] = useState<SearchCategory[]>([]);
  // tagName이 중복된 태그를 제외한 태그 목록
  const [tags, setTags] = useState<SearchTag[]>([]);
  // 유저가 선택할 수 있는 태그 목록
  const [visibleTags, setVisibleTags] = useState<SearchTag[]>([]);
  const [showTags, setShowTags] = useState(false);
  const [platforms, setPlatforms] = useState<{ id: number; content: string }[]>([]);

  const { data: categoriesWithTag, isPending } = useQuery({
    queryKey: ['categoriesWithTags'],
    queryFn: async () => {
      const res = await getCategoriesWithTag();
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

  useEffect(() => {
    if (!isPending) {
      const categories = categoriesWithTag?.map((category) => ({
        categoryId: category.categoryId,
        categoryName: category.categoryName,
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
  }, [isPending, categoriesWithTag]);

  useEffect(() => {
    if (selectedCategories.length !== 0) {
      const visibleTags = tags.filter((tag) =>
        selectedCategories.some((category) => tag.categoryIds.includes(category.categoryId)),
      );
      setVisibleTags(visibleTags);
      setShowTags(true);
    } else {
      setVisibleTags([]);
      setShowTags(false);
    }
  }, [selectedCategories, tags]);

  // useEffect(() => {
  //   const onlyCategories = Array.from(new Set(dummyCardData.map((item) => item.category))).map(
  //     (c, i) => ({ id: i, content: c }),
  //   );

  //   const onlyPatforms = Array.from(new Set(dummyCardData.map((item) => item.platform))).map(
  //     (p, i) => ({ id: i, content: p }),
  //   );

  //   setCategories(onlyCategories);
  //   setPlatforms(onlyPatforms);
  // }, []);

  // useEffect(() => {
  //   if (selectedCategories.length === 1) {
  //     const tags = dummyCardData
  //       .filter((item) => item.category === selectedCategories[0])
  //       .flatMap((item) => item.tags);
  //     const uniqueTags = Array.from(new Set(tags)).map((t, i) => ({ id: i, content: t }));
  //     setTags(uniqueTags);
  //   } else {
  //     setTags([]);
  //   }
  //   setShowTags(selectedCategories.length === 1);
  // }, [selectedCategories]);

  // 카테고리 선택
  const handleCategorySelection = (item: SearchCategory) => {
    setSelectedCategories((prev) => {
      if (prev.some((selected) => selected.categoryId === item.categoryId)) {
        return prev.filter((selected) => selected.categoryId !== item.categoryId);
      }
      return [...prev, item];
    });
    setSelectedTags([]);
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
    console.log({ selectedCategories, selectedTags, selectedPlatforms });
    addSearchHistory(searchContents);
  };
  console.log(selectedTags);

  return (
    <div className='max-w-[1200px] mx-auto min-h-screen w-full md:w-[768px] flex flex-col'>
      {/* <FilterSearchBar /> */}

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
        {isPending ? (
          <Loading className='w-[96px] h-[96px] m-5' />
        ) : (
          <div className='bg-white p-4 rounded-xl shadow-[0_2px_7px_rgba(2,34,94,0.1)]'>
            <p className='mb-2 text-sm font-semibold text-stone'>카테고리</p>
            <div className='flex flex-wrap gap-2 mb-6 p-0.5'>
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
        )}

        {/* 플랫폼 영역 */}
        <div className='mt-4 bg-white rounded-xl shadow-[0_2px_7px_rgba(2,34,94,0.1)] px-4 py-4'>
          <p className='mb-2 text-sm font-semibold text-stone'>플랫폼</p>
          <div className='flex flex-wrap gap-2'>
            {platforms.map((platform) => (
              <Chip
                key={platform.id}
                content={platform.content}
                isSelected={selectedPlatforms.includes(platform.content)}
                onClick={() => toggleSelection(platform.content, setSelectedPlatforms)}
                className='border-lightGrayBlue'
                selectedClassName='border-1 border-blue bg-blue/10'
              />
            ))}
          </div>
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
