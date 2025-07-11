import { isMobile } from 'react-device-detect';
import SaveHeader from '@/components/layout/header/SaveHeader';
import { useNavigate } from 'react-router-dom';
import { tv } from 'tailwind-variants';
import { useState } from 'react';
import TextField from '@/components/ui/TextField';
import Button from '@/components/common/Button';
import { Add, Star } from '@/assets';
import Chip from '@/components/common/Chip';
import { AnimatePresence, motion } from 'framer-motion';

const Overlay = tv({
  base: 'fixed inset-0 z-100 flex items-center justify-center overflow-y-scroll',
  variants: {
    isMobile: {
      true: '',
      false: 'bg-black/50',
    },
  },
});

const Container = tv({
  base: 'flex flex-col items-center bg-grayBg',
  variants: {
    isMobile: {
      true: 'h-full w-full',
      false: 'w-[369px] h-[773px] rounded-[30px] border fixed',
    },
  },
});

interface ChipProps {
  id: number;
  content: string;
  isSelected: boolean;
  type: 'category' | 'tag' | 'suggestion';
}

const Save = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [visibleCategory, setVisibleCategory] = useState(false);
  const [visibleTag, setVisibleTag] = useState(false);

  // 더미 데이터
  const [categoryList, setCategoryList] = useState<ChipProps[]>([
    { id: 0, content: '카테고리', isSelected: false, type: 'category' },
    { id: 1, content: '카테고리', isSelected: false, type: 'category' },
    { id: 2, content: '카테고리', isSelected: false, type: 'category' },
    { id: 3, content: '카테고리', isSelected: false, type: 'category' },
    { id: 4, content: '카테고리', isSelected: false, type: 'category' },
    { id: 5, content: '카테고리', isSelected: false, type: 'category' },
    { id: 6, content: '카테고리', isSelected: false, type: 'category' },
    { id: 7, content: '카테고리', isSelected: false, type: 'category' },
    { id: 8, content: '카테고리', isSelected: false, type: 'category' },
    { id: 9, content: '카테고리', isSelected: false, type: 'category' },
    { id: 10, content: '카테고리', isSelected: false, type: 'category' },
  ]);

  const [tagList, setTagList] = useState<ChipProps[]>([
    { id: 0, content: '태그', isSelected: false, type: 'tag' },
    { id: 1, content: '태그', isSelected: false, type: 'tag' },
    { id: 2, content: '태그', isSelected: false, type: 'tag' },
    { id: 3, content: '태그', isSelected: false, type: 'tag' },
    { id: 4, content: '태그', isSelected: false, type: 'tag' },
  ]);

  const [suggestionList, setSuggestionList] = useState<ChipProps[]>([
    { id: 0, content: '제안', isSelected: false, type: 'suggestion' },
    { id: 1, content: '제안', isSelected: false, type: 'suggestion' },
    { id: 2, content: '제안', isSelected: false, type: 'suggestion' },
  ]);

  const onClick = () => {
    navigate(-1);
  };

  const resetChip = () => {
    setCategoryList(categoryList.map((c) => ({ ...c, isSelected: false })));
    setTagList(tagList.map((t) => ({ ...t, isSelected: false })));
    setSuggestionList(suggestionList.map((s) => ({ ...s, isSelected: false })));
  };

  const handleTitle = (v: string) => {
    setTitle(v);

    // 임시로 제목이 있으면 카테고리, 태그 보여주기
    if (v.length > 0) {
      setVisibleCategory(true);
    } else {
      setVisibleCategory(false);
      resetChip();
    }
  };

  const handleCategory = (id: number) => {
    const newCategoryList = categoryList.map((c) =>
      c.id === id ? { ...c, isSelected: !c.isSelected } : c,
    );
    setCategoryList(newCategoryList);

    if (newCategoryList.filter((c) => c.isSelected).length > 0) {
      setVisibleTag(true);
    } else {
      setVisibleTag(false);
      resetChip();
    }
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

  return (
    <div className={Overlay({ isMobile })} onClick={!isMobile ? onClick : undefined}>
      <div className={Container({ isMobile })} onClick={(e) => e.stopPropagation()}>
        <SaveHeader />
        <div className='flex flex-col items-center justify-center gap-3 w-full p-4 pt-13'>
          <div className='bg-white w-full rounded-[12px] shadow p-4'>
            <TextField
              label='링크입력'
              placeholder='제목을 입력해주세요'
              maxLength={10}
              onSubmit={handleTitle}
            />
          </div>
          <div className='bg-white w-full rounded-[12px] shadow p-4'>
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
                          onClick={() => { }}
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
                              onClick={() => { }}
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
                            <div className='flex flex-wrap gap-2 m-0.5'>
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
                            <div className='flex flex-wrap gap-2 m-0.5'>
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
          </div>
          <div className='bg-white w-full rounded-[12px] shadow p-4'>
            <p className='text-sm'>메모</p>
          </div>
          <div className='bg-white w-full rounded-[12px] shadow p-4'>
            <p className='text-sm'>알림</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Save;
