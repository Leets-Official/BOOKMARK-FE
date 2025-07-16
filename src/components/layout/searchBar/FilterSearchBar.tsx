import { BackIcon, DeleteIcon, HistoryIcon } from '@/assets';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Chip from '@/components/common/Chip';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { selectedCategoriesAtom, selectedTagsAtom, selectedPlatformsAtom } from '@/atoms';

interface AnimatedHeightProps {
  show: boolean;
  children: React.ReactNode;
}

const AnimatedHeight: React.FC<AnimatedHeightProps> = ({ show, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (show && ref.current) {
      setHeight(ref.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [show, children]);

  return (
    <motion.div
      animate={{ height }}
      initial={false}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{ overflow: 'hidden' }}
    >
      <div ref={ref}>{children}</div>
    </motion.div>
  );
};

const FilterSearchBar: React.FC = () => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [history, setHistory] = useState<string[]>(['최근기록 1', '최근기록 2']);

  // Jotai 전역 상태
  const [selectedCategories, setSelectedCategories] = useAtom(selectedCategoriesAtom);
  const [selectedTags, setSelectedTags] = useAtom(selectedTagsAtom);
  const [selectedPlatforms, setSelectedPlatforms] = useAtom(selectedPlatformsAtom);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim()) {
      setHistory((prev) => [value, ...prev.filter((v) => v !== value)]);
      console.log('검색어:', value);
      setValue('');
    }
  };

  const clearInput = () => setValue('');

  const handleDeleteHistory = (target: string) => {
    setHistory((prev) => prev.filter((item) => item !== target));
  };

  const handleDeleteCategory = (category: string) =>
    setSelectedCategories((prev) => prev.filter((c) => c !== category));

  const handleDeleteTag = (tag: string) => setSelectedTags((prev) => prev.filter((t) => t !== tag));

  const handleDeletePlatform = (platform: string) =>
    setSelectedPlatforms((prev) => prev.filter((p) => p !== platform));

  const renderChip = (
    items: string[],
    // eslint-disable-next-line no-unused-vars
    onDelete: (item: string) => void,
    type: 'category' | 'tag' | 'platform',
  ) => {
    return items.map((item) => (
      <Chip
        key={`${type}-${item}`}
        id={item}
        content={item}
        isSelected={true}
        type={type}
        onDelete={() => onDelete(item)}
      />
    ));
  };

  const hasSelectedChips =
    selectedCategories.length > 0 || selectedTags.length > 0 || selectedPlatforms.length > 0;

  return (
    <div className='w-full bg-white shadow-sm relative'>
      {/* 선택된 Chip들 (애니메이션 적용) */}
      <AnimatePresence>
        <AnimatedHeight show={hasSelectedChips}>
          <div className='px-4 pt-2 border-t border-gray-200 bg-white flex flex-wrap gap-2'>
            {renderChip(selectedCategories, handleDeleteCategory, 'category')}
            {renderChip(selectedTags, handleDeleteTag, 'tag')}
            {renderChip(selectedPlatforms, handleDeletePlatform, 'platform')}
          </div>
        </AnimatedHeight>
      </AnimatePresence>

      {/* 검색창 */}
      <div className='flex items-center w-full h-12 px-4 shadow-md bg-white z-10'>
        <div className='mr-2 cursor-pointer'>
          <BackIcon />
        </div>
        <Input
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 100)}
          className='flex-1 border-none focus:outline-none text-sm placeholder-gray-400 bg-transparent'
          placeholder='제목, 메모, 태그'
        />
        <div className='ml-2 cursor-pointer' onClick={clearInput}>
          <DeleteIcon width={30} height={30} fill='#000000' />
        </div>
      </div>

      {/* 최근 검색 기록 */}
      {isFocused && history.length > 0 && (
        <div className='absolute top-full left-0 w-full bg-white px-4 shadow-md z-0'>
          {history.map((record, idx) => (
            <div
              key={idx}
              className='flex items-center justify-between gap-2 my-4 text-sm text-black'
            >
              <div className='flex items-center gap-2'>
                <HistoryIcon />
                {record}
              </div>
              <Button
                className='cursor-pointer'
                icon={<DeleteIcon width={20} height={20} fill='#000000' />}
                onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
                onClick={() => handleDeleteHistory(record)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSearchBar;
