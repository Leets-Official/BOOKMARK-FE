import { getSuggestionTag } from '@/agent/TagAgent';
import { getBookmarksURL } from '@/api/bookmark/bookmark';
import {
  memoAtom,
  suggestionListAtom,
  visibleCardAtom,
  visibleCategoryAtom,
  visibleMemoAndAlarmAtom,
  visibleTagAtom,
  isSuggestionLoadingAtom,
  previewImageAtom,
} from '@/atoms';
import LinkCard from '@/components/ui/card/LinkCard';
import TextField from '@/components/ui/TextField';
import type { saveSchema } from '@/schema/save';
import type { BookMarkURLProps } from '@/types/api/bookmark';
import { useQuery } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { Controller, type Control, type UseFormSetValue } from 'react-hook-form';
import type z from 'zod';

interface ILinkField {
  editable?: boolean;
  isLoading?: boolean;
  control: Control<z.infer<typeof saveSchema>>;
  setValue: UseFormSetValue<z.infer<typeof saveSchema>>;
}

const LinkField = ({ isLoading = false, control, setValue }: ILinkField) => {
  const [visibleCard, setVisibleCard] = useAtom(visibleCardAtom);
  const setVisibleCategory = useSetAtom(visibleCategoryAtom);
  const setVisibleTag = useSetAtom(visibleTagAtom);
  const setSuggestionList = useSetAtom(suggestionListAtom);
  const setIsSuggestionLoading = useSetAtom(isSuggestionLoadingAtom);
  const setVisibleMemoAndAlarm = useSetAtom(visibleMemoAndAlarmAtom);
  const resetPreURL = useSetAtom(previewImageAtom);
  const resetMemo = useSetAtom(memoAtom);

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

  // 링크가 있으면 카테고리 보여주기
  useEffect(() => {
    if (control._formValues.url) {
      setVisibleCard(true);
      setVisibleCategory(true);
    }
  }, [control._formValues.url, setVisibleCard, setVisibleCategory]);

  useEffect(() => {
    if (bookmarkUrlData && bookmarkUrlData.length > 0) {
      const { title, thumbnailUrl, platform } = bookmarkUrlData[0];
      setValue('title', title);
      setValue('image', thumbnailUrl);
      setValue('platform', platform);
    }
  }, [bookmarkUrlData, setValue]);

  const handleLink = (v: string) => {
    if (v.length > 0) {
      refetch();
      setVisibleCard(true);
      setVisibleCategory(true);

      // 카테고리가 이미 선택되어 있는 경우(edit) 태그 보여주기
      if (control._formValues.category) {
        setVisibleTag(true);
      }
      // 제목이 있으면 태그 제안 가져오기
      setIsSuggestionLoading(true);
      getSuggestionTag(v)
        .then((res) => {
          setSuggestionList(
            res.tags.map((t: string, index: number) => ({
              id: index,
              content: t,
              isSelected: false,
              type: 'suggestion',
            })),
          );
        })
        .finally(() => {
          setIsSuggestionLoading(false);
        });
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
      resetPreURL(null);
      resetMemo('');
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
              handleSetVisible(e);
            }}
            onBlur={() => {
              field.onBlur();
              handleLink(field.value);
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
            title={control._formValues.title}
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
