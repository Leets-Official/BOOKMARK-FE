import { memoAtom, visibleMemoAndAlarmAtom } from '@/atoms';
import TextField from '@/components/ui/TextField';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtomValue, useSetAtom } from 'jotai';

const Memo = () => {
  const visible = useAtomValue(visibleMemoAndAlarmAtom);
  const setMemo = useSetAtom(memoAtom);

  const handleMemo = (v: string) => {
    setMemo(v);
  };

  return (
    <div className='bg-white w-full rounded-[12px] shadow p-2'>
      <AnimatePresence mode='wait'>
        <motion.p
          key='memo-with-file'
          className={clsx(
            { 'text-xs': visible, 'text-sm': !visible },
            'font-semibold text-grayText m-1',
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          메모
        </motion.p>
      </AnimatePresence>
      <AnimatePresence>
        {visible && (
          <motion.div
            key='memoContainer'
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='overflow-hidden'
          >
            <TextField
              label=''
              placeholder='메모를 입력해주세요'
              maxLength={70}
              onChange={handleMemo}
              isCreateType={false}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Memo;
