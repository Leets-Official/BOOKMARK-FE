import { FolderIcon, HomeIcon } from '@/assets';
import Button from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';

const iconButton =
  'flex justify-center items-center w-13 h-13 rounded-4xl hover:brightness-80 transition';

const SideBar = () => {
  const navigate = useNavigate();
  return (
    <div className='fixed flex flex-col gap-6 items-center pt-20 left-0 top-0 h-screen w-[70px]'>
      <Button
        onClick={() => navigate('save')}
        className={`${iconButton} bg-blue text-3xl text-white`}
      >
        +
      </Button>
      <div className={`${iconButton} bg-white`}>
        <HomeIcon />
      </div>
      <div className={`${iconButton} bg-white`}>
        <FolderIcon />
      </div>
    </div>
  );
};

export default SideBar;
