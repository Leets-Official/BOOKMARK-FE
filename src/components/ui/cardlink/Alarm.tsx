import { CalendarIcon, ScheduleIcon } from '@/assets';
import { dateOptionsAtom, timeOptionsAtom, visibleMemoAndAlarmAtom } from '@/atoms';
import DateTimeDropDown from '@/components/layout/dropDown/DateTimeDropDown';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { useState } from 'react';

const Alarm = ({ isOpen }: { isOpen?: boolean }) => {
  const atomVisible = useAtomValue(visibleMemoAndAlarmAtom);
  const visible = isOpen !== undefined ? isOpen : atomVisible;
  const dateOptions = useAtomValue(dateOptionsAtom);
  const timeOptions = useAtomValue(timeOptionsAtom);
  const [tempDate, setTempDate] = useState('');
  const [tempTime, setTempTime] = useState('');
  const [isDateDropDownOpen, setIsDateDropDownOpen] = useState(false);
  const [isTimeDropDownOpen, setIsTimeDropDownOpen] = useState(false);

  return (
    <div className='bg-white w-full rounded-xl shadow-[0_2px_7px_rgba(2,34,94,0.1)] px-3 pt-2 pb-5 mb-60'>
      <div className='flex flex-col gap-2 mt-2'>
        <p className='text-sm font-semibold text-stone'>알림</p>
      </div>
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
                icon={<CalendarIcon width={24} height={24} />}
                options={dateOptions}
                title='날짜 선택'
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Alarm;
