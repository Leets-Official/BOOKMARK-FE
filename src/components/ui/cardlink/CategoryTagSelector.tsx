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

type ModalType = 'category' | 'tag';

interface ICateTagProps {
  isOpen?: boolean;
  editCate?: string;
  editTag?: string[];
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

  const allCategories = useMemo(() => {
    const categories = [...new Set(dummyCardData.map((item) => item.category))];
    return categories.map((category) => ({
      id: category,
      content: category,
      isSelected: category === selectedCategory,
    }));
  }, [selectedCategory]);

  const handleCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
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
      setSuggestionList(suggestionList.map((s) => ({ ...s, isSelected: false })));
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

  const handleAddCategory = () => {
    const newCategory = content;
    const template = dummyCardData[0];
    dummyCardData.push({
      ...template,
      category: newCategory,
      tags: [],
    });
    setSelectedCategory(newCategory);
    setVisibleTag(true);
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
                  onClick={() => handleCategory(category.id)}
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
