import { AnimatePresence, motion } from 'framer-motion';
import Button from '@/components/common/Button';
import { Add, Star } from '@/assets';
import Chip from '@/components/common/Chip';
import { useEffect, useState } from 'react';
import Modal from '@/components/common/Modal';
import TextField from '@/components/ui/TextField';
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

  const addTag = (content: string) => {
    if (content === '') return;
    setTagList([
      ...tagList,
      { id: tagList.length, content, isSelected: true, type: 'tag', deleteable: true },
    ]);
  };

  // delete function
  const deleteItem = (id: number, type: ModalType) => {
    if (type === 'category') {
      const newCategoryList = categoryList.filter((c) => c.id !== id);
      setCategoryList(newCategoryList);
    } else {
      const newTagList = tagList.filter((t) => t.id !== id);
      setTagList(newTagList);
    }
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

  const handleTagModal = (type: 'onConfirm' | 'onSubmit') => {
    setContent(content);
    addTag(content);
    setContent('');
    if (type === 'onConfirm') {
      closeModal();
    }
  };

  return (
    <div className='bg-white w-full rounded-[12px] shadow p-2'>
      <div className='flex flex-col gap-2 pt-1 origin-top'>
        <div className='flex flex-row items-center justify-between mb-1'>
          <AnimatePresence mode='wait'>
            {visibleCategory ? (
              <>
                {/* 카테고리를 선택할 수 있을 떄 보일 컴포넌트 */}
                <motion.p
                  key='category-with-file'
                  className='text-sm'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  카테고리(파일)
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <Button
                    icon={<Add width={18} height={18} fill='#397FFF' />}
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
                className='text-sm'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: 'easeInOut' }}
              >
                카테고리, 태그
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
                    id={'category' + category.id}
                    content={category.content}
                    isSelected={category.isSelected}
                    type={category.type}
                    onClick={() => handleCategory(category.id)}
                  />
                ))}
              </div>
              {/* 태그 영역 */}
              <div className='flex flex-col gap-2 bg-grayBg rounded-[12px] p-2 pr-2 pt-1 mt-3 origin-top'>
                <div className='flex flex-row items-center justify-between mb-1 mt-2 pl-1'>
                  <p className='text-sm'>태그</p>
                  {visibleTag && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <Button
                        icon={<Add width={18} height={18} fill='#397FFF' />}
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
                    <div className='flex flex-wrap gap-2 m-1 max-h-[200px] overflow-y-auto'>
                      {tagList.map((tag) => (
                        <Chip
                          key={tag.id}
                          id={'tag' + tag.id}
                          content={tag.content}
                          isSelected={tag.isSelected}
                          type={tag.type}
                          onClick={() => handleTag(tag.id)}
                        />
                      ))}
                    </div>
                    <div className='flex flex-row items-center mb-1 mt-2 pl-1 gap-1'>
                      <Star width={18} height={18} fill='#007AFF' />
                      <p className='text-sm text-primary'>제안</p>
                    </div>
                    <div className='flex flex-wrap gap-2 m-1'>
                      {suggestionList.map((suggestion) => (
                        <Chip
                          key={suggestion.id}
                          id={'suggestion' + suggestion.id}
                          content={suggestion.content}
                          isSelected={suggestion.isSelected}
                          type={suggestion.type}
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
            modalOpenType === 'category' ? handleCategoryModal() : handleTagModal('onConfirm');
          }}
          disabled={disabledSubmitButton}
        >
          <TextField
            label='카테고리'
            placeholder='추가할 카테고리를 입력해주세요.'
            maxLength={10}
            onChange={(content) => {
              setContent(content);
            }}
            onSubmit={() => {
              modalOpenType === 'category' ? undefined : handleTagModal('onSubmit');
            }}
            setDisabled={setDisabledSubmitButton}
            isCreateType={modalOpenType === 'category' ? false : true}
          />
          <div className='flex flex-wrap gap-2 m-0.5 max-h-[200px] overflow-y-auto'>
            {modalOpenType === 'tag' &&
              tagList.map(
                (item) =>
                  item.isSelected && (
                    <Chip
                      key={item.id}
                      id={'Selected category' + item.id}
                      content={item.content}
                      isSelected={item.isSelected}
                      type={item.type}
                      onClick={() => handleTag(item.id)}
                      disabled={true}
                      onDelete={item.deleteable ? () => deleteItem(item.id, 'tag') : undefined}
                    />
                  ),
              )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CategoryTagSelector;
