import { getBookmarksURL } from '@/api/bookmark/bookmark';
import { getSuggestionTags } from '@/api/tag/tag';
import {
  suggestionListAtom,
  visibleCardAtom,
  visibleCategoryAtom,
  visibleMemoAndAlarmAtom,
  visibleTagAtom,
  isSuggestionLoadingAtom,
  viewImageAtom,
} from '@/atoms';
import LinkCard from '@/components/ui/card/LinkCard';
import TextField from '@/components/ui/TextField';
import type { saveSchema } from '@/schema/save';
import type { BookMarkURLProps } from '@/types/api/bookmark';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Controller, type Control, type UseFormSetValue } from 'react-hook-form';
import type z from 'zod';
import { getThumbnailImage } from '@/api/file/thumbnail_api';
import toast from 'react-hot-toast';

interface ILinkField {
  editable?: boolean;
  isLoading?: boolean;
  control: Control<z.infer<typeof saveSchema>>;
  setValue: UseFormSetValue<z.infer<typeof saveSchema>>;
  isEdit: boolean;
}

const LinkField = ({ isLoading = false, control, setValue, isEdit = false }: ILinkField) => {
  const [visibleCard, setVisibleCard] = useAtom(visibleCardAtom);
  const setVisibleCategory = useSetAtom(visibleCategoryAtom);
  const setVisibleTag = useSetAtom(visibleTagAtom);
  const setSuggestionList = useSetAtom(suggestionListAtom);
  const setIsSuggestionLoading = useSetAtom(isSuggestionLoadingAtom);
  const setVisibleMemoAndAlarm = useSetAtom(visibleMemoAndAlarmAtom);

  const queryClient = useQueryClient();

  const [flag, setFlag] = useState(isEdit);

  const [image, setImage] = useAtom(viewImageAtom);

  // 썸네일 이미지 API 호출
  const { refetch: refetchThumbnailImage, data: thumbnailImage } = useQuery({
    queryKey: ['thumbnailImage', image],
    queryFn: async () => {
      if (!image) return null;
      const response = await getThumbnailImage(image);
      if (response.error) {
        console.error('썸네일 이미지 가져오기 실패:', response.message);
        toast.error(response.message || '썸네일 이미지 가져오기 실패');
        throw new Error(response.message || '썸네일 이미지 가져오기 실패');
      }
      setImage(response.data);
      return response.data;
    },
    enabled: false,
    retry: 0,
  });

  useEffect(() => {
    // 수정 모드일 때는 썸네일 이미지를 다시 가져오지 않음
    if (control._formValues.url && !isEdit) {
      refetchThumbnailImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [control._formValues.url, isEdit]);

  // Blob URL 정리
  useEffect(() => {
    return () => {
      if (thumbnailImage && thumbnailImage.startsWith('blob:')) {
        URL.revokeObjectURL(thumbnailImage);
      }
    };
  }, [thumbnailImage]);

  const {
    data: bookmarkUrlData,
    refetch,
    isFetching,
  } = useQuery<BookMarkURLProps[]>({
    queryKey: ['bookmarkPreview'],
    queryFn: async () => {
      const res = await getBookmarksURL(control._formValues.url);
      if (res.error) {
        throw new Error(res.message);
      }

      const { title, thumbnailUrl, platform, faviconUrl } = res.data[0];

      setValue('title', title, { shouldValidate: true });
      setValue('platform', platform);
      setValue('favicon', faviconUrl);
      setValue('image', thumbnailUrl);
      return res.data;
    },
    enabled: false,
    gcTime: 0, // 즉시 가비지 컬렉션
    staleTime: 0, // 항상 stale로 처리
  });

  useEffect(() => {
    const handleBookmarkUrlInfo = async () => {
      // 수정 모드일 때는 처음에 로드 안함
      if (flag) {
        setFlag(false);
        return;
      }

      if (bookmarkUrlData && bookmarkUrlData.length > 0) {
        const { title, thumbnailUrl, platform, faviconUrl } = bookmarkUrlData[0];
        setValue('title', title, { shouldValidate: true });
        setValue('platform', platform);
        setValue('favicon', faviconUrl);
        setImage(thumbnailUrl);

        // AI 추천 태그 가져오기
        setIsSuggestionLoading(true);
        try {
          const res = await getSuggestionTags(title);

          // API 응답 구조 확인 및 처리
          if (res.data?.tags && Array.isArray(res.data.tags)) {
            const suggestionTags = res.data.tags.map((tag: string, index: number) => ({
              id: index,
              content: tag,
              isSelected: false,
              type: 'suggestion' as const,
            }));
            setSuggestionList(suggestionTags);
          } else {
            setSuggestionList([]);
          }
        } catch (error) {
          console.error('Failed to get suggestion tags:', error);
          setSuggestionList([]);
        } finally {
          setIsSuggestionLoading(false);
        }
      }
    };

    handleBookmarkUrlInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookmarkUrlData, setIsSuggestionLoading, setSuggestionList, setValue]);

  const handleLink = (v: string) => {
    if (v.length > 0) {
      refetch();
      setVisibleCard(true);
      setVisibleCategory(true);

      // 카테고리가 이미 선택되어 있는 경우(edit) 태그 보여주기
      if (control._formValues.category) {
        setVisibleTag(true);
      }
    }
  };

  const handleSetVisible = (e: string) => {
    if (e.length > 0) {
      setVisibleCard(true);
      setVisibleCategory(true);
      if (control._formValues.category) {
        setVisibleTag(true);
      }
    } else {
      setVisibleCard(false);
      setVisibleCategory(false);
      setVisibleTag(false);
      setVisibleMemoAndAlarm(false);
      setSuggestionList([]); // 제안 리스트 빈 배열로 초기화
    }
  };

  return (
    <div className='bg-white w-full rounded-xl shadow-[0_2px_7px_rgba(2,34,94,0.1)] px-3 sm:px-6 pb-4'>
      <p className='text-sm text-stone font-semibold mt-4'>
        링크 입력<span className='text-redText'>*</span>
      </p>
      {isEdit ? (
        <div className='flex items-center relative mt-2 border border-gray rounded-lg'>
          <p className='w-full text-15 p-4 py-3 leading-5 text-grayText'>
            {control._formValues.url}
          </p>
        </div>
      ) : (
        <Controller
          name='url'
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              label=''
              placeholder='링크를 입력해주세요'
              onChange={(e) => {
                field.onChange(e);
                if (e.length === 0) {
                  queryClient.removeQueries({ queryKey: ['bookmarkPreview'] });
                  setValue('title', '');
                  setValue('image', '');
                  setValue('platform', '');
                  setValue('favicon', '');
                  setImage('');
                }
              }}
              onBlur={() => {
                field.onBlur();
                handleLink(field.value);
                handleSetVisible(field.value);
              }}
              value={field.value}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
      )}
      {visibleCard && (
        <>
          <hr className='border-t-2 border-lightGrayBlue my-4' />
          <LinkCard
            control={control}
            setValue={setValue}
            platform={control._formValues.platform}
            isLoading={isLoading || isFetching || image === ''}
          />
        </>
      )}
    </div>
  );
};

export default LinkField;
