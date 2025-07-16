import Image from '@/components/common/Image';
import clsx from 'clsx';

const CompactCard = () => {
  return (
    <div className='w-full border border-gray-200 shadow-md rounded-lg p-2 flex items-stretch flex-row gap-4'>
      <Image
        src={'https://cdn.pixabay.com/photo/2021/03/18/19/56/keyboard-6105750_960_720.jpg'}
        alt='CompactCard'
        className={clsx('aspect-square rounded-lg object-cover', 'h-26', 'sm:h-26', 'md:h-30')}
      />
      <div className='flex flex-col gap-2 justify-between'>
        <p className='text-base font-semibold'>SEMIHARU CITY POP</p>
        <p
          className={clsx(
            'text-sm text-grayText line-clamp-2',
            'sm:line-clamp-2',
            'md:line-clamp-3',
          )}
        >
          작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질.
          작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질.
          작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질.
          작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질.
          작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질.
        </p>
        <div className='flex flex-row items-center gap-2'>
          <p className='text-sm text-darkGray bg-snowGray rounded-lg px-2 py-1 font-medium'>
            카테고리
          </p>
          <div className='flex flex-row gap-2'>
            <p className='text-sm text-grayText font-medium'>태그</p>
            <p className='text-sm text-grayText font-medium'>태그</p>
            <p className='text-sm text-grayText font-medium'>태그</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompactCard;
