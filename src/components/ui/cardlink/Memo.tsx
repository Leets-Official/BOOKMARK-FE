import { memoAtom, visibleMemoAndAlarmAtom } from '@/atoms';
import TextField from '@/components/ui/TextField';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtomValue, useSetAtom } from 'jotai';

interface IMemoProps {
  cardMemo?: string;
  // eslint-disable-next-line no-unused-vars
  setCardMemo?: (value: string) => void;
  isOpen?: boolean;
}

const Memo = ({ cardMemo, setCardMemo, isOpen }: IMemoProps) => {
  const atomVisible = useAtomValue(visibleMemoAndAlarmAtom);
  const visible = isOpen !== undefined ? isOpen : atomVisible;
  const setMemoFromAtom = useSetAtom(memoAtom);

  const handleMemoChange = (value: string) => {
    if (setCardMemo) {
      setCardMemo(value); // 로컬 state에서 온 경우
    } else {
      setMemoFromAtom(value); // jotai atom을 사용하는 경우
    }
  };

  return (
    <div className='bg-white w-full rounded-xl shadow-[0_2px_7px_rgba(2,34,94,0.1)] px-3 pt-2 pb-5'>
      <p className='text-sm text-stone font-semibold mt-2'>메모</p>
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
              maxLength={50}
              onChange={handleMemoChange}
              initialValue={cardMemo}
              buttonVisible={false}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Memo;
