import { BackArrowIcon } from '@/assets';
import { Button } from '@/components/common';
import { useNavigate } from 'react-router-dom';

const CommonHeader = ({ title }: { title: string }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(-1);
  };

  return (
    <div className='flex flex-row items-center w-full justify-center relative mt-5'>
      <Button
        icon={<BackArrowIcon width={20} height={20} />}
        onClick={onClick}
        className='absolute left-4 rounded-[100px] bg-[#EAEDF5]/90 p-2.5 hover:brightness-90 transition'
      ></Button>
      <p className='text-base font-medium'>{title}</p>
    </div>
  );
};

export default CommonHeader;
