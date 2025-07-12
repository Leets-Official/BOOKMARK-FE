import { AddAlert, Calendar, Schedule, Trash } from '@/assets';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import DropDown from '@/components/ui/DropDown';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface AlarmProps {
  visible: boolean;
  dateOptions: {
    id: number;
    name: string;
  }[];
  timeOptions: {
    id: number;
    name: string;
  }[];
  selectedDate: string;
  selectedTime: string;
  // eslint-disable-next-line no-unused-vars
  setSelectedDate: (date: string) => void;
  // eslint-disable-next-line no-unused-vars
  setSelectedTime: (time: string) => void;
}

const Alarm = ({
  visible,
  dateOptions,
  timeOptions,
  selectedDate,
  selectedTime,
  setSelectedDate,
  setSelectedTime,
}: AlarmProps) => {
  const [isOpenAlarmModal, setIsOpenAlarmModal] = useState(false);

  const handleDate = (date: string) => {
    setSelectedDate(date);
  };

  const handleTime = (time: string) => {
    setSelectedTime(time);
  };

  const resetAlarm = () => {
    setSelectedDate('');
    setSelectedTime('');
  };

  return (
    <div className='bg-white w-full rounded-[12px] shadow p-4 relative'>
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
      <AnimatePresence>
        {visible && (
          <motion.div
            key='alarmContainer'
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='overflow-hidden mt-4'
          >
            <div className='flex items-center justify-center m-1'>
              <Button
                icon={<AddAlert width={24} height={24} fill='#397FFF' />}
                onClick={() => {
                  setIsOpenAlarmModal(true);
                }}
                className='text-sm text-primary underline font-semibold flex items-center cursor-pointer'
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
          }}
          onConfirm={() => {
            setIsOpenAlarmModal(false);
          }}
          disabled={selectedDate === '' || selectedTime === ''}
        >
          <div className='flex flex-row gap-2 mb-2 mt-2'>
            <DropDown
              icon={<Calendar width={24} height={24} fill='#090E1D' />}
              title='날짜 선택'
              subTitle='날짜'
              options={dateOptions}
              selectedOption={selectedDate}
              setSelectedOption={handleDate}
            />
            <DropDown
              icon={<Schedule width={24} height={24} fill='#090E1D' />}
              title='시간 선택'
              subTitle='시간'
              options={timeOptions}
              selectedOption={selectedTime}
              setSelectedOption={handleTime}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Alarm;
