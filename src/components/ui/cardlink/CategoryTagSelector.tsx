import { AnimatePresence, motion } from 'framer-motion';
import { Chip } from '@/components/common';
import { AddIcon } from '@/assets';
import { useEffect, useMemo, useState } from 'react';
import {
  isSaveButtonDisabledAtom,
  suggestionListAtom,
  visibleCategoryAtom,
  visibleMemoAndAlarmAtom,
  visibleTagAtom,
  isSuggestionLoadingAtom,
} from '@/atoms';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import clsx from 'clsx';
import AddModal from '@/components/ui/modal/AddModal';
import type { saveSchema } from '@/schema/save';
import type { FieldErrors, UseFormSetValue } from 'react-hook-form';
import type z from 'zod';
import { getCategoriesWithTag } from '@/api/Category/category';
import { useQuery } from '@tanstack/react-query';

type ModalType = 'category' | 'tag';

interface ICateTagProps {
  editCate?: string;
  editTag?: string[];
  setValue: UseFormSetValue<z.infer<typeof saveSchema>>;
  error: FieldErrors<z.infer<typeof saveSchema>>;
}

interface ITag {
  tagId: number;
  tagName: string;
}

interface ICategoryWithTags {
  categoryId: number;
  categoryName: string;
  createdAt: string;
  tags: ITag[];
}

