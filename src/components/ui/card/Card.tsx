import Button from '@/components/common/Button';
import Image from '@/components/common/Image';
import { clsx } from 'clsx';
import React, { useRef, useState } from 'react';

interface CardProps {
  title: string;
  platform: string;
  image?: string;
  isLoading?: boolean;
  editable?: boolean;
}

const Card = ({ title, platform, image, isLoading, editable }: CardProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined); // 미리보기용 이미지 URL 상태
  const [imageError, setImageError] = useState(false);

  // 버튼 클릭 시 숨겨진 파일 입력창 엶
  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // 파일 초기화
      fileInputRef.current.click(); // 클릭으로 파일 창 띄우기
    }
  };

  // 파일 선택 시 실행
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // 선택된 첫 번째 파일 가져오기
    if (!file) return; // 파일이 없으면 함수 종료

    // 파일이 실제로 이미지인지 검증
    if (!file.type.startsWith('image/')) {
      console.error('선택된 파일이 이미지가 아닙니다:', file.type);
      setImageError(true);
      return;
    }

    // 파일 크기 검증 (예: 5MB 이하)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      console.error('파일 크기가 너무 큽니다:', file.size);
      setImageError(true);
      return;
    }

    const previewURL = URL.createObjectURL(file); // 파일을 브라우저에서 볼 수 있는 임시 URL 생성
    setPreviewImage(previewURL);
    setImageError(false); // 새 이미지가 선택되면 에러 상태 초기화
  };

  // 이미지 로딩 실패 시
  const handleImageError = () => {
    setImageError(true); // 이미지 로딩 실패 시 에러 상태로 설정
  };

  const finalImage = previewImage || image;
  const isValidImage = finalImage && !imageError; // finalImage가 유효한지 판단

  return (
    <div className='flex flex-row items-center w-100 p-5'>
      {/* 로딩 상태 */}
      {isLoading ? (
        <div className='bg-gray-200 h-25 w-25 mr-4 flex items-center rounded-2xl justify-center'>
          <div className='spinner border-4 border-gray-400 border-t-gray-200 rounded-full w-10 h-10 animate-spin' />
        </div>
      ) : isValidImage ? (
        <div
          className={clsx(
            'rounded-2xl object-cover h-25 w-25 mr-4 overflow-hidden',
            editable && 'cursor-pointer hover:brightness-90',
          )}
          onClick={editable ? handleImageUpload : undefined}
        >
          <Image
            src={finalImage}
            className='h-full w-full object-cover'
            onError={handleImageError}
          />
        </div>
      ) : (
        <Button
          onClick={handleImageUpload}
          className={clsx(
            'h-25 w-25 mr-4 flex items-center justify-center bg-gray-200 rounded-2xl',
            'cursor-pointer hover:brightness-90 text-gray-600 text-3xl font-bold',
          )}
        >
          ＋
        </Button>
      )}
      <input
        type='file'
        ref={fileInputRef}
        accept='image/*'
        className='hidden'
        onChange={handleFileChange}
      />
      <div className='flex flex-col gap-2'>
        <p className='text-black font-semibold'>{title}</p>
        <p className='text-[#545966]'>{platform}</p>
      </div>
    </div>
  );
};

export default Card;
