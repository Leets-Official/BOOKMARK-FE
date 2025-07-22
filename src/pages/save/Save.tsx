import { isMobile } from 'react-device-detect';
import SaveHeader from '@/components/layout/header/SaveHeader';
import { useNavigate } from 'react-router-dom';
import { tv } from 'tailwind-variants';
import CategoryTagSelector from '@/pages/save/CategoryTagSelector';
import Memo from '@/pages/save/Memo';
import Alarm from '@/pages/save/Alarm';
import Button from '@/components/common/Button';
import LinkField from '@/pages/save/LinkField';
import { isSaveButtonDisabledAtom } from '@/atoms';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';

const Overlay = tv({
  base: 'fixed inset-0 z-100 flex items-center justify-center',
  variants: {
    isMobile: {
      true: '',
      false: 'bg-black/50',
    },
  },
});

const Container = tv({
  base: 'flex flex-col items-center bg-grayBg overflow-y-auto hide-scrollbar',
  variants: {
    isMobile: {
      true: 'h-full w-full',
      false: 'w-[369px] h-[773px] rounded-[30px] border fixed',
    },
  },
});

const SaveButton = tv({
  base: 'bg-blue text-base text-white text-center font-medium mb-8 p-4 w-[90%] rounded-[10px]',
  variants: {
    isDisabled: {
      true: 'bg-lightBlueGray text-veryLightGray',
      false: 'bg-blue text-white cursor-pointer',
    },
  },
});

const Save = () => {
  const navigate = useNavigate();
  const isSaveButtonDisabled = useAtomValue(isSaveButtonDisabledAtom);
  const onClick = () => {
    document.body.style.overflow = '';
    navigate(-1);
  };

  // Save Page 창 열릴 때 body 스크롤 바 정지
  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  return (
    // PC : 모달형식, 모바일 : 전체화면
    <div className={Overlay({ isMobile })} onClick={!isMobile ? onClick : undefined}>
      <div
        className={Container({ isMobile }) + ' flex flex-col'}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 해더 */}
        <div className='sticky top-0 z-10 w-full'>
          <SaveHeader />
        </div>
        {/* 본문 */}
        <div className='flex-1 overflow-y-auto hide-scrollbar w-full'>
          {/* 카드 모음 */}
          <div className='flex flex-col items-center gap-3 w-full p-4 mt-3'>
            <LinkField />
            <CategoryTagSelector />
            <Memo />
            <Alarm />
          </div>
        </div>
        {/* 저장 버튼 */}
        <Button
          onClick={() => {
            // console.log('저장하기', link, memo, selectedDate, selectedTime);
          }}
          className={SaveButton({ isDisabled: isSaveButtonDisabled })}
          disabled={isSaveButtonDisabled}
        >
          저장하기
        </Button>
      </div>
    </div>
  );
};

export default Save;
