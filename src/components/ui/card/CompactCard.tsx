import Image from '@/components/common/Image';
import React, { useRef, useEffect, useState } from 'react';

const CompactCard = () => {
  return (
    <div className='w-1/2 lg:w-1/3 xl:w-1/4 border border-gray-200 shadow-md rounded-lg p-4 flex items-center flex-row gap-4'>
      <Image
        src={'https://cdn.pixabay.com/photo/2021/03/18/19/56/keyboard-6105750_960_720.jpg'}
        alt='CompactCard'
        className='w-[5.5rem] h-[5.5rem] rounded-lg'
      />
      <div className='flex flex-col gap-2'>
        <p className='text-base font-semibold'>SEMIHARU CITY POP</p>
        <p className='text-sm text-grayText line-clamp-4'>
          작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질.
          작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질.
          작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질.
          작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질.
          작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질.
        </p>
        <div className='flex flex-row gap-2'>
          <p className='text-sm text-grayText'>카테고리</p>
          <div className='flex flex-row gap-2'>
            <p className='text-sm text-grayText'>테그</p>
            <p className='text-sm text-grayText'>테그</p>
            <p className='text-sm text-grayText'>테그</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompactCard;
