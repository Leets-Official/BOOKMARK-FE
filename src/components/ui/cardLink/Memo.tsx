import { visibleMemoAndAlarmAtom } from '@/atoms';
import TextField from '@/components/ui/TextField';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { Controller, type Control } from 'react-hook-form';
import type z from 'zod';
import type { saveSchema } from '@/schema/save';

interface IMemoProps {
  control: Control<z.infer<typeof saveSchema>>;
}

const Memo = ({ control }: IMemoProps) => {
  const atomVisible = useAtomValue(visibleMemoAndAlarmAtom);
  const visible = atomVisible;

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
            <Controller
              name='memo'
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  label=''
                  placeholder='메모를 입력해주세요'
                  maxLength={50}
                  value={field.value}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  errorMessage={fieldState.error?.message}
                  buttonVisible={false}
                />
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Memo;
