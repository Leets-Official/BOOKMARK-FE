import { AnimatePresence, motion } from 'framer-motion';
import Button from '@/components/common/Button';
import { Add, Star } from '@/assets';
import Chip from '@/components/common/Chip';
import type { ChipProps } from '@/pages/save/Save';
import { useState } from 'react';
import Modal from '@/components/common/Modal';
import TextField from '@/components/ui/TextField';

interface CategoryTagSelectorProps {
  visibleCategory: boolean;
  visibleTag: boolean;
  categoryList: ChipProps[];
  tagList: ChipProps[];
  suggestionList: ChipProps[];
  // eslint-disable-next-line no-unused-vars
  handleCategory: (id: number) => void;
  // eslint-disable-next-line no-unused-vars
  handleTag: (id: number) => void;
  // eslint-disable-next-line no-unused-vars
  handleSuggestion: (id: number) => void;
  // eslint-disable-next-line no-unused-vars
  addCategory: (content: string) => void;
  // eslint-disable-next-line no-unused-vars
  addTag: (content: string) => void;
}

const CategoryTagSelector = ({
  visibleCategory,
  visibleTag,
  categoryList,
  tagList,
  suggestionList,
  handleCategory,
  handleTag,
  handleSuggestion,
  addCategory,
  addTag,
}: CategoryTagSelectorProps) => {
  const [categoryContent, setCategoryContent] = useState('');
  const [tagContent, setTagContent] = useState('');

  const [isOpenCategoryModal, setIsOpenCategoryModal] = useState(false);
  const [isOpenTagModal, setIsOpenTagModal] = useState(false);

  const handleOpenCategoryModal = () => {
    setIsOpenCategoryModal((prev) => !prev);
  };
  const handleOpenTagModal = () => {
    setIsOpenTagModal((prev) => !prev);
  };

  const handleCategoryContent = (content: string) => {
    setCategoryContent(content);
  };
  const handleTagContent = (content: string) => {
    setTagContent(content);
    addTag(content);
    setTagContent('');
  };

  return (
    <div className='bg-white w-full rounded-[12px] shadow p-2'>
      <div className='flex flex-col gap-2 pt-1 origin-top'>
        <div className='flex flex-row items-center justify-between mb-1'>
          <AnimatePresence mode='wait'>
            {visibleCategory ? (
              <>
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
                    onClick={handleOpenCategoryModal}
                    className='cursor-pointer text-xs font-semibold text-primary flex items-center gap-1'
                  >
                    카테고리 추가
                  </Button>
                </motion.div>
              </>
            ) : (
              <motion.p
                key='category-only'
                className='text-sm'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
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
                <AnimatePresence>
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
                </AnimatePresence>
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
                        onClick={handleOpenTagModal}
                        className='cursor-pointer text-xs font-semibold text-primary flex items-center gap-1'
                      >
                        태그 추가
                      </Button>
                    </motion.div>
                  )}
                </div>
                <AnimatePresence>
                  {visibleTag && (
                    <motion.div
                      key='tagContainer'
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className='overflow-hidden'
                    >
                      <div className='flex flex-wrap gap-2 m-1'>
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
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isOpenCategoryModal && (
        <Modal
          title='새 카테고리 추가'
          onCancel={() => {
            setIsOpenCategoryModal(false);
          }}
          onConfirm={() => {
            addCategory(categoryContent);
            setIsOpenCategoryModal(false);
          }}
          disabled={categoryContent === '' || categoryContent === null}
        >
          <TextField
            label='카테고리'
            placeholder='추가할 카테고리를 입력해주세요.'
            maxLength={10}
            onChange={(content) => {
              handleCategoryContent(content);
            }}
            type='reset'
          />
          <div className='flex flex-wrap gap-2 m-0.5'>
            {categoryList.map(
              (category) =>
                category.isSelected && (
                  <Chip
                    key={category.id}
                    id={'Selected category' + category.id}
                    content={category.content}
                    isSelected={category.isSelected}
                    type={category.type}
                    onClick={() => handleCategory(category.id)}
                    disabled={true}
                  />
                ),
            )}
          </div>
        </Modal>
      )}

      {isOpenTagModal && (
        <Modal
          title='태그 추가'
          onCancel={() => {
            setIsOpenTagModal(false);
          }}
          onConfirm={() => {
            addTag(tagContent);
            setIsOpenTagModal(false);
          }}
          disabled={tagContent === '' || tagContent === null}
        >
          <TextField
            label='태그'
            placeholder='추가할 태그를 입력해주세요.'
            maxLength={10}
            onChange={(content) => {
              setTagContent(content);
            }}
            onSubmit={(content) => {
              handleTagContent(content);
            }}
            type='create'
          />
          <div className='flex flex-wrap gap-2 m-0.5'>
            {tagList.map(
              (tag) =>
                tag.isSelected && (
                  <Chip
                    key={tag.id}
                    id={'Selected tag' + tag.id}
                    content={tag.content}
                    isSelected={tag.isSelected}
                    type={tag.type}
                    onClick={() => handleTag(tag.id)}
                    disabled={true}
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
