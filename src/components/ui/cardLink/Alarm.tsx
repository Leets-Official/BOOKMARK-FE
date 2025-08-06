import { CalendarIcon, ScheduleIcon } from '@/assets';
import { visibleMemoAndAlarmAtom } from '@/atoms';
import DateTimeDropDown from '@/components/layout/dropDown/DateTimeDropDown';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import type { saveSchema } from '@/schema/save';
import type { UseFormSetValue } from 'react-hook-form';
import type z from 'zod';
import { dateOptions, timeOptions } from '@/hooks/date/dateTimeData';
import { formatDate, formatTime } from '@/hooks/date/formatVisableDate';

interface AlarmProps {
  setValue: UseFormSetValue<z.infer<typeof saveSchema>>;
  editDate?: string;
  editTime?: string;
  // eslint-disable-next-line no-unused-vars
  onDropdownScroll: (isOpen: boolean) => void;
}

const Alarm = ({ editDate, editTime, setValue, onDropdownScroll }: AlarmProps) => {
  const DateTimeVisible = useAtomValue(visibleMemoAndAlarmAtom);
  const [selectedDate, setSelectedDate] = useState({
    id: 0,
    content: '',
    visableContent: '날짜 선택',
  });
  const [selectedTime, setSelectedTime] = useState({
    id: 0,
    content: '',
    visableContent: '시간 선택',
  });
  const [isDateDropDownOpen, setIsDateDropDownOpen] = useState(false);
  const [isTimeDropDownOpen, setIsTimeDropDownOpen] = useState(false);

  const alarmRef = useRef<HTMLDivElement>(null);

  const isDropDownCenter = () => {
    if (!alarmRef.current) return false;
    const rect = alarmRef.current.getBoundingClientRect();
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = window.innerHeight / 2;
    return Math.abs(elementCenter - viewportCenter) <= 80;
  };

  const handleOpenDropDown = (type: 'date' | 'time', open: boolean) => {
    const isDate = type === 'date';
    const isCenter = isDropDownCenter();
    const setDropDownOpen = isDate ? setIsDateDropDownOpen : setIsTimeDropDownOpen;

    if (open) {
      if (isCenter) {
        setDropDownOpen(true);
      } else {
        alarmRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
          setDropDownOpen(true);
        }, 150);
      }
    } else {
      setDropDownOpen(false);
    }
  };

  // 🔁 DropDown 열림 상태가 부모에게 전달되도록
  useEffect(() => {
    const isDropdownOpen = isDateDropDownOpen || isTimeDropDownOpen;
    onDropdownScroll(isDropdownOpen);
  }, [isDateDropDownOpen, isTimeDropDownOpen, onDropdownScroll]);

  useEffect(() => {
    // editDate/editTime이 우선이므로 이 값이 있으면 설정
    if (editDate && editTime) {
      setSelectedDate({ id: 0, content: '', visableContent: formatDate(editDate) });
      setSelectedTime({ id: 0, content: '', visableContent: formatTime(editTime) });

      // 수정 모드일 경우 기존 값 초기화
      setValue('date', '');
      setValue('time', '');
      return;
    }
  }, [editDate, editTime, setValue]);

  useEffect(() => {
    setValue('date', selectedDate.content);
    setValue('time', selectedTime.content);
  }, [selectedDate, selectedTime, setValue]);

  return (
    <div
      className='bg-white w-full rounded-xl shadow-[0_2px_7px_rgba(2,34,94,0.1)] px-3 sm:px-6 pt-2 pb-5 mb-60'
      ref={alarmRef}
    >
      <p className='text-sm font-semibold text-stone mt-2'>알림</p>
      <AnimatePresence>
        {DateTimeVisible && (
          <motion.div
            key='alarmContainer'
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='overflow-hidden'
          >
            <div className='flex flex-row gap-2 mt-4'>
              <DateTimeDropDown
                icon={<CalendarIcon width={22} height={22} />}
                options={dateOptions}
                title='날짜 선택'
                subTitle='날짜'
                selectedOption={selectedDate}
                setSelectedOption={setSelectedDate}
                isOpen={isDateDropDownOpen}
                setIsOpen={(open) => handleOpenDropDown('date', open)}
              />
              <DateTimeDropDown
                icon={<ScheduleIcon width={22} height={22} />}
                options={timeOptions}
                title='시간선택'
                subTitle='시간'
                selectedOption={selectedTime}
                setSelectedOption={setSelectedTime}
                isOpen={isTimeDropDownOpen}
                setIsOpen={(open) => handleOpenDropDown('time', open)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Alarm;
