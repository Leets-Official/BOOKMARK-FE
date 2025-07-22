import { tv } from 'tailwind-variants';
import { isMobile } from 'react-device-detect';
import { useLocation, useNavigate } from 'react-router-dom';
import { useScrollLock } from '@/components/hooks/ScrollLock';
import SaveHeader from '@/components/layout/header/SaveHeader';
import { Button } from '@/components/common';
import { useState } from 'react';
import type { SaveCardProps } from '@/types';
import { Alarm, CategoryTagSelector, LinkField, Memo } from '@/components/ui/cardlink';

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

const Edit = () => {
  useScrollLock(!isMobile);
  const location = useLocation();
  const navigate = useNavigate();
  const onPrev = () => navigate(-1);
  const editData: SaveCardProps = location.state?.editData; // Home의 SaveCard로 부터 링크 데이터를 가져옴

  const [cardLink, setCardLink] = useState(
    `https://example.com/${editData.title.replace(/\s+/g, '-').toLowerCase()}`,
  );
  const [cardmemo, setCardMemo] = useState(`${editData.memo}`);

  useScrollLock(!isMobile);

  return (
    <div className={Overlay({ isMobile })} onClick={!isMobile ? onPrev : undefined}>
      <div className={Container({ isMobile })} onClick={(e) => e.stopPropagation()}>
        <SaveHeader title='링크 수정' />
        <div className='flex-1 overflow-y-auto hide-scrollbar w-full'>
          {/* 카드 모음 */}
          <div className='flex flex-col items-center gap-3 w-full p-4 mt-3'>
            {/**링크 필드 */}
            <LinkField
              isOpen={true}
              cardLink={cardLink}
              setCardLink={setCardLink}
              title={editData.title}
              platform={editData.platform}
              image={editData.image}
            />
            {/**카테고리 & 태그 */}
            <CategoryTagSelector
              isOpen={true}
              editCate={editData.category}
              editTag={editData.tags}
            />
            {/**메모 & 알람 */}
            <Memo setCardMemo={setCardMemo} cardMemo={cardmemo} isOpen={true} />
            <Alarm isOpen={true} />
          </div>
        </div>
        <Button
          onClick={() => {
            console.log('수정 완료');
            onPrev();
          }}
          className='bg-blue text-base text-white text-center font-medium mb-8 p-4 w-[90%] rounded-[10px] hover:brightness-90'
        >
          수정 완료
        </Button>
      </div>
    </div>
  );
};

export default Edit;
