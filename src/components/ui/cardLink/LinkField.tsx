import { getBookmarksURL } from '@/api/bookmark/bookmark';
import { getPresignedUrl } from '@/api/file/presigned_url_api';
import { getSuggestionTags } from '@/api/tag/tag';
import {
  suggestionListAtom,
  visibleCardAtom,
  visibleCategoryAtom,
  visibleMemoAndAlarmAtom,
  visibleTagAtom,
  isSuggestionLoadingAtom,
} from '@/atoms';
import LinkCard from '@/components/ui/card/LinkCard';
import TextField from '@/components/ui/TextField';
import type { saveSchema } from '@/schema/save';
import type { BookMarkURLProps } from '@/types/api/bookmark';
import { S3UploadImage } from '@/utils/S3PresignedImage';
import { useQuery } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Controller, type Control, type UseFormSetValue } from 'react-hook-form';
import type z from 'zod';

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

  const [flag, setFlag] = useState(isEdit);

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
      return res.data;
    },
    enabled: false,
  });

  useEffect(() => {
    const uploadlImageAndSuggestion = async () => {
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

        // thumbnailUrl이 유효하면 presigned 방식으로 S3 업로드
        if (thumbnailUrl && thumbnailUrl.startsWith('http')) {
          const uploadedImageUrl = await S3UploadImage(
            thumbnailUrl,
            `bookmark-${Date.now()}.jpg`,
            getPresignedUrl,
          );
          if (uploadedImageUrl) {
            setValue('image', uploadedImageUrl); // 업로드한 URL로 설정
          } else {
            setValue('image', thumbnailUrl); // fallback
          }
        }

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

    uploadlImageAndSuggestion();
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
      <Controller
        name='url'
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            label=''
            placeholder='링크를 입력해주세요'
            onChange={(e) => {
              field.onChange(e);
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
      {visibleCard && (
        <>
          <hr className='border-t-2 border-lightGrayBlue my-4' />
          <LinkCard
            control={control}
            setValue={setValue}
            platform={control._formValues.platform}
            image={control._formValues.image}
            isLoading={isLoading || isFetching}
          />
        </>
      )}
    </div>
  );
};

export default LinkField;
