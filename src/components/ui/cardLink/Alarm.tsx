import { CalendarIcon, ScheduleIcon } from '@/assets';
import { dateOptionsAtom, timeOptionsAtom, visibleMemoAndAlarmAtom } from '@/atoms';
import DateTimeDropDown from '@/components/layout/dropDown/DateTimeDropDown';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import type { saveSchema } from '@/schema/save';
import type { UseFormSetValue } from 'react-hook-form';
import type z from 'zod';

interface AlarmProps {
  setValue: UseFormSetValue<z.infer<typeof saveSchema>>;
  editDate?: string;
  editTime?: string;
  // eslint-disable-next-line no-unused-vars
  onDropdownScroll: (isOpen: boolean) => void;
}

const Alarm = ({ editDate, editTime, setValue, onDropdownScroll }: AlarmProps) => {
  const atomVisible = useAtomValue(visibleMemoAndAlarmAtom);
  const visible = atomVisible;
  const dateOptions = useAtomValue(dateOptionsAtom);
  const timeOptions = useAtomValue(timeOptionsAtom);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isDateDropDownOpen, setIsDateDropDownOpen] = useState(false);
  const [isTimeDropDownOpen, setIsTimeDropDownOpen] = useState(false);

  const alarmRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isDropdownOpen = isDateDropDownOpen || isTimeDropDownOpen;
    onDropdownScroll?.(isDropdownOpen);
  }, [isDateDropDownOpen, isTimeDropDownOpen, onDropdownScroll]);

  // 드롭다운 열릴 때 스크롤 이동
  useEffect(() => {
    if ((isDateDropDownOpen || isTimeDropDownOpen) && alarmRef.current) {
      alarmRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isDateDropDownOpen, isTimeDropDownOpen]);

  // 수정 모드일 때 초기값 설정
  useEffect(() => {
    if (editDate) setSelectedDate(editDate);
    if (editTime) setSelectedTime(editTime);
  }, [editDate, editTime]);

  useEffect(() => {
    setValue('date', selectedDate);
    setValue('time', selectedTime);
  }, [selectedDate, selectedTime, setValue]);

  return (
    <div
      className='bg-white w-full rounded-xl shadow-[0_2px_7px_rgba(2,34,94,0.1)] px-3 pt-2 pb-5 mb-60'
      ref={alarmRef}
    >
      <p className='text-sm font-semibold text-stone mt-2'>알림</p>
      <AnimatePresence>
        {visible && (
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
                setIsOpen={setIsDateDropDownOpen}
              />
              {/* 시간 드롭다운 */}
              <DateTimeDropDown
                icon={<ScheduleIcon width={22} height={22} />}
                options={timeOptions}
                title='시간선택'
                subTitle='시간'
                selectedOption={selectedTime}
                setSelectedOption={setSelectedTime}
                isOpen={isTimeDropDownOpen}
                setIsOpen={setIsTimeDropDownOpen}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Alarm;
