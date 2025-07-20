import { FolderIcon, HomeIcon } from '@/assets';
import Button from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

const iconButton =
  'flex justify-center items-center w-13 h-13 rounded-4xl hover:brightness-85 transition-none hover:transition-all max-sm:bg-opacity-50 ';

const SideBar = () => {
  const navigate = useNavigate();

  return (
    <div className={clsx('fixed top-0 left-0 flex flex-col items-center pt-20 h-screen w-[70px]')}>
      <div className={clsx('flex flex-col gap-5 bg-white')}>
        <Button
          onClick={() => navigate('save')}
          className={clsx(iconButton, 'bg-blue text-3xl text-white')}
        >
          +
        </Button>
        <div className={clsx(iconButton, 'bg-inherit')}>
          <HomeIcon width={24} height={24} />
        </div>
        <div className={clsx(iconButton, 'bg-inherit')}>
          <FolderIcon width={24} height={24} />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
