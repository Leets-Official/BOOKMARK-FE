import { AnimatePresence, motion } from 'framer-motion';
import Button from '@/components/common/Button';
import { AddIcon, StarIcon } from '@/assets';
import Chip from '@/components/common/Chip';
import { useEffect, useState } from 'react';
import Modal from '@/components/common/Modal';
import TextField from '@/components/ui/TextField';
import type { ChipProps } from '@/types';
import {
  categoryListAtom,
  isSaveButtonDisabledAtom,
  memoAtom,
  selectedDateAtom,
  selectedTimeAtom,
  suggestionListAtom,
  tagListAtom,
  visibleCategoryAtom,
  visibleMemoAndAlarmAtom,
  visibleTagAtom,
} from '@/atoms';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

type ModalType = 'category' | 'tag' | null;

const CategoryTagSelector = () => {
  const visibleCategory = useAtomValue(visibleCategoryAtom);
  const [visibleTag, setVisibleTag] = useAtom(visibleTagAtom);
  const setVisibleMemoAndAlarm = useSetAtom(visibleMemoAndAlarmAtom);
  const setIsSaveButtonDisabled = useSetAtom(isSaveButtonDisabledAtom);
  const setMemo = useSetAtom(memoAtom);
  const setSelectedDate = useSetAtom(selectedDateAtom);
  const setSelectedTime = useSetAtom(selectedTimeAtom);

  const [categoryList, setCategoryList] = useAtom(categoryListAtom);
  const [tagList, setTagList] = useAtom(tagListAtom);

  // 태그 추가 시 모달에 임시로 저장할 태그 리스트
  const [tempTagList, setTempTagList] = useState<ChipProps[]>([]);

  const [suggestionList, setSuggestionList] = useAtom(suggestionListAtom);

  const [content, setContent] = useState('');
  const [modalOpenType, setModalOpenType] = useState<ModalType>(null);

  const [disabledSubmitButton, setDisabledSubmitButton] = useState(true);

  const handleCategory = (id: number) => {
    const newCategoryList = categoryList.map((c) =>
      c.id === id ? { ...c, isSelected: true } : { ...c, isSelected: false },
    );
    setCategoryList(newCategoryList);
    setVisibleTag(true);
  };

  const handleTag = (id: number) => {
    const newTagList = tagList.map((t) => (t.id === id ? { ...t, isSelected: !t.isSelected } : t));
    setTagList(newTagList);
  };

  const handleSuggestion = (id: number) => {
    const newSuggestionList = suggestionList.map((s) =>
      s.id === id ? { ...s, isSelected: !s.isSelected } : s,
    );
    setSuggestionList(newSuggestionList);
  };

  // add function
  const addCategory = (content: string) => {
    if (content === '') return;

    const newCategoryList = categoryList.map((c) => ({ ...c, isSelected: false }));
    setCategoryList([
      ...newCategoryList,
      { id: categoryList.length, content, isSelected: true, type: 'category', deleteable: true },
    ]);
  };

  const addTag = () => {
    if (tempTagList.length === 0) return;
    // id 중복 방지를 위한 id 초기화
    const mergedList = [...tagList, ...tempTagList].map((item, idx) => ({
      ...item,
      id: idx,
    }));
    setTagList(mergedList);
    setTempTagList([]);
  };

  const addTempTag = (content: string) => {
    if (content === '') return;
    // id 중복 방지를 위한 id 초기화
    const newTempTagList = tempTagList.map((t, index) => ({
      ...t,
      id: index,
      isSelected: true,
      deleteable: true,
    }));
    setTempTagList([
      ...newTempTagList,
      {
        id: newTempTagList.length,
        content,
        type: 'tag',
        isSelected: true,
        deleteable: true,
        isNew: true,
      },
    ]);
  };

  // delete function
  const deleteTempTag = (id: number) => {
    const newTempTagList = tempTagList.filter((t) => t.id !== id);
    setTempTagList(newTempTagList);
  };

  // 카테고리가 선택되면 태그 보여주기
  useEffect(() => {
    if (categoryList.filter((c) => c.isSelected).length > 0) {
      setVisibleTag(true);
    } else {
      setVisibleTag(false);
      setTagList((prev) => prev.map((t) => ({ ...t, isSelected: false })));
      setSuggestionList((prev) => prev.map((s) => ({ ...s, isSelected: false })));
    }
  }, [categoryList, setVisibleTag, setTagList, setSuggestionList]);

  // 태그 또는 제안 태그가 선택되면 메모 및 알림 보여주기
  useEffect(() => {
    if (
      tagList.filter((t) => t.isSelected).length > 0 ||
      suggestionList.filter((s) => s.isSelected).length > 0
    ) {
      setVisibleMemoAndAlarm(true);
      setIsSaveButtonDisabled(false);
    } else {
      setVisibleMemoAndAlarm(false);
      setIsSaveButtonDisabled(true);
      setMemo('');
      setSelectedDate('');
      setSelectedTime('');
    }
  }, [
    tagList,
    suggestionList,
    setVisibleMemoAndAlarm,
    setIsSaveButtonDisabled,
    setMemo,
    setSelectedDate,
    setSelectedTime,
  ]);

  const openModal = (type: ModalType) => {
    setModalOpenType(type);
    if (type === 'tag') {
      // 새로 만들어진 태그를 다시 임시 태그 리스트에 추가
      const newTempTagList = tagList.filter((t) => t.isNew);
      setTempTagList(newTempTagList);
      const newTagList = tagList.filter((t) => !t.isNew);
      setTagList(newTagList);
    }
  };

  const closeModal = () => {
    setModalOpenType(null);
    setDisabledSubmitButton(true);
  };

  const handleCategoryModal = () => {
    addCategory(content);
    setContent('');
    closeModal();
  };

  const tagModalSubmit = () => {
    setContent(content);
    addTempTag(content);
    setContent('');
  };

  const tagModalConfirm = () => {
    addTag();
    closeModal();
  };

  return (
    <div className='bg-white w-full rounded-[12px] shadow p-2'>
      <div className='flex flex-col gap-2 pt-2 origin-top'>
        <div className='flex flex-row items-center justify-between mb-1'>
          <AnimatePresence mode='wait'>
            {visibleCategory ? (
              <>
                {/* 카테고리를 선택할 수 있을 떄 보일 컴포넌트 */}
                <motion.div
                  key='category-with-file'
                  className='text-sm font-semibold flex flex-row items-center'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <p className='text-grayText'>카테고리</p>
                  <p className='text-redText'>*</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <Button
                    icon={<AddIcon width={18} height={18} fill='#397FFF' />}
                    onClick={() => openModal('category')}
                    className='cursor-pointer text-xs font-semibold text-primary flex items-center gap-1'
                  >
                    카테고리 추가
                  </Button>
                </motion.div>
              </>
            ) : (
              // 카테고리를 선택할 수 없을 떄 보일 컴포넌트
              <motion.p
                key='category-only'
                className='text-sm font-semibold text-grayText'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: 'easeInOut' }}
              >
                카테고리, 태그
                <span className='text-redText'>*</span>
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className='flex flex-col gap-2 pt-1 origin-top'>
        <AnimatePresence>
          {visibleCategory && (
            <motion.div
              key='categoryContainer'
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className='overflow-hidden'
            >
              <div className='flex flex-wrap gap-2 m-1'>
                {categoryList.map((category) => (
                  <Chip
                    key={category.id}
                    content={category.content}
                    isSelected={category.isSelected}
                    className='border-grayText'
                    selectedClassName='bg-lightGray'
                    onClick={() => handleCategory(category.id)}
                  />
                ))}
              </div>
              {/* 태그 영역 */}
              <div className='flex flex-col gap-2 bg-grayBg rounded-[12px] p-2 pr-2 pt-1 mt-3 origin-top'>
                <div className='flex flex-row items-center justify-between mb-1 mt-2 pl-1'>
                  <div className='flex flex-row items-center text-sm font-semibold '>
                    <p className='text-grayText'>태그</p>
                    <p className='text-redText'>*</p>
                  </div>
                  {visibleTag && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <Button
                        icon={<AddIcon width={18} height={18} fill='#397FFF' />}
                        onClick={() => openModal('tag')}
                        className='cursor-pointer text-xs font-semibold text-primary flex items-center gap-1'
                      >
                        태그 추가
                      </Button>
                    </motion.div>
                  )}
                </div>
                {/* 태그를 선택할 수 있을 떄 보일 컴포넌트 */}
                {visibleTag && (
                  <motion.div
                    key='tagContainer'
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className='overflow-hidden'
                  >
                    <div className='flex flex-wrap gap-2 m-1 max-h-[200px] overflow-y-auto hide-scrollbar p-1'>
                      {tagList.map((tag) => (
                        <Chip
                          key={tag.id}
                          content={tag.content}
                          isSelected={tag.isSelected}
                          className='border-lightGrayBlue bg-white'
                          selectedClassName='bg-lightGray'
                          onClick={() => handleTag(tag.id)}
                        />
                      ))}
                    </div>
                    <div className='flex flex-row items-center mb-1 mt-2 pl-1 gap-1'>
                      <StarIcon width={18} height={18} stroke='#007AFF' />
                      <p className='text-sm text-primary'>추천</p>
                    </div>
                    <div className='flex flex-wrap gap-2 m-1'>
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
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 카테고리, 태그 추가 모달 */}
      {modalOpenType && (
        <Modal
          title={modalOpenType === 'category' ? '새 카테고리 추가' : '태그 추가'}
          onCancel={() => {
            closeModal();
          }}
          onConfirm={() => {
            modalOpenType === 'category' ? handleCategoryModal() : tagModalConfirm();
          }}
          disabled={modalOpenType === 'category' ? disabledSubmitButton : tempTagList.length === 0}
        >
          <TextField
            label='카테고리'
            placeholder='추가할 카테고리를 입력해주세요.'
            maxLength={10}
            onChange={(content) => {
              setContent(content);
            }}
            onSubmit={() => {
              modalOpenType === 'category' ? undefined : tagModalSubmit();
            }}
            setDisabled={setDisabledSubmitButton}
            isCreateType={modalOpenType === 'category' ? false : true}
          />
          <div className='flex flex-wrap gap-2 m-0.5 max-h-[200px] overflow-y-auto hide-scrollbar'>
            {modalOpenType === 'tag' &&
              tempTagList.map((item) => (
                <Chip
                  key={item.id}
                  content={item.content}
                  isSelected={item.isSelected}
                  className='border-lightGrayBlue bg-white'
                  selectedClassName='bg-lightGray'
                  onClick={() => handleTag(item.id)}
                  disabled={true}
                  onDelete={item.deleteable ? () => deleteTempTag(item.id) : undefined}
                />
              ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CategoryTagSelector;
