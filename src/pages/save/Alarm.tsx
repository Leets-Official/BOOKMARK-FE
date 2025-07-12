import { AddAlert, Calendar, Schedule } from '@/assets';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import DropDown from '@/components/ui/DropDown';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface AlarmProps {
  visible: boolean;
}

const Alarm = ({ visible }: AlarmProps) => {
  const [isOpenAlarmModal, setIsOpenAlarmModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // 더미 데이터
  const dateOptions = [
    {
      id: 1,
      name: '내일(금) 8/1일',
    },
    {
      id: 2,
      name: '내일 모레(토) 8/2일',
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

  const handleDate = (date: string) => {
    setSelectedDate(date);
  };

  const handleTime = (time: string) => {
    setSelectedTime(time);
  };

  return (
    <div className='bg-white w-full rounded-[12px] shadow p-4'>
      <p className='text-sm'>알림</p>
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
            <div className='flex items-center justify-center m-1'>
              <Button
                icon={<AddAlert width={24} height={24} fill='#397FFF' />}
                onClick={() => {
                  setIsOpenAlarmModal(true);
                }}
                className='text-sm text-primary underline font-semibold flex items-center cursor-pointer'
              >
                알림 설정 카카오톡 나에게 보내기
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
