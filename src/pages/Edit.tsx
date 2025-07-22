import { tv } from 'tailwind-variants';
import { isMobile } from 'react-device-detect';
import { useLocation, useNavigate } from 'react-router-dom';
import { useScrollLock } from '@/components/hooks/ScrollLock';
import SaveHeader from '@/components/layout/header/SaveHeader';
import { Button, Chip, Modal } from '@/components/common';
import LinkCard from '@/components/ui/card/LinkCard';
import TextField from '@/components/ui/TextField';
import { useMemo, useState } from 'react';
import type { SaveCardProps } from '@/types';
import { dummyCardData } from '@/contants/DummyData';
import { AddIcon } from '@/assets';
import { Alarm, Memo } from '@/components/ui/cardlink';

type ModalType = 'category' | 'tag';

const Overlay = tv({
  base: 'fixed inset-0 z-100 flex items-center justify-center',
  variants: {
    isMobile: {
      true: '',
      false: 'bg-black/50',
    },
  },
});

const Container = tv({
  base: 'flex flex-col items-center bg-grayBg overflow-y-auto hide-scrollbar',
  variants: {
    isMobile: {
      true: 'h-full w-full',
      false: 'w-[369px] h-[773px] rounded-[30px] border fixed',
    },
  },
});

const Edit = () => {
  useScrollLock(!isMobile);
  const location = useLocation();
  const navigate = useNavigate();
  const onPrev = () => navigate(-1);
  const editData: SaveCardProps = location.state?.editData; // Home의 SaveCard로 부터 링크 데이터를 가져옴

  const [link, setLink] = useState(
    `https://example.com/${editData.title.replace(/\s+/g, '-').toLowerCase()}`,
  );
  const [cardmemo, setCardMemo] = useState(`${editData.memo}`);
  const [content, setContent] = useState('');

  const [selectedCategory, setSelectedCategory] = useState(editData.category);
  const [selectedTag, setSelectedTag] = useState<string[]>(editData.tags ?? []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [modalType, setModalType] = useState<ModalType>('category');

  // 겹치지 않는 모든 카테고리를 가져옴
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
  };

  const handleAddCategory = () => {
    const newCategory = content;
    dummyCardData.push({
      ...editData,
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

  useScrollLock(!isMobile || !isModalOpen);

  return (
    <div className={Overlay({ isMobile })} onClick={!isMobile && !isModalOpen ? onPrev : undefined}>
      <div className={Container({ isMobile })} onClick={(e) => e.stopPropagation()}>
        <SaveHeader title='링크 수정' />
        <div className='flex-1 overflow-y-auto hide-scrollbar w-full'>
          {/* 카드 모음 */}
          <div className='flex flex-col items-center gap-3 w-full p-4 mt-3'>
            {/**링크 필드 */}
            <div className='bg-white w-full rounded-xl shadow-[0_2px_7px_rgba(2,34,94,0.1)] px-3 pb-4'>
              <TextField
                label={
                  <div className='pt-2'>
                    링크입력<span className='text-[#FF2C3D]'>*</span>
                  </div>
                }
                placeholder='제목을 입력해주세요'
                onChange={setLink}
                initialValue={link}
              />
              <hr className='border-t-2 border-lightGrayBlue my-4' />
              <LinkCard
                title={editData.title}
                platform={editData.platform}
                isLoading={false}
                editable={true}
                image={editData.image}
              />
            </div>
            {/**카테고리 & 태그 */}
            <div className='bg-white w-full rounded-xl shadow-[0_2px_7px_rgba(2,34,94,0.1)] p-3 py-4 flex flex-col gap-3'>
              <p className='text-sm text-stone font-semibold'>
                카테고리<span className='text-[#FF2C3D]'>*</span>
              </p>
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
              <hr className='border-t-2 border-lightGrayBlue my-1' />
              <p className='text-sm text-stone font-semibold'>
                태그<span className='text-[#FF2C3D]'>*</span>
              </p>
              <div className='flex flex-wrap gap-2 p-0.5'>
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
            </div>
            {/**메모  */}
            <Memo setCardMemo={setCardMemo} cardMemo={cardmemo} isOpen={true} />
            <Alarm isOpen={true} />
          </div>
        </div>
        <Button
          onClick={() => {
            console.log('수정 완료');
            onPrev();
          }}
          className='bg-blue text-base text-white text-center font-medium mb-8 p-4 w-[90%] rounded-[10px] hover:brightness-90'
        >
          수정 완료
        </Button>
      </div>
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
            label='이름'
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

export default Edit;
