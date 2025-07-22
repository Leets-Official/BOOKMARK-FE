import { tv } from 'tailwind-variants';
import { isMobile } from 'react-device-detect';
import { useLocation, useNavigate } from 'react-router-dom';
import { useScrollLock } from '@/components/hooks/ScrollLock';
import SaveHeader from '@/components/layout/header/SaveHeader';
import { Button, Chip } from '@/components/common';
import Card from '@/components/ui/card/Card';
import TextField from '@/components/ui/TextField';
import { useMemo, useState } from 'react';
import type { SaveCardProps } from '@/types';
import { dummyCardData } from '@/contants/DummyData';
import { AddIcon, CalendarIcon, ScheduleIcon } from '@/assets';
import DateTimeDropDown from '@/components/layout/dropDown/DateTimeDropDown';
import { useAtomValue } from 'jotai';
import { dateOptionsAtom, timeOptionsAtom } from '@/atoms';

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
  const location = useLocation();
  const navigate = useNavigate();
  const onPrev = () => navigate(-1);
  const editData: SaveCardProps = location.state?.editData;

  const [link, setLink] = useState(
    `https://example.com/${editData.title.replace(/\s+/g, '-').toLowerCase()}`,
  );
  const [memo, setMemo] = useState(`${editData.memo}`);

  const [selectedCategory, setSelectedCategory] = useState(editData.category);
  const [selectedTag, setSelectedTag] = useState<string[]>(editData.tags ?? []);

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

  const dateOptions = useAtomValue(dateOptionsAtom);
  const timeOptions = useAtomValue(timeOptionsAtom);
  const [tempDate, setTempDate] = useState('');
  const [tempTime, setTempTime] = useState('');
  const [isDateDropDownOpen, setIsDateDropDownOpen] = useState(false);
  const [isTimeDropDownOpen, setIsTimeDropDownOpen] = useState(false);

  useScrollLock(!isMobile);
  return (
    <div className={Overlay({ isMobile })} onClick={!isMobile ? onPrev : undefined}>
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
              <Card
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
                  onClick={() => {
                    // 나중에 카테고리 추가 기능 넣을 자리
                    console.log('카테고리 추가 버튼 클릭됨');
                  }}
                />
              </div>
              <hr className='border-t-2 border-lightGrayBlue my-1' />
              <p className='text-sm text-stone font-semibold'>
                태그<span className='text-[#FF2C3D]'>*</span>
              </p>
              <div className='flex flex-wrap gap-2 p-0.5'>
                {allTags.map((category) => (
                  <Chip
                    key={category.id}
                    content={category.content}
                    isSelected={category.isSelected}
                    className='border-lightGrayBlue'
                    selectedClassName='border-1 border-blue bg-blue/10 text-blue'
                    onClick={() => handleTags(category.id)}
                  />
                ))}
                <Chip
                  key='add-category'
                  content={<AddIcon width={16} height={16} fill='balck' />}
                  isSelected={false}
                  className='border-lightGrayBlue px-2.5'
                  onClick={() => {
                    // 나중에 카테고리 추가 기능 넣을 자리
                    console.log('카테고리 추가 버튼 클릭됨');
                  }}
                />
              </div>
            </div>
            <div className='bg-white w-full rounded-xl shadow-[0_2px_7px_rgba(2,34,94,0.1)] px-3 pt-2 pb-5'>
              <TextField
                label='메모'
                placeholder='메모를 입력해주세요'
                maxLength={50}
                onChange={setMemo}
                initialValue={memo}
                buttonVisible={false}
              />
            </div>
            <div className='bg-white w-full rounded-xl shadow-[0_2px_7px_rgba(2,34,94,0.1)] px-3 pt-2 pb-5 mb-60'>
              <div className='flex flex-col gap-2 mt-2'>
                <p className='text-sm font-semibold text-stone'>알림</p>
                {/* 날짜 드롭다운 */}
                <div className='flex flex-row gap-2 mt-2'>
                  <DateTimeDropDown
                    icon={<CalendarIcon width={24} height={24} />}
                    options={dateOptions}
                    title='날짜선택'
                    subTitle='날짜'
                    selectedOption={tempDate}
                    setSelectedOption={setTempDate}
                    isOpen={isDateDropDownOpen}
                    setIsOpen={setIsDateDropDownOpen}
                  />
                  {/* 시간 드롭다운 */}
                  <DateTimeDropDown
                    icon={<ScheduleIcon width={24} height={24} />}
                    options={timeOptions}
                    title='시간선택'
                    subTitle='시간'
                    selectedOption={tempTime}
                    setSelectedOption={setTempTime}
                    isOpen={isTimeDropDownOpen}
                    setIsOpen={setIsTimeDropDownOpen}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button
          onClick={() => {
            console.log('수정 완료');
            onPrev();
          }}
          className='bg-blue text-base text-white text-center font-medium mb-8 p-4 w-[90%] rounded-[10px]'
        >
          수정 완료
        </Button>
      </div>
    </div>
  );
};

export default Edit;
