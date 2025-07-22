import { AnimatePresence, motion } from 'framer-motion';
import { Chip, Modal } from '@/components/common';
import { AddIcon } from '@/assets';
import { useMemo, useState } from 'react';
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

  const handleSuggestion = (id: number) => {
    const newSuggestionList = suggestionList.map((s) =>
      s.id === id ? { ...s, isSelected: !s.isSelected } : s,
    );
    setSuggestionList(newSuggestionList);
  };

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

  // 각 카테고리 하위에 있는 모든 태그를 겹치지 않게 가져옴
  const allTags = useMemo(() => {
    const matchedItems = dummyCardData.filter((item) => item.category === selectedCategory);
    const tags = matchedItems.flatMap((item) => item.tags);
    const uniqueTags = Array.from(new Set(tags));
    return uniqueTags.map((tag) => ({
      id: tag,
      content: tag,
      isSelected: selectedTag.includes(tag),
    }));
  }, [selectedCategory, selectedTag]);

  const handleTags = (tagId: string) => {
    setSelectedTag((prev) =>
      prev.includes(tagId) ? prev.filter((tag) => tag !== tagId) : [...prev, tagId],
    );
    setVisibleMemoAndAlarm(true);
    setIsSaveButtonDisabled(false);
  };

  const [modalType, setModalType] = useState<ModalType>('category');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleOpenModal = (type: ModalType) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleConfirmModal = () => {
    if (!content.trim()) return;

    if (modalType === 'category') {
      handleAddCategory();
    } else if (modalType === 'tag') {
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
  };

  const handleAddTag = () => {
    const newTag = content;
    const index = dummyCardData.findIndex((item) => item.category === selectedCategory);
    if (index !== -1) {
      dummyCardData[index].tags = [...(dummyCardData[index].tags || []), newTag];
      setSelectedTag((prev) => [...prev, newTag]);
    }
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
            {' '}
            <div className='flex flex-wrap gap-2 p-0.5'>
              {suggestionList.map((suggestion) => (
                <Chip
                  key={suggestion.id}
                  content={suggestion.content}
                  isSelected={suggestion.isSelected}
                  className='border-lightGrayBlue bg-white'
                  selectedClassName='border-primary bg-lightPrimary'
                  onClick={() => handleSuggestion(suggestion.id)}
                />
              ))}

              {allTags.map((tag) => (
                <Chip
                  key={tag.id}
                  content={tag.content}
                  isSelected={tag.isSelected}
                  className='border-lightGrayBlue'
                  selectedClassName='border-1 border-blue bg-blue/10 text-blue'
                  onClick={() => handleTags(tag.id)}
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
          title={modalType === 'category' ? '카테고리 추가' : '태그 추가'}
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
              modalType === 'category'
                ? '추가할 카테고리를 입력해주세요'
                : '추가할 태그을 입력해주세요'
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
