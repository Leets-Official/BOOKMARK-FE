import { isMobile } from 'react-device-detect';
import CommonHeader from '@/components/layout/header/CommonHeader';
import { useNavigate } from 'react-router-dom';
import { tv } from 'tailwind-variants';
import { Memo, Alarm, LinkField, CategoryTagSelector } from '@/components/ui/cardLink';
import {
  isSaveButtonDisabledAtom,
  linkAtom,
  memoAtom,
  previewImageAtom,
  visibleCardAtom,
  visibleCategoryAtom,
  visibleTagAtom,
} from '@/atoms';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useScrollLock } from '@/hooks/scrollLock';
import { saveSchema } from '@/schema/save';
import { zodResolver } from '@hookform/resolvers/zod';
import type z from 'zod';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Overlay = tv({
  base: 'fixed inset-0 z-100 flex items-center justify-center',
  variants: {
    isMobile: {
      true: '',
      false: 'bg-black/50',
    },
  },
});

const Container = tv({
  base: 'flex flex-col items-center bg-grayBg/60 backdrop-blur-md overflow-y-auto hide-scrollbar border-none',
  variants: {
    isMobile: {
      true: 'h-full w-full',
      false: 'w-[369px] h-[773px] rounded-[30px] border fixed',
    },
  },
});

const SaveButton = tv({
  base: 'bg-blue text-base text-white text-center font-medium p-4 w-[90%] rounded-[10px]',
  variants: {
    isDisabled: {
      true: 'bg-lightBlueGray text-veryLightGray',
      false: 'bg-blue text-white cursor-pointer hover:brightness-90 transition',
    },
  },
});

interface SaveInterfaceProps {
  type: 'create' | 'edit';
}

const Save = ({ type }: SaveInterfaceProps) => {
  useScrollLock(true); // PC일 때는 스크롤 방지
  const isSaveButtonDisabled = useAtomValue(isSaveButtonDisabledAtom);
  const navigate = useNavigate();

  const resetLink = useSetAtom(linkAtom);
  const resetCard = useSetAtom(visibleCardAtom);
  const resetVisibleCate = useSetAtom(visibleCategoryAtom);
  const resetVisibleTag = useSetAtom(visibleTagAtom);
  const resetMemo = useSetAtom(memoAtom);
  const [previewImage, setPreviewImage] = useAtom(previewImageAtom);
  const [defaultValues, setDefaultValues] = useState<z.infer<typeof saveSchema>>({
    url: '',
    tags: [],
    category: '',
    title: '',
    platform: '',
    image: '',
    memo: '',
    date: '',
    time: '',
  });

  useEffect(() => {
    resetLink('');
    resetCard(false);
  }, [resetLink, resetCard]);

  const onPrev = () => {
    resetVisibleCate(false);
    resetVisibleTag(false);
    resetMemo('');
    reset();
    navigate(-1);
  };

  const schema = saveSchema;

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
    getValues,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues,
  });

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const newValues = {
        url: 'https://www.google.com',
        tags: ['파스타', '이탈리안', '데이트'],
        category: '맛집',
        title: '홍대 파스타 맛집 추천',
        platform: '인스타그램',
        image: 'https://cdn.pixabay.com/photo/2018/04/26/16/31/marine-3352341_1280.jpg',
        memo: '홍대 파스타 맛집 추천',
        date: '내일 (금)',
        time: '12:00',
      };
      setDefaultValues(newValues);
      reset(newValues);
    }
  }, [id, reset, getValues]);

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log('저장 완료');
    console.log(data);

    // 미리보기 이미지 초기화
    setPreviewImage(undefined);
    onPrev();
  };

  const handleSave = () => {
    if (previewImage) {
      setValue('image', previewImage);
      setTimeout(() => {
        handleSubmit(onSubmit)();
      }, 0);
    } else {
      handleSubmit(onSubmit)();
    }
  };

  return (
    // PC : 모달형식, 모바일 : 전체화면
    <form id='save-form' onSubmit={handleSubmit(handleSave)}>
      <div className={Overlay({ isMobile })} onClick={!isMobile ? onPrev : undefined}>
        <div className={Container({ isMobile })} onClick={(e) => e.stopPropagation()}>
          <div className='absolute top-0 left-0 right-0 z-10'>
            <CommonHeader title='링크 저장' />
          </div>
          <div className='flex-1 overflow-y-auto hide-scrollbar w-full pt-13 pb-20'>
            {/* 카드 모음 */}
            <div className='flex flex-col items-center gap-3 w-full p-4'>
              <LinkField control={control} setValue={setValue} />
              <CategoryTagSelector
                setValue={setValue}
                error={errors}
                editCate={defaultValues.category}
                editTag={defaultValues.tags}
              />
              <Memo control={control} />
              <Alarm
                setValue={setValue}
                editDate={defaultValues.date}
                editTime={defaultValues.time}
              />
            </div>
          </div>
          <div className='absolute bottom-0 left-0 right-0 z-10 flex justify-center pb-8'>
            <button
              type='submit'
              form='save-form'
              className={SaveButton({ isDisabled: isSaveButtonDisabled })}
              disabled={isSaveButtonDisabled}
            >
              {type === 'create' ? '저장하기' : '수정하기'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Save;
