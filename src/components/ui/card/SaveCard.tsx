import { FolderDetailIcon } from '@/assets';
import Image from '@/components/common/Image';

const SaveCard = () => {
  return (
    <div className='w-full rounded-[16px] shadow-[0_2px_7px_rgba(2,34,94,0.1)]'>
      <div className='p-4 pb-2'>
        <div className='flex gap-2 mb-4'>
          <span className='bg-[#80CA14] text-white font-normal px-3 py-3 rounded-full text-[15px] border-1 border-[#EAEDF5]'>
            카테고리
          </span>
          <span className='font-normal px-3 py-3 rounded-full text-[15px] border-1 border-[#EAEDF5]'>
            태그
          </span>
          <span className='font-normal px-3 py-3 rounded-full text-[15px] border-1 border-[#EAEDF5]'>
            플랫폼
          </span>
        </div>
        <Image
          src='https://cdn.pixabay.com/photo/2021/03/18/19/56/keyboard-6105750_960_720.jpg'
          className='w-full aspect-[4/2.3] object-cover rounded-xl mb-4'
        />
        <div className='flex justify-between items-start pl-2'>
          <div className='flex-1'>
            <h3 className='font-semibold text-[20px] text-gray-900 mb-2'>
              SEMIHARU CITY POP PLAYLIST
            </h3>
            <p className='text-[15px] text-gray-600 leading-relaxed mb-2'>
              뉴져지안의 듣기 좋은 플레이리스트. 여름 밤 늦은 밤 커피마시며 듣기 좋은 선곡.
            </p>
            <div className='flex justify-between items-center'>
              <p className='text-sm text-stone'>2025.07.17 저장</p>
              <FolderDetailIcon
                width={24}
                height={24}
                className='text-white hover:text-grayBg transition-colors'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveCard;
