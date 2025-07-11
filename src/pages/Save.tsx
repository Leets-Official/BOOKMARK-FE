import { isMobile } from 'react-device-detect';
import SaveHeader from '@/components/layout/header/SaveHeader';
import { useNavigate } from 'react-router-dom';
import { tv } from 'tailwind-variants';
import { useState } from 'react';
import TextField from '@/components/ui/TextField';
import Button from '@/components/common/Button';
import { Add } from '@/assets';
import Chip from '@/components/common/Chip';
import { AnimatePresence } from 'framer-motion';

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
  base: 'flex flex-col items-center bg-grayBg',
  variants: {
    isMobile: {
      true: 'h-full w-full',
      false: 'w-[369px] h-[773px] rounded-[30px] border fixed',
    },
  },
});

interface ChipProps {
  content: string;
  isSelected: boolean;
  type: 'category' | 'tag' | 'suggestion';
}

const Save = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [visibleChip, setVisibleChip] = useState(false);
  const [chipList, setChipList] = useState<ChipProps[]>([
    { content: '카테고리', isSelected: false, type: 'category' },
    { content: '카테고리', isSelected: false, type: 'category' },
    { content: '카테고리', isSelected: false, type: 'category' },
    { content: '카테고리', isSelected: false, type: 'category' },
    { content: '카테고리', isSelected: false, type: 'category' },
    { content: '카테고리', isSelected: false, type: 'category' },
    { content: '카테고리', isSelected: false, type: 'category' },
    { content: '카테고리', isSelected: false, type: 'category' },
  ]);

  const onClick = () => {
    navigate(-1);
  };

  const handleTitle = (v: string) => {
    setTitle(v);
    // 임시로 무조건 성공으로 처리
    setVisibleChip(true);
  };

  const handleChip = (index: number) => {
    console.log(index);
    setChipList(chipList.map((c, i) => (i === index ? { ...c, isSelected: !c.isSelected } : c)));
  };

  console.log(title);

  return (
    <div className={Overlay({ isMobile })} onClick={!isMobile ? onClick : undefined}>
      <div className={Container({ isMobile })} onClick={(e) => e.stopPropagation()}>
        <SaveHeader />
        <div className='flex flex-col items-center justify-center gap-3 w-full p-4 pt-13'>
          <div className='bg-white w-full rounded-[12px] shadow p-4'>
            {/* <p className='text-[12px] font-medium'>링크입력</p> */}
            <TextField
              label='링크입력'
              placeholder='제목을 입력해주세요'
              maxLength={10}
              onSubmit={handleTitle}
            />
          </div>
          <div className='bg-white w-full rounded-[12px] shadow p-4'>
            {visibleChip ? (
              <div className='flex flex-col gap-2 pt-1'>
                <div className='flex flex-row items-center justify-between mb-1'>
                  <p className='text-sm'>카테고리(파일)</p>
                  <Button
                    icon={<Add width={18} height={18} fill='#397FFF' />}
                    onClick={() => { }}
                    className='cursor-pointer text-sm font-semibold text-primary flex items-center gap-1'
                  >
                    카테고리 추가
                  </Button>
                </div>
                <div className='grid grid-cols-4 gap-2'>
                  <AnimatePresence>
                    {chipList.map((chip, index) => (
                      <Chip
                        key={index}
                        content={chip.content}
                        isSelected={chip.isSelected}
                        type={chip.type}
                        onClick={() => handleChip(index)}
                      />
                    ))}
                  </AnimatePresence>
                </div>
                {/* <div className='flex flex-row items-center justify-between bg-grayBg '>
                  <p className='text-[14px]'>태그</p>
                  <div>카테고리 추가</div>
                </div> */}
              </div>
            ) : (
              <p className='text-sm'>카테고리, 태그</p>
            )}
          </div>
          <div className='bg-white w-full rounded-[12px] shadow p-4'>
            <p className='text-sm'>메모</p>
          </div>
          <div className='bg-white w-full rounded-[12px] shadow p-4'>
            <p className='text-sm'>알림</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Save;
