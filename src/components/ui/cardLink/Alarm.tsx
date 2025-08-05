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
  const alarmAt = useAtomValue(alarmAtAtom); // ✅ alarmAtAtom 읽기 추가

  const alarmRef = useRef<HTMLDivElement>(null);

  const getDateTime = (dateOption: string, timeOption: string): string | null => {
    if (!dateOption || !timeOption) return null;

    const dateMatch = dateOption.match(/(\d+)일 뒤/);
    const timeMatch = timeOption.match(/(오전|오후)\s*(\d+)시/);

    if (!dateMatch || !timeMatch) return null;

    let daysLater = parseInt(dateMatch[1], 10);
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

    return combinedDate.format('YYYY-MM-DDTHH:mm:ss');
  };

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

  // ✅ 수정 모드일 경우 ISO 값으로부터 selectedDate/Time 역추출
  useEffect(() => {
    // editDate/editTime이 우선이므로 이 값이 있으면 설정
    if (editDate && editTime) {
      setSelectedDate(editDate);
      setSelectedTime(editTime);
      return;
    }

    if (!alarmAt) return;

    const parsed = dayjs(alarmAt);
    if (!parsed.isValid()) return;

    const now = dayjs().startOf('day');
    const targetDay = parsed.startOf('day');
    const daysDiff = targetDay.diff(now, 'day');

    const dateOption = dateOptions.find((opt) => opt.id === daysDiff);
    const hour = parsed.hour();
    const isAM = hour < 12;
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const timeStr = `${isAM ? '오전' : '오후'} ${hour12}시`;
    const timeOption = timeOptions.find((opt) => opt.name === timeStr);

    if (dateOption) setSelectedDate(dateOption.name);
    if (timeOption) setSelectedTime(timeOption.name);
  }, [editDate, editTime, alarmAt]);

  // ✅ 선택된 값이 바뀔 때마다 form에 설정 및 ISO 포맷으로 변환 저장
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
