import { CalendarIcon, ScheduleIcon } from '@/assets';
import { alarmAtAtom, visibleMemoAndAlarmAtom } from '@/atoms';
import DateTimeDropDown from '@/components/layout/dropDown/DateTimeDropDown';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import type { saveSchema } from '@/schema/save';
import type { UseFormSetValue } from 'react-hook-form';
import type z from 'zod';
import { dateOptions, timeOptions } from '@/constants/dateTimeData';
import dayjs from 'dayjs';

interface AlarmProps {
  setValue: UseFormSetValue<z.infer<typeof saveSchema>>;
  editDate?: string;
  editTime?: string;
  // eslint-disable-next-line no-unused-vars
  onDropdownScroll: (isOpen: boolean) => void;
}

const Alarm = ({ editDate, editTime, setValue, onDropdownScroll }: AlarmProps) => {
  const DateTimeVisible = useAtomValue(visibleMemoAndAlarmAtom);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isDateDropDownOpen, setIsDateDropDownOpen] = useState(false);
  const [isTimeDropDownOpen, setIsTimeDropDownOpen] = useState(false);
  const setAlarmAt = useSetAtom(alarmAtAtom);

  const alarmRef = useRef<HTMLDivElement>(null);

  const getDateTime = (dateOption: string, timeOption: string): string | null => {
    if (!dateOption || !timeOption) return null;

    let daysLater: number | null = null;

    if (dateOption.includes('오늘')) {
      daysLater = 0;
    } else {
      const dateMatch = dateOption.match(/(\d+)일 뒤/);
      if (dateMatch) {
        daysLater = parseInt(dateMatch[1], 10);
      }
    }

    const timeMatch = timeOption.match(/(오전|오후)\s*(\d+)시/);
    if (daysLater === null || !timeMatch) return null;

    let hour = parseInt(timeMatch[2], 10);
    const isAM = timeMatch[1] === '오전';

    if (!isAM && hour !== 12) hour += 12;
    if (isAM && hour === 12) hour = 0;

    const combinedDate = dayjs()
      .add(daysLater, 'day')
      .set('hour', hour)
      .set('minute', 0)
      .set('second', 0)
      .set('millisecond', 0);

    return combinedDate.toISOString();
  };

  useEffect(() => {
    const isDropdownOpen = isDateDropDownOpen || isTimeDropDownOpen;
    onDropdownScroll(isDropdownOpen);
  }, [isDateDropDownOpen, isTimeDropDownOpen, onDropdownScroll]);

  const isDropDownCenter = () => {
    if (!alarmRef.current) return false;

    const rect = alarmRef.current.getBoundingClientRect();
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = window.innerHeight / 2;

    // 뷰포트 중앙에서 ±80px 범위 내에 있으면 중앙에 있다고 판단
    return Math.abs(elementCenter - viewportCenter) <= 80;
  };

  const handleOpenDropDown = (type: 'date' | 'time', open: boolean) => {
    const isDate = type === 'date';
    const isCenter = isDropDownCenter();
    const setDropDownOpen = isDate ? setIsDateDropDownOpen : setIsTimeDropDownOpen;

    if (open) {
      if (isCenter)
        setDropDownOpen(true); // 이미 중앙에 있으면 바로 열기
      else {
        alarmRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 중앙에 없으면 먼저 스크롤 후 열기

        setTimeout(() => {
          setDropDownOpen(true);
        }, 150);
      }
    } else setDropDownOpen(false);
  };

  // 수정 모드일 때 초기값 설정
  useEffect(() => {
    if (editDate) setSelectedDate(editDate);
    if (editTime) setSelectedTime(editTime);
  }, [editDate, editTime]);

  useEffect(() => {
    setValue('date', selectedDate);
    setValue('time', selectedTime);

    const isoString = getDateTime(selectedDate, selectedTime);
    if (isoString) {
      setAlarmAt(isoString);
    }
  }, [selectedDate, selectedTime, setAlarmAt, setValue]);

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
