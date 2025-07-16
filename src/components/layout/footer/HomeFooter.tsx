import Button from '@/components/common/Button';
import { AddIcon } from '@/assets';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

const HomeFooter = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate('save')}
      icon={<AddIcon width={30} height={30} fill='#FFFFFF' className='text-white z-50' />}
      className={clsx(
        'bg-blue flex fixed right-5 bottom-5 justify-center items-center w-15 h-15',
        'rounded-4xl hover:brightness-80 transition z-20',
      )}
    ></Button>
  );
};

export default HomeFooter;
