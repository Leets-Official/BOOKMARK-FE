import { FolderIcon, HomeIcon } from '@/assets';
import Button from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';

const iconButtonClass =
  'flex justify-center items-center w-13 h-13 rounded-4xl hover:brightness-80';

const SideBar = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col gap-6 items-center w-[70px] min-h-screen pt-20'>
      <Button
        onClick={() => navigate('save')}
        className={`${iconButtonClass} bg-blue text-3xl text-white`}
      >
        +
      </Button>
      <div className={`${iconButtonClass} bg-white`}>
        <HomeIcon />
      </div>
      <div className={`${iconButtonClass} bg-white`}>
        <FolderIcon />
      </div>
    </div>
  );
};

export default SideBar;
