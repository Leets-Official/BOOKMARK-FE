import { isMobile } from 'react-device-detect';
import SaveHeader from '@/components/layout/header/SaveHeader';
import { useNavigate } from 'react-router-dom';
import { tv } from 'tailwind-variants';

const overlay = tv({
  variants: {
    isMobile: {
      true: 'flex flex-col items-center justify-center h-screen',
      false: 'fixed inset-0 bg-black/50 flex justify-center items-center z-100',
    },
  },
});

const Save = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(-1);
  };

  return (
    <div className={overlay({ isMobile })} onClick={!isMobile ? onClick : undefined}>
      <SaveHeader />
    </div>
  );
};

export default Save;
