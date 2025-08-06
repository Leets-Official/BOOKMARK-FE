import { getPresignedUrl, uploadImage } from '@/api/file/presigned_url_api';
import { previewImageAtom, thumbnailUrlAtom, uploadUrlAtom } from '@/atoms';
import { Button, Image } from '@/components/common';
import { clsx } from 'clsx';
import { useAtom, useSetAtom } from 'jotai';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Controller, type Control, type UseFormSetValue } from 'react-hook-form';
import TextField from '../TextField';
import type { saveSchema } from '@/schema/save';
import type z from 'zod';

interface CardProps {
  control: Control<z.infer<typeof saveSchema>>;
  setValue: UseFormSetValue<z.infer<typeof saveSchema>>;
  platform: string;
  image?: string;
  isLoading?: boolean;
}

const LinkCard = ({ control, setValue, platform, image, isLoading }: CardProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useAtom(previewImageAtom); // 미리보기용 이미지 URL 상태
  const [imageError, setImageError] = useState(false);
  const setUploadUrl = useSetAtom(uploadUrlAtom);
  const setThumnail = useSetAtom(thumbnailUrlAtom);

  useEffect(() => {
    if (imageError) {
      setValue('image', '', { shouldValidate: true });
      toast.dismiss();
      toast.error('올바른 이미지를 선택해주세요');
    } else {
      if (image) {
        setValue('image', image, { shouldValidate: true });
      }
    }
  }, [imageError, image, setValue]);

  // 버튼 클릭 시 숨겨진 파일 입력창 엶
  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // 파일 초기화
      fileInputRef.current.click(); // 클릭으로 파일 창 띄우기
    }
  };

  // 파일 선택 시 실행
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // 선택된 첫 번째 파일 가져오기
    if (!file) return; // 파일이 없으면 함수 종료

    // 파일이 실제로 이미지인지 검증
    if (!file.type.startsWith('image/')) {
      toast.error('선택된 파일이 이미지가 아닙니다');
      console.error('선택된 파일이 이미지가 아닙니다:', file.type);
      setImageError(true);
      return;
    }

    // 파일 크기 검증 (예: 5MB 이하)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error('파일 크기가 너무 큽니다');
      setImageError(true);
      return;
    }

    const presigned = await getPresignedUrl(file.name);
    if (!presigned || !presigned.data) {
      console.error('Presigned URL을 가져오지 못했습니다.');
      setImageError(true);
      return;
    }

    const uploadedUrl = await uploadImage(presigned.data.presignedUrl, file);
    if (typeof uploadedUrl !== 'string') {
      console.error('실패: ', uploadedUrl.message);
      setImageError(true);
      return;
    }

    setUploadUrl(uploadedUrl);

    const previewURL = URL.createObjectURL(file); // 파일을 브라우저에서 볼 수 있는 임시 URL 생성
    setPreviewImage(previewURL);
    setValue('image', uploadedUrl, { shouldValidate: true });
    setImageError(false);
  };

  // 이미지 로딩 실패 시
  const handleImageError = () => {
    setImageError(true); // 이미지 로딩 실패 시 에러 상태로 설정
    console.log('이미지 로딩 실패:', finalImage);
  };

  setThumnail(image);
  const finalImage = previewImage === null ? undefined : previewImage || image;
  const isValidImage = finalImage && !imageError; // finalImage가 유효한지 판단

  return (
    <div className='flex flex-row items-center w-full'>
      {/* 로딩 상태 */}
      {isLoading ? (
        <div className='bg-gray-200 h-25 w-25 sm:h-28 sm:w-28 mr-2 flex items-center rounded-2xl justify-center'>
          <div className='spinner border-4 border-gray-400 border-t-gray-200 rounded-full w-10 h-10 animate-spin' />
        </div>
      ) : isValidImage ? (
        <div
          className={clsx(
            'rounded-2xl h-25 w-25 sm:h-28 sm:w-28 mr-2 overflow-hidden',
            'cursor-pointer hover:brightness-90 transition border border-gray-200',
          )}
          onClick={handleImageUpload || undefined}
        >
          <Image
            src={finalImage}
            className='h-full w-full object-center object-cover'
            onError={handleImageError}
          />
        </div>
      ) : (
        <Button
          onClick={handleImageUpload}
          className={clsx(
            'h-25 w-25 sm:h-28 sm:w-28 mr-2 flex items-center justify-center bg-gray-200 rounded-2xl',
            'cursor-pointer hover:brightness-90 text-gray-600 text-[50px]',
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
      <div className='flex flex-col flex-1 leading-6'>
        <Controller
          name='title'
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              label=''
              placeholder='제목을 입력해주세요'
              onChange={(e) => {
                field.onChange(e);
              }}
              onBlur={() => {
                field.onBlur();
              }}
              value={field.value}
              errorMessage={fieldState.error?.message}
              className='text-sm sm:text-base text-black font-semibold break-words'
            />
          )}
        />
        <p className='text-xs text-stone font-medium leading-6 ml-2'>{platform}</p>
      </div>
    </div>
  );
};

export default LinkCard;
