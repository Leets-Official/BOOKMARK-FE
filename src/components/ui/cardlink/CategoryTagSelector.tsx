import { AnimatePresence, motion } from 'framer-motion';
import { Chip, Modal } from '@/components/common';
import { AddIcon } from '@/assets';
import { useEffect, useMemo, useState } from 'react';
import TextField from '@/components/ui/TextField';
import {
  isSaveButtonDisabledAtom,
  suggestionListAtom,
  visibleCategoryAtom,
  visibleMemoAndAlarmAtom,
  visibleTagAtom,
} from '@/atoms';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { dummyCardData } from '@/contants/DummyData';
import clsx from 'clsx';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { createCategory, getCategories } from '@/api/Category';

type ModalType = 'category' | 'tag';

interface ICateTagProps {
  isOpen?: boolean;
  editCate?: string;
  editTag?: string[];
}

interface Category {
  id: number;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}

const CategoryTagSelector = ({ isOpen, editCate, editTag }: ICateTagProps) => {
  const visibleCategory = useAtomValue(visibleCategoryAtom);
  const [visibleTag, setVisibleTag] = useAtom(visibleTagAtom);
  const openCate = isOpen ?? visibleCategory;
  const openTag = isOpen ?? visibleTag;

  const setVisibleMemoAndAlarm = useSetAtom(visibleMemoAndAlarmAtom); // 메모, 알림
  const setIsSaveButtonDisabled = useSetAtom(isSaveButtonDisabledAtom); // 저장하기 버튼

  const [suggestionList, setSuggestionList] = useAtom(suggestionListAtom);

  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(editCate ?? '');
  const [selectedTag, setSelectedTag] = useState<string[]>(editTag ?? []);

  const {
    data: categoriesData,
    isLoading,
    isError,
  } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await getCategories();
      return res.data ?? []; // <- data.data 형태에 맞게 처리
    },
  });

  const allCategories = useMemo(() => {
    if (!categoriesData || isError) return [];

    const sorted = [...categoriesData].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );

    return sorted.map((category) => ({
      id: category.id,
      content: category.categoryName,
      isSelected: category.categoryName === selectedCategory,
    }));
  }, [categoriesData, isError, selectedCategory]);

  const handleCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setVisibleTag(true);
  };

  // 카테고리별 태그와 suggestionList를 통합하여 관리 (suggestion 태그를 앞에 배치)
  const allTags = useMemo(() => {
    const matchedItems = dummyCardData.filter((item) => item.category === selectedCategory);
    const categoryTags = matchedItems.flatMap((item) => item.tags);

    // suggestionList의 태그들을 먼저 추가
    const suggestionTags = suggestionList.map((s) => s.content);

    // 중복 제거 (suggestion 태그가 우선)
    const allTagsArray = [...suggestionTags, ...categoryTags];
    const uniqueTags = Array.from(new Set(allTagsArray));

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
  }, [selectedCategory, selectedTag, suggestionList]);

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
  const [isDisabled, setIsDisabled] = useState(true);
  const isCategoryType = modalType === 'category';

  const handleOpenModal = (type: ModalType) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleConfirmModal = () => {
    if (!content.trim()) return;

    if (isCategoryType) {
      handleAddCategory();
    } else {
      handleAddTag();
    }
    setIsModalOpen(false);
    setContent('');
    setIsDisabled(true);
  };

  const queryClient = useQueryClient();

  const categoryMutation = useMutation({
    mutationFn: async (categoryName: string) => {
      const res = await createCategory(categoryName);
      console.log('🧾 응답 확인:', res);

      const newCategory = res.data?.name ?? categoryName;

      const template = dummyCardData[0];
      dummyCardData.push({
        ...template,
        category: newCategory,
        tags: [],
      });

      setSelectedCategory(newCategory);
      setVisibleTag(true);

      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: () => {
      console.log('카테고리 생성 실패');
    },
  });

  const handleAddCategory = () => {
    console.log('📥 현재 입력된 카테고리:', content);
    categoryMutation.mutate(content);
  };

  const handleAddTag = () => {
    const newTag = content;
    const index = dummyCardData.findIndex((item) => item.category === selectedCategory);
    if (index !== -1) {
      dummyCardData[index].tags = [...(dummyCardData[index].tags || []), newTag];
      setSelectedTag((prev) => [...prev, newTag]);
    }
    setVisibleMemoAndAlarm(true);
  };

  const renderStatus = (message: string) => (
    <div className='bg-white w-full rounded-xl shadow-[0_2px_7px_rgba(2,34,94,0.1)] p-3 py-6 flex justify-center items-center text-gray-500'>
      {message}
    </div>
  );

  if (isLoading) return renderStatus('카테고리를 불러오는 중...');
  if (isError) return renderStatus('카테고리 정보를 불러오지 못했습니다.');

  return (
    <div className='bg-white w-full rounded-xl shadow-[0_2px_7px_rgba(2,34,94,0.1)] p-3 py-4 flex flex-col gap-3'>
      <p className='text-sm text-stone font-semibold'>
        카테고리<span className='text-[#FF2C3D]'>*</span>
      </p>
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
      <p className='text-sm text-stone font-semibold'>
        태그<span className='text-[#FF2C3D]'>*</span>
      </p>
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
      {isModalOpen && (
        <Modal
          title={isCategoryType ? '카테고리 추가' : '태그 추가'}
          confirmLabel='저장하기'
          onCancel={() => {
            setIsModalOpen(false);
            setContent('');
            setIsDisabled(true);
          }}
          onConfirm={() => {
            handleConfirmModal();
          }}
          disabled={isDisabled}
        >
          <TextField
            label=''
            placeholder={
              isCategoryType ? '추가할 카테고리를 입력해주세요' : '추가할 태그을 입력해주세요'
            }
            maxLength={10}
            onChange={(content) => setContent(content)}
            setDisabled={(disabled) => setIsDisabled(disabled)}
          />
        </Modal>
      )}
    </div>
  );
};

export default CategoryTagSelector;
