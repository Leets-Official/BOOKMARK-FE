import { BackArrowIcon, CalendarIcon } from '@/assets';
import DropDown from '@/components/ui/DropDown';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

/*
  DropDown
    - Trigger
    - Menu
      - Item
  으로 구성됨

  ref로 Trigger 컴포넌트 위치 참조

  Trigger : 드롭다운 메뉴 트리거
    - children : 드롭다운 메뉴 트리거 컴포넌트
    - ref : 드롭다운 메뉴 트리거 컴포넌트 참조
  Menu : 드롭다운 메뉴(Trigger를 누르면 나오는 컴포넌트)
    - isOpen : 드롭다운 메뉴 열림 여부
    - position : 드롭다운 메뉴 위치
    - className : 드롭다운 메뉴 컴포넌트 커스터마이징
    - parentRef : 드롭다운 메뉴 트리거 컴포넌트 참조
  Item : 드롭다운 메뉴 안 각 요소
    - onClick : 드롭다운 메뉴 안 각 요소 클릭 시 실행할 함수
    - children : 드롭다운 메뉴 안 각 요소 컴포넌트
 */

const dateList = [
  {
    id: 1,
    date: '내일(금)',
  },
  {
    id: 2,
    date: '2일 뒤(토)',
  },
  {
    id: 3,
    date: '3일 뒤(일)',
  },
  {
    id: 4,
    date: '4일 뒤(월)',
  },
  {
    id: 5,
    date: '5일 뒤(화)',
  },
  {
    id: 6,
    date: '6일 뒤(수)',
  },
  {
    id: 7,
    date: '7일 뒤(목)',
  },
  {
    id: 8,
    date: '8일 뒤(금)',
  },
];

const DropDownExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setIsOpen(false);
  };

  const parentRef = useRef<HTMLButtonElement>(null);

  return (
    <div className='flex flex-row gap-4 w-full p-4 items-center justify-center'>
      <DropDown handleClose={() => setIsOpen(false)}>
        <DropDown.Trigger onClick={() => setIsOpen((prev) => !prev)} ref={parentRef}>
          <div className='w-[150px] bg-white rounded-[8px] flex flex-row gap-2 items-center border border-lightBlueGray cursor-pointer relative p-2 justify-between'>
            <div className='flex flex-row gap-2 items-center'>
              <CalendarIcon width={24} height={24} fill='#090E1D' />
              <p>{selectedDate || '날짜선택'}</p>
            </div>
            <motion.div
              animate={{
                rotate: isOpen ? 90 : -90,
              }}
              transition={{ duration: 0.2 }}
            >
              <BackArrowIcon width={24} height={24} />
            </motion.div>
          </div>
        </DropDown.Trigger>
        <DropDown.Menu
          isOpen={isOpen}
          parentRef={parentRef}
          className='absolute top-full left-0 mt-2 bg-white rounded-[8px] flex flex-col gap-5 border border-lightBlueGray z-[9999] shadow-lg max-h-60 overflow-y-auto p-4 w-[150px]'
        >
          <p className='text-sm text-lightBlueGray font-medium'>날짜</p>
          <div className='flex flex-col p-5 text-gray'>
            {dateList.map((date) => (
              <DropDown.Item key={date.id} onClick={() => handleDateClick(date.date)}>
                {date.date}
              </DropDown.Item>
            ))}
          </div>
        </DropDown.Menu>
      </DropDown>
    </div>
  );
};

export default DropDownExample;
