import { isMobile } from 'react-device-detect';
import SaveHeader from '@/components/layout/header/SaveHeader';
import { useNavigate } from 'react-router-dom';
import { tv } from 'tailwind-variants';
import { useState } from 'react';
import TextField from '@/components/ui/TextField';

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
  base: 'flex flex-col items-center bg-[#eceef3]',
  variants: {
    isMobile: {
      true: 'h-full w-full',
      false: 'w-[369px] h-[773px] rounded-[30px] border',
    },
  },
});

const Save = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');

  const onClick = () => {
    navigate(-1);
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  console.log(title);

  return (
    <div className={Overlay({ isMobile })} onClick={!isMobile ? onClick : undefined}>
      <div className={Container({ isMobile })} onClick={(e) => e.stopPropagation()}>
        <SaveHeader />
        <div className='flex flex-col items-center justify-center gap-3 w-full p-4 pt-13'>
          <div className='bg-white w-full rounded-[12px] shadow p-4'>
            {/* <p className='text-[12px] font-medium'>링크입력</p> */}
            <TextField label='링크입력' placeholder='제목을 입력해주세요' maxLength={10} />
          </div>
          <div className='bg-white w-full rounded-[12px] shadow p-4'>
            <p className='text-[14px]'>카테고리, 태그</p>
          </div>
          <div className='bg-white w-full rounded-[12px] shadow p-4'>
            <p className='text-[14px]'>메모</p>
          </div>
          <div className='bg-white w-full rounded-[12px] shadow p-4'>
            <p className='text-[14px]'>알림</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Save;
