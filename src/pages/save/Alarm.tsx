import { AddAlertIcon, CalendarIcon, ScheduleIcon, TrashIcon } from '@/assets';
import {
  dateOptionsAtom,
  selectedDateAtom,
  selectedTimeAtom,
  timeOptionsAtom,
  visibleMemoAndAlarmAtom,
} from '@/atoms';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import DateTimeDropDown from '@/components/layout/dropDown/DateTimeDropDown';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtom, useAtomValue } from 'jotai';
import { useState } from 'react';
import { tv } from 'tailwind-variants';

const AlarmButtonStyle = tv({
  base: 'text-primary underline font-semibold flex items-center cursor-pointer',
  variants: {
    large: {
      true: 'text-[12px]',
      false: 'text-sm',
    },
  },
});

const Alarm = () => {
  const visible = useAtomValue(visibleMemoAndAlarmAtom);
  const dateOptions = useAtomValue(dateOptionsAtom);
  const timeOptions = useAtomValue(timeOptionsAtom);
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);
  const [selectedTime, setSelectedTime] = useAtom(selectedTimeAtom);

  const [isOpenAlarmModal, setIsOpenAlarmModal] = useState(false);
  const [isTimeDropDownOpen, setIsTimeDropDownOpen] = useState(false);
  const [tempDate, setTempDate] = useState('');
  const [tempTime, setTempTime] = useState('');

  const [isDateDropDownOpen, setIsDateDropDownOpen] = useState(false);

  const handleSeletedAlarm = () => {
    setSelectedDate(tempDate);
    setSelectedTime(tempTime);
    resetTempAlarm();
  };

  const resetAlarm = () => {
    setSelectedDate('');
    setSelectedTime('');
  };

  const resetTempAlarm = () => {
    setTempDate('');
    setTempTime('');
  };

  return (
    <div className='bg-white w-full rounded-[12px] shadow relative'>
      <div className='flex items-center justify-between p-2 my-1'>
        <p className='text-sm font-semibold text-grayText'>알림</p>
        {selectedDate === '' || selectedTime === '' ? null : (
          <Button
            onClick={resetAlarm}
            icon={<TrashIcon width={18} height={18} fill='#FF2C3D' />}
            className='text-xs text-error underline font-semibold flex items-center cursor-pointer absolute top-4 right-4'
          >
            알림 삭제
          </Button>
        )}
      </div>
      <AnimatePresence>
        {visible && (
          <motion.div
            key='alarmContainer'
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='overflow-hidden pb-3'
          >
            <div className='flex items-center justify-center m-1'>
              <Button
                icon={<AddAlertIcon width={24} height={24} fill='#397FFF' />}
                onClick={() => {
                  setIsOpenAlarmModal(true);
                }}
                className={AlarmButtonStyle({
                  large: selectedDate.length + selectedTime.length > 15,
                })}
              >
                {selectedDate === '' || selectedTime === ''
                  ? '알림 설정 카카오톡 나에게 보내기'
                  : `${selectedDate}일뒤 ${selectedTime}에 카카오톡 나에게 보내기`}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpenAlarmModal && (
        <Modal
          title='알림 추가'
          onCancel={() => {
            setIsOpenAlarmModal(false);
            resetTempAlarm();
          }}
          onConfirm={() => {
            handleSeletedAlarm();
            setIsOpenAlarmModal(false);
          }}
          disabled={tempDate === '' || tempTime === ''}
        >
          <div className='flex flex-row gap-2 mb-2 mt-2'>
            {/* 날짜 드롭다운 */}
            <DateTimeDropDown
              icon={<CalendarIcon width={24} height={24} fill='#090E1D' />}
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
              icon={<ScheduleIcon width={24} height={24} fill='#090E1D' />}
              options={timeOptions}
              title='시간선택'
              subTitle='시간'
              selectedOption={tempTime}
              setSelectedOption={setTempTime}
              isOpen={isTimeDropDownOpen}
              setIsOpen={setIsTimeDropDownOpen}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Alarm;
