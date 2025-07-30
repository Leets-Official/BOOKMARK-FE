import { scrollBarWidthAtom } from '@/atoms';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';

const HomeFooter = () => {
  const navigate = useNavigate();
  const scrollBarWidth = useAtomValue(scrollBarWidthAtom);

  return (
    <div
      className={clsx(
        'fixed bottom-4 max-w-[1440px] w-full z-20 2xl:ml-10',
        scrollBarWidth > 0
          ? `left-[calc(50%-${scrollBarWidth}px)]` // 스크롤바 너비만큼 왼쪽으로 조정
          : 'left-1/2 transform -translate-x-1/2',
      )}
    >
      <div className='flex justify-end px-4'>
        <div
          onClick={() => navigate('save')}
          className={clsx(
            'bg-blue flex justify-center items-center sm:w-35 w-28 sm:h-17 h-13 text-white shadow-md',
            'rounded-[100px] hover:brightness-75 transition gap-[10px] sm:text-[18px] text-[15px] border border-[#B2CDFF] cursor-pointer',
          )}
        >
          링크 추가
          <span className='sm:text-[30px] text-[24px]'>+</span>
        </div>
      </div>
    </div>
  );
};

export default HomeFooter;
