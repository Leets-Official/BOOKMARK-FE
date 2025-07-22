import { BackArrowIcon } from '@/assets';
import { useNavigate } from 'react-router-dom';

interface IHeaderProps {
  title: string;
}

const SaveHeader = ({ title }: IHeaderProps) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(-1);
  };

  return (
    <div className='flex flex-row items-center w-full justify-center relative px-4 h-[48px]'>
      <BackArrowIcon width={24} height={24} className='absolute left-4' onClick={onClick} />
      <p className='text-base font-medium'>{title}</p>
    </div>
  );
};

export default SaveHeader;
