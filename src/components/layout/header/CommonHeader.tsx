import { BackArrowIcon } from '@/assets';
import { useNavigate } from 'react-router-dom';

const CommonHeader = ({ title }: { title: string }) => {
  const navigate = useNavigate();

  const onClick = () => {
    document.body.style.overflow = '';
    navigate(-1);
  };

  return (
    <div className='flex flex-row items-center w-full justify-center relative px-4 h-[48px]'>
      <BackArrowIcon width={24} height={24} className='absolute left-4' onClick={onClick} />
      <p className='text-base font-medium'>{title}</p>
    </div>
  );
};

export default CommonHeader;
