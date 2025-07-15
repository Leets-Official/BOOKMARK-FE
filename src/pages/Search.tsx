import React, { useState } from 'react';
import FilterSearchBar from '@/components/layout/searchBar/FilterSearchBar';
import { FilterIcon, SearchIcon } from '@/assets';
import Chip from '@/components/common/Chip';
import Button from '@/components/common/Button';
import { AnimatePresence, motion } from 'framer-motion';

const categories = [
  '개발',
  '공모전',
  '아티클',
  '카테고리',
  '블로그',
  '카테고리',
  '카테고리',
  '카테고리',
];
const tags = ['태그', '태그', '태그', '태그', '태그', '태그', '태그', '태그'];
const platforms = ['유튜브', '유튜브', '유튜브', '유튜브', '유튜브', '유튜브', '유튜브', '유튜브'];

const Search = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const toggleSelection = (item: string, setFn: React.Dispatch<React.SetStateAction<string[]>>) => {
    setFn((prev) => (prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]));
  };

  const resetAll = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
    setSelectedPlatforms([]);
  };

  return (
    <div className='flex flex-col w-full h-[100vh] bg-gray-100'>
      <div className='bg-white shadow-sm'>
        <FilterSearchBar
          selectedCategories={selectedCategories}
          selectedTags={selectedTags}
          selectedPlatforms={selectedPlatforms}
          onDeleteCategory={(cat) => setSelectedCategories((prev) => prev.filter((c) => c !== cat))}
          onDeleteTag={(tag) => setSelectedTags((prev) => prev.filter((t) => t !== tag))}
          onDeletePlatform={(platform) =>
            setSelectedPlatforms((prev) => prev.filter((p) => p !== platform))
          }
        />
      </div>

      <div className='flex flex-col p-4 flex-1'>
        <div className='flex items-center font-semibold text-lg mt-25 mb-4 ml-2'>
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
                key={`category-${idx}`}
                id={`category-${idx}`}
                content={category}
                type='category'
                isSelected={selectedCategories.includes(category)}
                onClick={() => toggleSelection(category, setSelectedCategories)}
                className='h-7 px-2 py-0.5 text-sm max-w-[80px] truncate w-1/4'
              />
            ))}
          </div>

          {/* 태그 */}
          <div className='bg-gray-100 px-4 py-3 rounded-lg'>
            <div className='text-sm font-semibold text-gray-800 mb-2'>태그</div>
            <AnimatePresence>
              {selectedCategories.length > 0 && (
                <motion.div
                  key='tags'
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className='overflow-hidden'
                >
                  <div className='flex flex-wrap gap-2'>
                    {tags.map((tag, idx) => (
                      <Chip
                        key={`tag-${idx}`}
                        id={`tag-${idx}`}
                        content={tag}
                        type='tag'
                        isSelected={selectedTags.includes(tag)}
                        onClick={() => toggleSelection(tag, setSelectedTags)}
                        className='h-7 px-2 py-0.5 text-sm max-w-[80px] truncate w-1/4'
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 플랫폼 */}
        <div className='mt-4 bg-white rounded-lg shadow-sm px-4 py-4'>
          <div className='text-sm font-semibold mb-2'>플랫폼</div>
          <AnimatePresence>
            {selectedTags.length > 0 && (
              <motion.div
                key='platforms'
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className='overflow-hidden'
              >
                <div className='flex flex-wrap gap-2'>
                  {platforms.map((platform, idx) => (
                    <Chip
                      key={`platform-${idx}`}
                      id={`platform-${idx}`}
                      content={platform}
                      type='platform'
                      isSelected={selectedPlatforms.includes(platform)}
                      onClick={() => toggleSelection(platform, setSelectedPlatforms)}
                      className='h-7 px-2 py-0.5 text-sm max-w-[80px] truncate w-1/4'
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 하단 버튼 */}
        <div className='fixed bottom-0 left-0 w-full bg-white px-8 py-4 flex justify-between items-center z-20'>
          <Button onClick={resetAll} className='text-black underline font-semibold cursor-pointer'>
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
  );
};

export default Search;
