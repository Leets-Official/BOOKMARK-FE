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
import { dummyCardData } from '@/constants/DummyData';
import { postSearchHistory } from '@/api/searchHistory/searchHistory';
import { useMutation } from '@tanstack/react-query';

const Search = () => {
  const [searchContents, setSearchContents] = useAtom(searchContentsAtom);
  const [selectedCategories, setSelectedCategories] = useAtom(selectedCategoriesAtom);
  const [selectedTags, setSelectedTags] = useAtom(selectedTagsAtom);
  const [selectedPlatforms, setSelectedPlatforms] = useAtom(selectedPlatformsAtom);
  const [categories, setCategories] = useState<{ id: number; content: string }[]>([]);
  const [platforms, setPlatforms] = useState<{ id: number; content: string }[]>([]);
  const [tags, setTags] = useState<{ id: number; content: string }[]>([]);

  useEffect(() => {
    const onlyCategories = Array.from(new Set(dummyCardData.map((item) => item.category))).map(
      (c, i) => ({ id: i, content: c }),
    );

    const onlyPatforms = Array.from(new Set(dummyCardData.map((item) => item.platform))).map(
      (p, i) => ({ id: i, content: p }),
    );

    setCategories(onlyCategories);
    setPlatforms(onlyPatforms);
  }, []);

  useEffect(() => {
    if (selectedCategories.length === 1) {
      const tags = dummyCardData
        .filter((item) => item.category === selectedCategories[0])
        .flatMap((item) => item.tags);
      const uniqueTags = Array.from(new Set(tags)).map((t, i) => ({ id: i, content: t }));
      setTags(uniqueTags);
    } else {
      setTags([]);
    }
  }, [selectedCategories]);

  const toggleSelection = (
    item: string,
    // eslint-disable-next-line no-unused-vars
    setFn: (updater: (prev: string[]) => string[]) => void,
    type?: 'category' | undefined,
  ) => {
    setFn((prev) => {
      if (type === 'category') {
        setSelectedTags([]);
        return prev.includes(item) ? [] : [item];
      }
      return prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item];
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

  return (
    <div className='relative min-h-screen  w-full h-full'>
      <div className='flex flex-col overflow-hidden'>
        <FilterSearchBar />

        {/* 스크롤 가능한 컨텐츠 영역 */}
        <div className='flex-1 overflow-y-auto p-3 pb-4 hide-scrollbar max-w-[1040px]'>
          <div className='flex items-center justify-between font-semibold text-xl mb-2 gap-1 pt-30'>
            <div className='flex items-center gap-1'>
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
              {categories.map((category) => (
                <Chip
                  key={category.id}
                  content={category.content}
                  isSelected={selectedCategories.includes(category.content)}
                  onClick={() =>
                    toggleSelection(category.content, setSelectedCategories, 'category')
                  }
                  className='border-lightGrayBlue'
                  selectedClassName='border-1 border-lightGreen bg-lightGreen text-white'
                />
              ))}
            </div>
            <hr className='border-1 border-lightGrayBlue mb-3' />
            <p className='text-sm font-semibold text-stone'>태그</p>
            <AnimatePresence>
              {selectedCategories.length === 1 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className='overflow-y-auto thin-scrollbar'
                >
                  <div className='flex flex-wrap gap-2 mt-2 p-0.5 pb-3'>
                    {tags.map((tag) => (
                      <Chip
                        key={tag.id}
                        content={tag.content}
                        isSelected={selectedTags.includes(tag.content)}
                        onClick={() => toggleSelection(tag.content, setSelectedTags)}
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
    </div>
  );
};

export default Search;
