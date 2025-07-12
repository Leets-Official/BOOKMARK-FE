import TextField from '@/components/ui/TextField';
import { AnimatePresence, motion } from 'framer-motion';

interface MemoProps {
  visible: boolean;
  // eslint-disable-next-line no-unused-vars
  handleMemo: (v: string) => void;
}

const Memo = ({ visible, handleMemo }: MemoProps) => {
  return (
    <div className='bg-white w-full rounded-[12px] shadow p-4'>
      <AnimatePresence mode='wait'>
        {visible ? (
          <motion.p
            key='memo-with-file'
            className='text-xs'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            메모
          </motion.p>
        ) : (
          <motion.p
            key='memo-with-file'
            className='text-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            메모
          </motion.p>
        )}
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
              onSubmit={handleMemo}
              type='reset'
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Memo;
