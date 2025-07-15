import { AddAlert, Calendar, Schedule, Trash } from '@/assets';
import {
  dateOptionsAtom,
  selectedDateAtom,
  selectedTimeAtom,
  timeOptionsAtom,
  visibleMemoAndAlarmAtom,
} from '@/atoms';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import DropDown from '@/components/ui/DropDown';
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
  const [tempDate, setTempDate] = useState('');
  const [tempTime, setTempTime] = useState('');

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
      <div className='flex items-center justify-between p-2 mt-1'>
        <p className='text-sm'>알림</p>
        {selectedDate === '' || selectedTime === '' ? null : (
          <Button
            onClick={resetAlarm}
            icon={<Trash width={18} height={18} fill='#FF2C3D' />}
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
                icon={<AddAlert width={24} height={24} fill='#397FFF' />}
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
            <DropDown
              icon={<Calendar width={24} height={24} fill='#090E1D' />}
              title='날짜 선택'
              subTitle='날짜'
              options={dateOptions}
              selectedOption={tempDate}
              setSelectedOption={setTempDate}
            />
            <DropDown
              icon={<Schedule width={24} height={24} fill='#090E1D' />}
              title='시간 선택'
              subTitle='시간'
              options={timeOptions}
              selectedOption={tempTime}
              setSelectedOption={setTempTime}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Alarm;
