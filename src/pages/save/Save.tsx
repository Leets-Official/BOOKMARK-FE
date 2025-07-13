import { isMobile } from 'react-device-detect';
import SaveHeader from '@/components/layout/header/SaveHeader';
import { useNavigate } from 'react-router-dom';
import { tv } from 'tailwind-variants';
import { useEffect, useState } from 'react';
import TextField from '@/components/ui/TextField';
import CategoryTagSelector from '@/pages/save/CategoryTagSelector';
import Memo from '@/pages/save/Memo';
import Alarm from './Alarm';
import Button from '@/components/common/Button';

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

const SaveButton = tv({
  base: 'bg-blue text-base text-white text-center font-medium mb-8 p-4 w-[90%] rounded-[10px]',
  variants: {
    isDisabled: {
      true: 'bg-lightBlueGray text-veryLightGray',
      false: 'bg-blue text-white cursor-pointer',
    },
  },
});

export interface ChipProps {
  id: number;
  content: string;
  isSelected: boolean;
  type: 'category' | 'tag' | 'suggestion';
}

const Save = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [memo, setMemo] = useState('');
  const [visibleCategory, setVisibleCategory] = useState(false);
  const [visibleTag, setVisibleTag] = useState(false);
  const [visibleMemoAndAlarm, setVisibleMemoAndAlarm] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);

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

  const dateOptions = [
    {
      id: 1,
      name: '내일(금) 8/1',
    },
    {
      id: 2,
      name: '내일 모레(토) 8/2',
    },
    {
      id: 3,
      name: '8/3',
    },
    {
      id: 4,
      name: '8/4',
    },
    {
      id: 5,
      name: '8/5',
    },
    {
      id: 6,
      name: '8/6',
    },
  ];

  const timeOptions = [
    {
      id: 1,
      name: '10:00',
    },
    {
      id: 2,
      name: '11:00',
    },
    {
      id: 3,
      name: '12:00',
    },
    {
      id: 4,
      name: '13:00',
    },
    {
      id: 5,
      name: '14:00',
    },
    {
      id: 6,
      name: '15:00',
    },
  ];

  const onClick = () => {
    navigate(-1);
  };

  const handleTitle = (v: string) => {
    setTitle(v);

    // 임시로 제목이 있으면 카테고리, 태그 보여주기
    if (v.length > 0) {
      setVisibleCategory(true);
    } else {
      setVisibleCategory(false);
      setCategoryList(categoryList.map((c) => ({ ...c, isSelected: false })));
      setTagList(tagList.map((t) => ({ ...t, isSelected: false })));
      setSuggestionList(suggestionList.map((s) => ({ ...s, isSelected: false })));
    }
  };

  const handleMemo = (v: string) => {
    setMemo(v);
  };

  const handleCategory = (id: number) => {
    const newCategoryList = categoryList.map((c) =>
      c.id === id ? { ...c, isSelected: !c.isSelected } : c,
    );
    setCategoryList(newCategoryList);
  };

  const addCategory = (content: string) => {
    setCategoryList([
      ...categoryList,
      { id: categoryList.length, content, isSelected: true, type: 'category' },
    ]);
  };

  const addTag = (content: string) => {
    setTagList([...tagList, { id: tagList.length, content, isSelected: true, type: 'tag' }]);
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
    }
  }, [tagList, suggestionList]);

  useEffect(() => {
    if (categoryList.filter((c) => c.isSelected).length > 0) {
      setVisibleTag(true);
    } else {
      setVisibleTag(false);
      setTagList((prev) => prev.map((t) => ({ ...t, isSelected: false })));
      setSuggestionList((prev) => prev.map((s) => ({ ...s, isSelected: false })));
    }
  }, [categoryList]);

  return (
    <div className={Overlay({ isMobile })} onClick={!isMobile ? onClick : undefined}>
      <div
        className={Container({ isMobile }) + ' flex flex-col'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='sticky top-0 z-10 w-full'>
          <SaveHeader />
        </div>
        <div className='flex-1 overflow-y-auto hide-scrollbar w-full'>
          <div className='flex flex-col items-center gap-3 w-full p-4 pt-13'>
            <div className='bg-white w-full rounded-[12px] shadow p-4'>
              <TextField
                label='링크입력'
                placeholder='제목을 입력해주세요'
                maxLength={10}
                onChange={handleTitle}
                type='reset'
              />
            </div>
            <CategoryTagSelector
              visibleCategory={visibleCategory}
              visibleTag={visibleTag}
              categoryList={categoryList}
              tagList={tagList}
              suggestionList={suggestionList}
              handleCategory={handleCategory}
              handleTag={handleTag}
              handleSuggestion={handleSuggestion}
              addCategory={addCategory}
              addTag={addTag}
            />
            <Memo visible={visibleMemoAndAlarm} handleMemo={handleMemo} />
            <Alarm
              visible={visibleMemoAndAlarm}
              dateOptions={dateOptions}
              timeOptions={timeOptions}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              setSelectedDate={setSelectedDate}
              setSelectedTime={setSelectedTime}
            />
          </div>
        </div>
        {/* <div className='w-full bg-transparent flex items-center justify-center mt-4'></div> */}
        <Button
          onClick={() => {
            console.log('저장하기', title, memo, selectedDate, selectedTime);
          }}
          className={SaveButton({ isDisabled: isSaveButtonDisabled })}
          disabled={isSaveButtonDisabled}
        >
          저장하기
        </Button>
      </div>
    </div>
  );
};

export default Save;
