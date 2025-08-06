import { scrollBarWidthAtom } from '@/atoms';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';

const HomeFooter = () => {
  const navigate = useNavigate();
  const scrollBarWidth = useAtomValue(scrollBarWidthAtom);

  return (
    <div
      className='fixed bottom-0 left-0 w-full z-50 pointer-events-none'
      style={{
        paddingRight: scrollBarWidth > 0 ? `${scrollBarWidth}px` : undefined,
      }}
    >
      <div className='max-w-[1200px] mx-auto relative pointer-events-auto cursor-pointer'>
        <div className='flex justify-end pr-4 absolute bottom-4 right-0'>
          <div
            onClick={() => navigate('save')}
            className={clsx(
              'bg-blue flex justify-center items-center sm:w-35 w-28 sm:h-17 h-13 text-white shadow-md',
              'rounded-[100px] hover:brightness-75 transition gap-[10px] sm:text-[18px] text-[15px] border border-[#B2CDFF] cursor-pointer',
            )}
          >
            링크 추가
            <span className='sm:h-9 h-7 sm:text-[30px] text-[24px]'>+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFooter;
