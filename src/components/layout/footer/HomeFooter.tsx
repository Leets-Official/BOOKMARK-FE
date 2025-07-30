import { scrollBarWidthAtom } from '@/atoms';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { Button } from '@/components/common';
import { LeftIcon } from '@/assets';
import { motion } from 'framer-motion';

interface HomeFooterProps {
  isFixedBar: boolean;
}

const HomeFooter = ({ isFixedBar }: HomeFooterProps) => {
  const navigate = useNavigate();
  const scrollBarWidth = useAtomValue(scrollBarWidthAtom);

  return (
    <div className={clsx('fixed bottom-0 max-w-[1440px] w-full z-20')}>
      <div className='flex items-center px-8 sm:px-18 md:px-30 xl:px-38 mb-10'>
        {isFixedBar && (
          <motion.div
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <Button
              icon={
                <LeftIcon
                  width={24}
                  height={24}
                  stroke='black'
                  strokeWidth={2}
                  className='rotate-90 w-6 h-6 sm:w-[30px] sm:h-[30px]'
                />
              }
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className='border-1 bg-lightGray rounded-full shadow-md sm:p-3 p-2 border-lightGray hover:brightness-90 cursor-pointer'
            />
          </motion.div>
        )}
        <div
          className='flex ml-auto'
          style={{ marginRight: window.innerWidth > 1440 ? '0px' : `${scrollBarWidth}px` }}
        >
          <button
            onClick={() => navigate('save')}
            className={clsx(
              'bg-blue flex justify-center items-center sm:w-35 w-28 sm:h-17 h-13 text-white shadow-md',
              'rounded-[100px] hover:brightness-75 transition gap-[10px] sm:text-[18px] text-[15px] border',
              'border-[#B2CDFF] cursor-pointer ml-auto',
            )}
          >
            링크추가
            <span className='sm:text-[30px] text-[24px]'>+</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeFooter;
