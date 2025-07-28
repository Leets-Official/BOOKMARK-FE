import { tv } from 'tailwind-variants';
import { isMobile } from 'react-device-detect';
import { useScrollLock } from '@/hooks/ScrollLock';
import { Outlet } from 'react-router-dom';

const overlayStyle = tv({
  base: 'fixed inset-0 z-100 flex items-center justify-center',
  variants: {
    isMobile: {
      true: '',
      false: 'bg-black/50',
    },
  },
});

const modalStyle = tv({
  base: 'bg-gray-100 rounded-[30px] flex flex-col overflow-hidden',
  variants: {
    isMobile: {
      true: 'w-full h-full',
      false: 'w-[369px] h-[773px]',
    },
  },
});

const MyPage = () => {
  // 외부 스크롤 방지
  useScrollLock(true);

  return (
    <div className={overlayStyle({ isMobile })}>
      <div className={modalStyle({ isMobile })} onClick={(e) => e.stopPropagation()}>
        <Outlet />
      </div>
    </div>
  );
};

export default MyPage;
