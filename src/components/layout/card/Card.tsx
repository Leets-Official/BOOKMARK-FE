import Button from '@/components/common/Button';
import Image from '@/components/common/Image';
import { clsx } from 'clsx';
import React, { useRef, useState } from 'react';

interface CardProps {
  title: string;
  platform: string;
  image?: string;
  isLoading?: boolean;
}

const Card = ({ title, platform, image, isLoading }: CardProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined); // 미리보기용 이미지 URL 상태

  // 버튼 클릭 시 숨겨진 파일 입력창 엶
  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // 선택된 첫 번째 파일 가져오기
    if (!file) return; // 파일이 없으면 함수 종료

    const previewURL = URL.createObjectURL(file); // 파일을 브라우저에서 볼 수 있는 임시 URL 생성
    setPreviewImage(previewURL);
  };

  const finalImage = previewImage || image;

  return (
    <div className='flex flex-row items-center w-100 p-5'>
      {/*로딩일 때 이미지*/}
      {isLoading ? (
        <div className='bg-gray-200 h-25 w-25 mr-4 flex items-center rounded-2xl justify-center'>
          <div className='spinner border-4 border-gray-400 border-t-gray-200 rounded-full w-10 h-10 animate-spin' />
        </div>
      ) : finalImage ? (
        <Image src={finalImage} className='rounded-2xl object-cover h-25 w-25 mr-4' />
      ) : (
        // 이미지가 없을 때 추가 버튼으로 표시
        <>
          <Button
            onClick={handleImageUpload}
            className={clsx(
              'h-25 w-25 mr-4 flex items-center justify-center bg-gray-200 rounded-2xl',
              'cursor-pointer hover:brightness-90 text-gray-600 text-3xl font-bold',
            )}
          >
            ＋
          </Button>
          <input
            type='file'
            ref={fileInputRef}
            accept='image/*'
            className='hidden'
            onChange={handleFileChange}
          />
        </>
      )}
      <div className='flex flex-col gap-2'>
        <p className='text-black font-semibold'>{title}</p>
        <p className='text-[#545966]'>{platform}</p>
      </div>
    </div>
  );
};

export default Card;