const CategoryTagSelector = ({ editCate, editTag, setValue, error }: ICateTagProps) => {
  const visibleCategory = useAtomValue(visibleCategoryAtom);
  const [visibleTag, setVisibleTag] = useAtom(visibleTagAtom);
  const openCate = visibleCategory;
  const openTag = visibleTag;

  const setVisibleMemoAndAlarm = useSetAtom(visibleMemoAndAlarmAtom); // 메모, 알림
  const setIsSaveButtonDisabled = useSetAtom(isSaveButtonDisabledAtom); // 저장하기 버튼

  const [suggestionList, setSuggestionList] = useAtom(suggestionListAtom);
  const isSuggestionLoading = useAtomValue(isSuggestionLoadingAtom); // 아직 제안 태그 못가져 왔으면 로딩상태

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState<string[]>([]);

  // 수정 모드일 때 초기값 설정
  useEffect(() => {
    if (editCate) {
      setSelectedCategory(editCate);
      setVisibleTag(true);
    }
    if (editTag) {
      setSelectedTag(editTag);
    }
  }, [editCate, editTag, setVisibleTag]);

  // 전체 카테고리와 태그를 한 번에 조회
  const {
    data: categoriesWithTagsData,
    isLoading: isDataLoading,
    isError: isDataError,
  } = useQuery<ICategoryWithTags[]>({
    queryKey: ['categoriesWithTags'],
    queryFn: async () => {
      const data = await getCategoriesWithTag();
      return data ?? [];
    },
    gcTime: 5 * 60 * 1000, // 5분동안 캐시 유지
  });

  // 카테고리 목록 생성
  const allCategories = useMemo(() => {
    if (!categoriesWithTagsData || isDataError) return [];

    const sortedCate = [...categoriesWithTagsData].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );

    return sortedCate.map((category) => ({
      id: category.categoryId,
      content: category.categoryName,
      isSelected: category.categoryName === selectedCategory,
    }));
  }, [categoriesWithTagsData, isDataError, selectedCategory]);

  const handleCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setVisibleTag(true);
  };

  // 선택된 카테고리의 태그 목록 생성
  const selectedCategoryTags = useMemo(() => {
    if (!categoriesWithTagsData || !selectedCategory) return [];

    const category = categoriesWithTagsData.find((c) => c.categoryName === selectedCategory);

    return category?.tags?.map((tag) => tag.tagName) ?? [];
  }, [categoriesWithTagsData, selectedCategory]);

  // 카테고리별 태그와 suggestionList를 통합하여 관리 (suggestion 태그를 앞에 배치)
  const allTags = useMemo(() => {
    const suggestionTags = suggestionList.map((s) => s.content);
    const fetchedTags = selectedCategoryTags;

    // suggestion 태그 먼저 배치
    const combinedTags = [...suggestionTags, ...fetchedTags];
    const uniqueTags = Array.from(new Set(combinedTags));

    return uniqueTags.map((tag) => {
      const suggestionItem = suggestionList.find((s) => s.content === tag);
      return {
        id: tag,
        content: tag,
        isSelected: selectedTag.includes(tag),
        isSuggestion: !!suggestionItem,
        suggestionId: suggestionItem?.id,
      };
    });
  }, [selectedCategoryTags, selectedTag, suggestionList]);

  const handleTags = (tagId: string, isSuggestion?: boolean, suggestionId?: number) => {
    // suggestionList에서 온 태그인 경우 해당 아이템의 선택 상태도 업데이트
    if (isSuggestion && suggestionId !== undefined) {
      const newSuggestionList = suggestionList.map((s) =>
        s.id === suggestionId ? { ...s, isSelected: !s.isSelected } : s,
      );
      setSuggestionList(newSuggestionList);
    }

    setSelectedTag((prev) => {
      const alreadySelected = prev.includes(tagId);
      const updatedTag = alreadySelected ? prev.filter((tag) => tag !== tagId) : [...prev, tagId];
      setValue('tags', updatedTag, { shouldValidate: true });
      return updatedTag;
    });
  };

  // selectedTag가 렌더링이 끝나면 상태 업데이트 진행
  useEffect(() => {
    setVisibleMemoAndAlarm(selectedTag.length > 0);
    setIsSaveButtonDisabled(selectedTag.length === 0);
  }, [selectedTag, setIsSaveButtonDisabled, setVisibleMemoAndAlarm]);

  // 저장 페이지가 닫힐 때 모든 입력값 초기화
  useEffect(() => {
    // editCate나 editTag가 있으면 수정 모드이므로 초기화하지 않음
    if (!editCate && !editTag && !openCate && !openTag) {
      setSelectedCategory('');
      setSelectedTag([]);

      const hasSelected = suggestionList.some((s) => s.isSelected);
      if (hasSelected) {
        // 선택된 항목만 있을 때만 업데이트
        setSuggestionList(suggestionList.map((s) => ({ ...s, isSelected: false })));
      }
    }
  }, [openCate, openTag, editCate, editTag, setSuggestionList, suggestionList]);

  useEffect(() => {
    if (editCate || editTag) {
      setSuggestionList([]); // 수정 모드에서는 suggestion 초기화
    }
  }, [editCate, editTag, setSuggestionList]);

  const [modalType, setModalType] = useState<ModalType>('category');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isCategoryType = modalType === 'category';

  const handleOpenModal = (type: ModalType) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  useEffect(() => {
    setValue('category', selectedCategory);
    setValue('tags', selectedTag);
  }, [selectedCategory, selectedTag, setValue]);

  const statusWrapperClass =
    'bg-white w-full rounded-xl shadow-[0_2px_7px_rgba(2,34,94,0.1)] p-3 py-6 flex justify-center items-center';

  if (isDataLoading) {
    return (
      <div className={statusWrapperClass}>
        <div className='w-6 h-6 border-4 border-gray-400 border-t-gray-200 rounded-full animate-spin' />
      </div>
    );
  }

  if (isDataError) {
    return <div className={statusWrapperClass + 'text-gray-500'}>정보를 불러오지 못했습니다.</div>;
  }

  return (
    <div className='bg-white w-full rounded-xl shadow-[0_2px_7px_rgba(2,34,94,0.1)] p-3 py-4 flex flex-col gap-3'>
      <div className='flex flex-col gap-1'>
        <p className='text-sm text-stone font-semibold'>
          카테고리<span className='text-[#FF2C3D]'>*</span>
        </p>
        {error.category && <p className='text-xs text-redText'>{error.category?.message}</p>}
      </div>
      <AnimatePresence mode='wait'>
        {openCate && (
          <motion.div
            key='categoryContainer'
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='overflow-hidden'
          >
            <div className='flex flex-wrap gap-2 p-0.5'>
              {allCategories.map((category) => (
                <Chip
                  key={category.id}
                  content={category.content}
                  isSelected={category.isSelected}
                  className='border-lightGrayBlue'
                  selectedClassName='border border-lightGreen bg-lightGreen text-white'
                  onClick={() => handleCategory(category.content)}
                />
              ))}
              <Chip
                key='add-category'
                content={<AddIcon width={16} height={16} fill='balck' />}
                isSelected={false}
                className='border-lightGrayBlue px-2.5'
                onClick={() => handleOpenModal('category')}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <hr className='border-t-2 border-lightGrayBlue my-1' />
      <div className='flex flex-col gap-1'>
        <p className='text-sm text-stone font-semibold'>
          태그<span className='text-[#FF2C3D]'>*</span>
        </p>
        {error.tags && <p className='text-xs text-redText'>{error.tags?.message}</p>}
        {isSuggestionLoading && suggestionList.length === 0 && (
          <p className='text-base text-gray-400'>추천 태그 가져오는 중...</p>
        )}
      </div>
      <AnimatePresence mode='wait'>
        {openTag && (
          <motion.div
            key='tagContainer'
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='overflow-hidden'
          >
            <div className='flex flex-wrap gap-2 p-0.5'>
              {allTags.map((tag) => (
                <Chip
                  key={tag.id}
                  content={tag.content}
                  isSelected={tag.isSelected}
                  className={clsx('border-lightGrayBlue bg-white', tag.isSuggestion && 'text-blue')}
                  selectedClassName='border-1 border-blue bg-blue/10 text-blue'
                  suggestion={tag.isSuggestion}
                  onClick={() => handleTags(tag.id, tag.isSuggestion, tag.suggestionId)}
                />
              ))}
              <Chip
                key='add-tag'
                content={<AddIcon width={16} height={16} fill='balck' />}
                isSelected={false}
                className='border-lightGrayBlue px-2.5'
                onClick={() => handleOpenModal('tag')}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/** 카테고리, 태그 추가 모달 */}
      {isModalOpen && (
        <AddModal
          setIsOpen={setIsModalOpen}
          isCategoryType={isCategoryType}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setSelectedTag={setSelectedTag}
          categoriesWithTagsData={categoriesWithTagsData}
        />
      )}
    </div>
  );
};

export default CategoryTagSelector;
