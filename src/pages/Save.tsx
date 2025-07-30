import { useNavigate } from 'react-router-dom';
import { tv } from 'tailwind-variants';
import { Memo, Alarm, LinkField, CategoryTagSelector, SaveButton } from '@/components/ui/cardLink';
import {
  isSaveButtonDisabledAtom,
  linkAtom,
  memoAtom,
  previewImageAtom,
  selectedCategoryAtom,
  selectedTagAtom,
  tempCategoriesAtom,
  tempTagsAtom,
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
import clsx from 'clsx';
import DeleteModal from '@/components/ui/modal/DeleteModal';
import { BackArrowIcon } from '@/assets';
import toast from 'react-hot-toast';

const SaveButtonClass = tv({
  base: 'bg-blue text-base text-white text-center font-medium p-4 w-[90%] sm:w-[400px] rounded-[10px]',
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
  const { saveLinkData } = SaveButton();
  const navigate = useNavigate();
  const { id } = useParams();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [previewImage, setPreviewImage] = useAtom(previewImageAtom);
  const isSaveButtonDisabled = useAtomValue(isSaveButtonDisabledAtom);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const resetLink = useSetAtom(linkAtom);
  const resetCard = useSetAtom(visibleCardAtom);
  const resetVisibleCate = useSetAtom(visibleCategoryAtom);
  const resetVisibleTag = useSetAtom(visibleTagAtom);
  const resetMemo = useSetAtom(memoAtom);
  const resetSelectedCategory = useSetAtom(selectedCategoryAtom);
  const resetSelectedTag = useSetAtom(selectedTagAtom);
  const resetTempCategories = useSetAtom(tempCategoriesAtom);
  const resetTempTags = useSetAtom(tempTagsAtom);
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
    resetSelectedCategory('');
    resetSelectedTag([]);
    resetTempCategories([]);
    resetTempTags({});
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
    console.log(data);
    saveLinkData();
    setPreviewImage(undefined);
    onPrev();
    toast.success('저장되었습니다');
  };

  const handleSave = () => {
    if (previewImage) {
      setValue('image', previewImage);
      setTimeout(() => handleSubmit(onSubmit)(), 0);
    } else {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <>
      <form id='save-form' onSubmit={handleSubmit(handleSave)}>
        <div className='fixed inset-0 z-100 justify-center flex flex-col items-center bg-[#adadb1]/60 backdrop-blur-[25px] w-full h-full'>
          <div className='absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-white/80 via-white/60 to-transparent'>
            <div className='relative w-[90%] sm:w-[600px] mx-auto flex flex-row items-center justify-center mt-5'>
              <div
                onClick={() => setIsDeleteModalOpen(true)}
                className='absolute left-0 rounded-[100px] bg-[#EAEDF5]/90 p-2.5 hover:brightness-90 transition border border-gray'
              >
                <BackArrowIcon width={20} height={20} />
              </div>
              <p className='text-base font-semibold'>
                {type === 'create' ? '링크 저장' : '링크 수정'}
              </p>
            </div>
          </div>
          <div
            className={clsx(
              'flex-1 w-[90%] sm:w-[600px] pt-13 pb-20',
              isDropdownOpen ? 'overflow-hidden' : 'overflow-y-auto hide-scrollbar',
            )}
          >
            <div className='flex flex-col items-center gap-3 w-full py-5'>
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
                onDropdownScroll={setIsDropdownOpen}
              />
            </div>
          </div>
          <div className='absolute bottom-0 left-0 right-0 z-10 flex justify-center pb-8'>
            <button
              type='submit'
              form='save-form'
              className={SaveButtonClass({ isDisabled: isSaveButtonDisabled })}
              disabled={isSaveButtonDisabled}
            >
              {type === 'create' ? '저장하기' : '수정하기'}
            </button>
          </div>
        </div>
      </form>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        warningText='저장하지 않고 나가시겠습니까?'
        subText='지금까지 입력한 내용이 모두 사라집니다.'
        onDelete={() => {
          setIsDeleteModalOpen(false);
          onPrev();
        }}
      />
    </>
  );
};

export default Save;
