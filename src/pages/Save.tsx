import { useNavigate } from 'react-router-dom';
import { tv } from 'tailwind-variants';
import { Memo, Alarm, LinkField, CategoryTagSelector, SaveButton } from '@/components/ui/cardLink';
import {
  isSaveButtonDisabledAtom,
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
import { useForm, type FieldErrors } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import DeleteModal from '@/components/ui/modal/DeleteModal';
import { BackArrowIcon } from '@/assets';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { getBookmark } from '@/api/bookmark/bookmark';
import { formatDate } from '@/constants/dataFormat';

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
  const navigate = useNavigate();
  const { id } = useParams();
  const { saveLinkData } = SaveButton();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [previewImage, setPreviewImage] = useAtom(previewImageAtom);
  const isSaveButtonDisabled = useAtomValue(isSaveButtonDisabledAtom);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const setCard = useSetAtom(visibleCardAtom);
  const setVisibleCate = useSetAtom(visibleCategoryAtom);
  const setVisibleTag = useSetAtom(visibleTagAtom);
  const setSelectedCategory = useSetAtom(selectedCategoryAtom);
  const setSelectedTag = useSetAtom(selectedTagAtom);
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

  // 변경사항 추적을 위한 상태
  const [hasChanges, setHasChanges] = useState(false);

  // 수정 모드에서 기존 데이터 조회
  const { data: bookmarkData, isPending } = useQuery({
    queryKey: ['bookmark', id],
    queryFn: async () => {
      const res = await getBookmark(Number(id));
      if (res.error) {
        throw new Error(res.message);
      }
      return res.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    setCard(false);
  }, [setCard]);

  const onPrev = () => {
    setVisibleCate(false);
    setVisibleTag(false);
    setSelectedCategory('');
    setSelectedTag([]);
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
    watch,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues,
  });

  useEffect(() => {
    if (id && !isPending && bookmarkData) {
      let date = '';
      let time = '';

      if (bookmarkData.notificationResponse) {
        date = formatDate('2025-08-05T06:31:05.620Z');
        time = new Date('2025-08-05T06:31:05.620Z').toLocaleTimeString('ko-KR', {
          hour: 'numeric',
          hour12: true,
        });
      }

      const newValues = {
        url: bookmarkData.url,
        tags: bookmarkData.categoryTagInfos[0].tags.map((tag) => tag.tagName),
        category: bookmarkData.categoryTagInfos[0].categoryName,
        title: bookmarkData.title,
        platform: bookmarkData.platform,
        image: bookmarkData.file.fileUrl,
        memo: bookmarkData.memo,
        date: date,
        time: time,
      };

      // 기존 데이터 설정
      setCard(true);
      setVisibleCate(true);
      setVisibleTag(true);
      setSelectedCategory(newValues.category);
      setSelectedTag(newValues.tags);
      setDefaultValues(newValues);
      reset(newValues);
    }
  }, [
    id,
    reset,
    getValues,
    isPending,
    bookmarkData,
    setSelectedCategory,
    setSelectedTag,
    setCard,
    setVisibleCate,
    setVisibleTag,
  ]);

  const watchedValues = watch();

  useEffect(() => {
    if (type === 'create') {
      // create 모드에서는 URL이 입력되면 변경사항 있음으로 간주
      setHasChanges(!!watchedValues.url?.trim());
    } else {
      // edit 모드에서는 초기값과 현재값 비교
      const isChanged =
        watchedValues.url !== defaultValues.url ||
        watchedValues.title !== defaultValues.title ||
        watchedValues.category !== defaultValues.category ||
        JSON.stringify(watchedValues.tags?.sort()) !== JSON.stringify(defaultValues.tags?.sort()) ||
        watchedValues.memo !== defaultValues.memo ||
        watchedValues.date !== defaultValues.date ||
        watchedValues.time !== defaultValues.time ||
        watchedValues.image !== defaultValues.image;

      setHasChanges(isChanged);
    }
  }, [watchedValues, defaultValues, type]);

  const onSubmit = (data: z.infer<typeof schema>) => {
    if (type === 'edit') {
      console.log(data);
      return;
    }
    console.log(data);
    saveLinkData(data);
    setPreviewImage(undefined);
    onPrev();
  };

  const handleBackClick = () => {
    if (hasChanges) setIsDeleteModalOpen(true);
    else onPrev();
  };

  // 유효한 데이터 handleSubmit
  const handleSave = () => {
    if (previewImage) {
      setValue('image', previewImage);
      setTimeout(() => handleSubmit(onSubmit)(), 0);
    } else {
      handleSubmit(onSubmit)();
    }
  };

  // 유효하지 않은 데이터 handleSubmit
  const handleSaveError = (errors: FieldErrors<z.infer<typeof schema>>) => {
    let errorMessage = '';
    if (errors.image) {
      errorMessage = errors.image.message ?? '이미지를 선택해주세요';
    } else if (errors.title) {
      errorMessage = errors.title.message ?? '제목을 입력해주세요';
    } else if (errors.url) {
      errorMessage = errors.url.message ?? 'URL을 입력해주세요';
    } else if (errors.category) {
      errorMessage = errors.category.message ?? '카테고리를 선택해주세요';
    } else if (errors.tags) {
      errorMessage = errors.tags.message ?? '태그를 선택해주세요';
    } else {
      errorMessage = '모든 필드를 올바르게 입력해주세요.';
    }
    toast.dismiss();
    toast.error(errorMessage);
  };

  return (
    <>
      <form id='save-form' onSubmit={handleSubmit(handleSave, handleSaveError)}>
        <div className='fixed inset-0 z-100 justify-center flex flex-col items-center bg-[#adadb1]/60 backdrop-blur-[25px] w-full h-full'>
          <div className='absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-white/80 via-white/60 to-transparent'>
            <div className='relative w-[90%] sm:w-[600px] mx-auto flex flex-row items-center justify-center mt-5'>
              <div
                onClick={handleBackClick}
                className='absolute left-0 rounded-[100px] bg-[#EAEDF5]/90 p-2.5 hover:brightness-90 transition border border-gray cursor-pointer'
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
            >
              {type === 'create' ? '저장하기' : '수정하기'}
            </button>
          </div>
        </div>
      </form>
      {hasChanges && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          isAlert={true}
          onCancel={() => setIsDeleteModalOpen(false)}
          warningText='링크 저장을 중단하고 나가시겠습니까?'
          subText='입력한 내용이 모두 삭제되며, 저장되지 않습니다.'
          onDelete={() => {
            setIsDeleteModalOpen(false);
            onPrev();
          }}
          onScrollLock={false}
        />
      )}
    </>
  );
};

export default Save;
