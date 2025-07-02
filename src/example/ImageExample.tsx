import Image from '@/components/common/Image';
import { useState } from 'react';

// Example 컴포넌트 정의
const Example = () => {
  // 이미지 상태 선언 (src: 이미지 경로, alt: 대체 텍스트)
  const [image] = useState({
    src: 'https://i.pinimg.com/236x/80/0a/91/800a91b79e242bb82000bb199dae9b5a.jpg',
    alt: '가나디',
  });

  return (
    <div className='flex flex-col items-center justify-center p-8'>
      {/* 이미지 출력 부분 */}
      <Image
        src={image.src} // 이미지 URL
        alt={image.alt} // 대체 텍스트 (접근성, 로딩 실패 시)
        className='
          w-40 h-40               // 고정 크기 (160px x 160px)
          object-cover           // 이미지 비율 유지하며 영역 채우기
          cursor-pointer         // 마우스 커서: 손가락 모양
          transition duration-300// 300ms 부드러운 트랜지션
          hover:scale-105        // 마우스 오버 시 105%로 확대
        '
      />

      {/* 이미지 하단 텍스트 출력 (alt 값) */}
      <p className='mt-4 text-gray-700'>{image.alt}</p>
    </div>
  );
};

export default Example;
