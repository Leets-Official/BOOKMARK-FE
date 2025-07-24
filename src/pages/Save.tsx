import { isMobile } from 'react-device-detect';
import CommonHeader from '@/components/layout/header/CommonHeader';
import { useNavigate } from 'react-router-dom';
import { tv } from 'tailwind-variants';
import { Memo, Alarm, LinkField, CategoryTagSelector } from '@/components/ui/cardLink';
import {
  isSaveButtonDisabledAtom,
  linkAtom,
  memoAtom,
  visibleCardAtom,
  visibleCategoryAtom,
  visibleTagAtom,
} from '@/atoms';
import { useAtomValue, useSetAtom } from 'jotai';
import { useScrollLock } from '@/hooks/ScrollLock';
import { saveSchema } from '@/schema/save';
import { zodResolver } from '@hookform/resolvers/zod';
import type z from 'zod';
import { useForm } from 'react-hook-form';

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

const Save = () => {
  useScrollLock(true); // PC일 때는 스크롤 방지
  const isSaveButtonDisabled = useAtomValue(isSaveButtonDisabledAtom);
  const navigate = useNavigate();

  const resetLink = useSetAtom(linkAtom);
  const resetCard = useSetAtom(visibleCardAtom);
  const resetVisibleCate = useSetAtom(visibleCategoryAtom);
  const resetVisibleTag = useSetAtom(visibleTagAtom);
  const resetMemo = useSetAtom(memoAtom);

  const onPrev = () => {
    resetLink('');
    resetCard(false);
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
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      url: '',
      tags: [],
      category: '',
      title: '',
      platform: '',
      memo: '',
      date: '',
      time: '',
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log('저장 완료');
    console.log(data);
  };

  return (
    // PC : 모달형식, 모바일 : 전체화면
    <form id='save-form' onSubmit={handleSubmit(onSubmit)}>
      <div className={Overlay({ isMobile })} onClick={!isMobile ? onPrev : undefined}>
        <div className={Container({ isMobile })} onClick={(e) => e.stopPropagation()}>
          <div className='absolute top-0 left-0 right-0 z-10'>
            <CommonHeader title='링크 저장' />
          </div>
          <div className='flex-1 overflow-y-auto hide-scrollbar w-full pt-13 pb-20'>
            {/* 카드 모음 */}
            <div className='flex flex-col items-center gap-3 w-full p-4'>
              <LinkField control={control} setValue={setValue} />
              <CategoryTagSelector setValue={setValue} error={errors} />
              <Memo control={control} />
              <Alarm setValue={setValue} />
            </div>
          </div>
          <div className='absolute bottom-0 left-0 right-0 z-10 flex justify-center pb-8'>
            <button
              type='submit'
              form='save-form'
              className={SaveButton({ isDisabled: isSaveButtonDisabled })}
            >
              저장하기
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Save;
