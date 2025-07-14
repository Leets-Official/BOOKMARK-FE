import { AddIcon, ProfileIcon } from '@/assets';
import Button from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';

const MobileHeader = () => {
  const navigate = useNavigate();
  return (
    <div className='w-screen h-20 fixed flex justify-between items-center px-5 py-3 z-50'>
      <ProfileIcon />
      <Button
        onClick={() => navigate('save')}
        icon={<AddIcon className='text-white z-50' />}
        className='bg-blue flex justify-center items-center w-10 h-10 rounded-4xl'
      ></Button>
    </div>
  );
};

export default MobileHeader;
