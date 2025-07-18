import { useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { tv } from 'tailwind-variants';
import FilterSearchBar from '@/components/layout/searchBar/FilterSearchBar';
import { FilterIcon, SearchIcon } from '@/assets';
import Chip from '@/components/common/Chip';
import Button from '@/components/common/Button';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { selectedCategoriesAtom, selectedTagsAtom, selectedPlatformsAtom } from '@/atoms';
import { categories, tags, platforms } from '@/components/contants/DummyData';

const overlayStyle = tv({
  base: 'fixed inset-0 z-100 flex items-center justify-center',
  variants: {
    isMobile: {
      true: '',
      false: 'bg-black/50',
    },
  },
});

const modalStyle = tv({
  base: 'bg-gray-100 rounded-lg flex flex-col overflow-hidden',
  variants: {
    isMobile: {
      true: 'w-full h-full',
      false: 'w-[369px] h-[773px]',
    },
  },
});

const Search = () => {
  const [selectedCategories, setSelectedCategories] = useAtom(selectedCategoriesAtom);
  const [selectedTags, setSelectedTags] = useAtom(selectedTagsAtom);
  const [selectedPlatforms, setSelectedPlatforms] = useAtom(selectedPlatformsAtom);

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setSelectedTags([]);
      setSelectedPlatforms([]);
    }
  }, [selectedCategories, setSelectedTags, setSelectedPlatforms]);

  const toggleSelection = (
    item: string,
    // eslint-disable-next-line no-unused-vars
    setFn: (updater: (prev: string[]) => string[]) => void,
  ) => {
    setFn((prev) => (prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]));
  };

  const resetAll = () => {
    setSelectedCategories([]);
  };

  return (
    <div className={overlayStyle({ isMobile })}>
      <div className={modalStyle({ isMobile })}>
        {/* 검색창 */}
        <div className='bg-white shadow-sm sticky top-0 z-10'>
          <FilterSearchBar />
        </div>

        {/* 콘텐츠 + 버튼 영역 (flex-1 + 버튼 분리) */}
        <div className='flex flex-col flex-1 overflow-hidden'>
          {/* 스크롤 영역 */}
          <div className='flex-1 overflow-y-auto px-4 py-6'>
            {/* 필터 제목 */}
            <div className='flex items-center font-semibold text-lg mb-4 ml-2'>
              <FilterIcon className='w-5 h-5 mr-2 text-black' />
              필터
            </div>

            {/* 카테고리 + 태그 */}
            <div className='bg-white p-4 rounded-lg shadow-sm'>
              {/* 카테고리 */}
              <div className='mb-2 text-sm font-semibold text-gray-800'>카테고리</div>
              <div className='flex flex-wrap gap-2 mb-6'>
                {categories.map((category, idx) => (
                  <Chip
                    key={`category--${idx}`}
                    id={`category--${idx}`}
                    content={category}
                    type='category'
                    isSelected={selectedCategories.includes(category)}
                    onClick={() => toggleSelection(category, setSelectedCategories)}
                    className='h-7 px-3 py-0.5 text-sm max-w-[80px] truncate'
                  />
                ))}
              </div>

              {/* 태그 */}
              <div className='bg-gray-100 px-4 py-4 rounded-lg overflow-visible'>
                <div className='text-sm font-semibold text-gray-800 mb-2'>태그</div>
                <AnimatePresence>
                  {selectedCategories.length > 0 && (
                    <motion.div
                      key='tags'
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className='overflow-visible'
                    >
                      <div className='flex flex-wrap gap-2'>
                        {tags.map((tag, idx) => (
                          <Chip
                            key={`tag--${idx}`}
                            id={`tag--${idx}`}
                            content={tag}
                            type='tag'
                            isSelected={selectedTags.includes(tag)}
                            onClick={() => toggleSelection(tag, setSelectedTags)}
                            className='h-7 px-3 py-0.5 text-sm max-w-[80px] truncate z-10'
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* 플랫폼 */}
            <div className='mt-4 bg-white rounded-lg shadow-sm px-4 py-4 overflow-visible'>
              <div className='text-sm font-semibold mb-2'>플랫폼</div>
              <div className='flex flex-wrap gap-2'>
                {platforms.map((platform, idx) => (
                  <Chip
                    key={`platform--${idx}`}
                    id={`platform--${idx}`}
                    content={platform}
                    type='platform'
                    isSelected={selectedPlatforms.includes(platform)}
                    onClick={() => toggleSelection(platform, setSelectedPlatforms)}
                    className='h-7 px-3 py-0.5 text-sm max-w-[80px] truncate z-10'
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 하단 버튼 + 그라데이션 */}
          <div className='relative'>
            <div className='absolute top-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent pointer-events-none' />
            <div className='bg-white px-8 py-4 flex justify-between items-center border-t border-gray-200 z-10 relative'>
              <Button
                onClick={resetAll}
                className='text-black underline font-semibold cursor-pointer'
              >
                초기화
              </Button>
              <Button
                onClick={() => {
                  console.log({ selectedCategories, selectedTags, selectedPlatforms });
                }}
                icon={<SearchIcon className='w-4 h-4' />}
                className='cursor-pointer flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-md text-sm'
              >
                검색
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
