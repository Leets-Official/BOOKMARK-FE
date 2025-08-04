import { DeleteIcon, HistoryIcon, LeftIcon, RoundDeleteIcon } from '@/assets';
import { Input, Button, Chip } from '@/components/common';
import React, { useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import {
  selectedCategoriesAtom,
  selectedTagsAtom,
  selectedPlatformsAtom,
  searchContentsAtom,
} from '@/atoms';
import { useNavigate } from 'react-router-dom';
import { deleteSearchHistory, getSearchHistory } from '@/api/searchHistory/searchHistory';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { GetSearchHistoryProps } from '@/types/api/searchHistory';
import type { SearchCategory } from '@/types/common/search';
import type { PlatformProps } from '@/types/api/platform';
import type { SearchTag } from '@/types/common/search';

interface AnimatedHeightProps {
  show: boolean;
  children: React.ReactNode;
}

const AnimatedHeight: React.FC<AnimatedHeightProps> = ({ show, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
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
  const [isFocused, setIsFocused] = useState(false);
  const historyRef = useRef<HTMLDivElement>(null);

  const [selectedCategories, setSelectedCategories] = useAtom(selectedCategoriesAtom);
  const [selectedTags, setSelectedTags] = useAtom(selectedTagsAtom);
  const [selectedPlatforms, setSelectedPlatforms] = useAtom(selectedPlatformsAtom);
  const [searchContents, setSearchContents] = useAtom(searchContentsAtom);
  const navigate = useNavigate();
  const onPrev = () => navigate(-1);

  // 검색 기록 조회
  const { data: history, refetch } = useQuery({
    queryKey: ['searchHistory'],
    queryFn: getSearchHistory,
  });

  // 검색어 삭제
  const { mutate: removeSearchHistory } = useMutation({
    mutationFn: (searchHistoryId: number) => deleteSearchHistory(searchHistoryId),
    onSuccess: (res) => {
      if (res.error) {
        console.error('검색 기록 삭제 실패:', res.message);
        return;
      }
      refetch();
    },
    onError: (error) => {
      console.error('검색 기록 삭제 실패:', error);
    },
  });

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchContents(e.currentTarget.value);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      setIsFocused(false);
      e.currentTarget.blur();
    }
  };

  const clearInput = () => setSearchContents('');

  const handleDeleteHistory = (searchHistoryId: number) => {
    removeSearchHistory(searchHistoryId);
  };

  const handleDeleteCategory = (category: SearchCategory) =>
    setSelectedCategories((prev) => prev.filter((c) => c.categoryId !== category.categoryId));

  const handleDeleteTag = (tag: SearchTag) =>
    setSelectedTags((prev) => prev.filter((t) => !t.tagIds.includes(tag.tagIds[0])));

  const handleDeletePlatform = (platform: PlatformProps) =>
    setSelectedPlatforms((prev) => prev.filter((p) => p.platform !== platform.platform));

  const hasHistory = history && !history.error && history.data?.length > 0;

  const renderChip = (
    data: SearchCategory[] | SearchTag[] | PlatformProps[],
    // eslint-disable-next-line no-unused-vars
    onDelete: (item: any) => void, // onDelete 함수 타입을 광범위하게 지정할 수 없어 any로 설정
    type: 'category' | 'tag' | 'platform',
  ) => {
    // 타입별로 다른 selectedClassName 정의
    const getSelectedClassName = (chipType: 'category' | 'tag' | 'platform') => {
      switch (chipType) {
        case 'category':
          return 'border-1 border-lightGreen bg-lightGreen text-white'; // 카테고리용 스타일
        case 'tag':
          return 'border-1 border-blue bg-blue/10 text-blue'; // 태그용 스타일
        case 'platform':
          return 'border-1 border-blue bg-blue/10'; // 플랫폼용 스타일
      }
    };
    const getDeleteIconColor = (chipType: 'category' | 'tag' | 'platform') => {
      switch (chipType) {
        case 'category':
          return '#545966';
        case 'tag':
        case 'platform':
          return '#397FFF';
      }
    };

    const items = data.map((item) => {
      if (type === 'platform') {
        const platformItem = item as PlatformProps;
        return {
          displayName: platformItem.platform,
          icon: platformItem.faviconUrl,
          originalItem: platformItem,
        };
      } else if (type === 'category') {
        const categoryItem = item as SearchCategory;
        return {
          displayName: categoryItem.categoryName,
          icon: null,
          originalItem: categoryItem,
        };
      } else {
        const tagItem = item as SearchTag;
        return {
          displayName: tagItem.tagName,
          icon: null,
          originalItem: tagItem,
        };
      }
    });

    return items.map((item) => (
      <Chip
        key={`${type}-${item.displayName}`}
        content={
          <span className='flex items-center gap-1'>
            {item.icon && <img src={item.icon} alt='favicon' className='w-4 h-4' />}
            <span>{item.displayName}</span>
          </span>
        }
        isSelected={true}
        selectedClassName={getSelectedClassName(type)}
        onDelete={() => onDelete(item.originalItem)}
        deleteIconColor={getDeleteIconColor(type)}
      />
    ));
  };

  const hasSelectedChips =
    selectedCategories.length > 0 || selectedTags.length > 0 || selectedPlatforms.length > 0;

  // 외부 클릭 시 검색 기록창 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (historyRef.current && !historyRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='w-full bg-white shadow-md relative' ref={historyRef}>
      <div className='absolute top-2 left-2 z-20 cursor-pointer' onClick={onPrev}>
        <LeftIcon width={30} height={30} stroke='#000000' />
      </div>
      <AnimatePresence>
        <AnimatedHeight show={hasSelectedChips}>
          <div className='px-2 pt-2 pb-1 border-t border-gray-200 bg-white flex flex-wrap gap-2 ml-[46px]'>
            {renderChip(selectedCategories, handleDeleteCategory, 'category')}
            {renderChip(selectedTags, handleDeleteTag, 'tag')}
            {renderChip(selectedPlatforms, handleDeletePlatform, 'platform')}
          </div>
        </AnimatedHeight>
      </AnimatePresence>

      {/* 검색창 */}
      <div className='flex items-center w-full h-12 px-2 bg-white z-10 relative'>
        <div className='w-[30px] mr-2'></div>
        <Input
          value={searchContents}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          className='flex-1 border-none focus:outline-none text-15 placeholder-gray-400 bg-transparent'
          placeholder='제목, 메모, 태그'
        />
        <div className='mr-1 cursor-pointer hover:brightness-90' onClick={clearInput}>
          <RoundDeleteIcon width={22} height={22} />
        </div>
      </div>

      {/* 최근 검색 기록 */}
      {isFocused && hasHistory && (
        <div className='absolute top-full left-0 w-full px-4 shadow-md z-20 bg-white border-t-2 border-lightGrayBlue max-h-[128px] overflow-y-auto'>
          {history.data.map(({ keyword, id }: GetSearchHistoryProps) => (
            <div key={id} className='flex items-center justify-between my-4.5 text-15 text-black'>
              <div
                className='flex items-center gap-2 cursor-pointer hover:underline'
                onClick={() => {
                  setSearchContents(keyword);
                  setIsFocused(false);
                }}
              >
                <HistoryIcon />
                {keyword}
              </div>
              <Button
                className='cursor-pointer'
                icon={<DeleteIcon width={12} height={12} stroke='#545966' />}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleDeleteHistory(id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSearchBar;
