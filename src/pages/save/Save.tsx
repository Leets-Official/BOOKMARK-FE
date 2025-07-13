import { isMobile } from 'react-device-detect';
import SaveHeader from '@/components/layout/header/SaveHeader';
import { useNavigate } from 'react-router-dom';
import { tv } from 'tailwind-variants';
import { useEffect, useState } from 'react';
import CategoryTagSelector from '@/pages/save/CategoryTagSelector';
import Memo from '@/pages/save/Memo';
import Alarm from '@/pages/save/Alarm';
import Button from '@/components/common/Button';
import LinkField from '@/pages/save/LinkField';
import { getSuggestionTag } from '@/agent/TagAgent';

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
  deleteable?: boolean;
}

const Save = () => {
  const navigate = useNavigate();
  const [link, setLink] = useState('');
  const [memo, setMemo] = useState('');
  // 각 컴포넌트 보여주기 여부
  const [visibleCard, setVisibleCard] = useState(false);
  const [visibleCategory, setVisibleCategory] = useState(false);
  const [visibleTag, setVisibleTag] = useState(false);
  const [visibleMemoAndAlarm, setVisibleMemoAndAlarm] = useState(false);
  // 알림 설정 시간
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  // 저장 버튼(최종 제출 버튼) 비활성화 여부
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);

  // 더미 데이터(카테고리, 태그)
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

  const [suggestionList, setSuggestionList] = useState<ChipProps[]>([]);

  // 더미 데이터(알림 설정 시간)
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

  const handleLink = (v: string) => {
    setLink(v);

    // 임시로 링크가 있으면 카테고리, 태그 보여주기 -> 추후에는 링크가 올바른지 여부 확인 필요
    if (v.length > 0) {
      setVisibleCard(true);
      setVisibleCategory(true);
      // 제목이 있으면 태그 제안 가져오기
      getSuggestionTag(v).then((res) => {
        setSuggestionList(
          res.tags.map((t: string, index: number) => ({
            id: index,
            content: t,
            isSelected: false,
            type: 'suggestion',
          })),
        );
      });
    } else {
      // 링크가 없으면 카테고리, 태그 안보여주기 및 카테고리, 태그 선택 초기화
      setVisibleCard(false);
      setVisibleCategory(false);
      setCategoryList(categoryList.map((c) => ({ ...c, isSelected: false })));
      setTagList(tagList.map((t) => ({ ...t, isSelected: false })));
      setSuggestionList(suggestionList.map((s) => ({ ...s, isSelected: false })));
    }
  };

  // handle function
  const handleMemo = (v: string) => {
    setMemo(v);
  };

  const handleCategory = (id: number) => {
    const newCategoryList = categoryList.map((c) =>
      c.id === id ? { ...c, isSelected: true } : { ...c, isSelected: false },
    );
    setCategoryList(newCategoryList);
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
  const deleteCategory = (id: number) => {
    const newCategoryList = categoryList.filter((c) => c.id !== id);
    setCategoryList(newCategoryList);
  };

  const deleteTag = (id: number) => {
    const newTagList = tagList.filter((t) => t.id !== id);
    setTagList(newTagList);
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
  }, [categoryList]);

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
    }
  }, [tagList, suggestionList]);

  return (
    // PC : 모달형식, 모바일 : 전체화면
    <div className={Overlay({ isMobile })} onClick={!isMobile ? onClick : undefined}>
      <div
        className={Container({ isMobile }) + ' flex flex-col'}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 해더 */}
        <div className='sticky top-0 z-10 w-full'>
          <SaveHeader />
        </div>
        {/* 본문 */}
        <div className='flex-1 overflow-y-auto hide-scrollbar w-full'>
          {/* 카드 모음 */}
          <div className='flex flex-col items-center gap-3 w-full p-4 mt-3'>
            <LinkField visible={visibleCard} link={link} handleLink={handleLink} />
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
              deleteCategory={deleteCategory}
              deleteTag={deleteTag}
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
        {/* 저장 버튼 */}
        <Button
          onClick={() => {
            console.log('저장하기', link, memo, selectedDate, selectedTime);
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
