import { getSuggestionTag } from '@/agent/TagAgent';
import {
  memoAtom,
  suggestionListAtom,
  visibleCardAtom,
  visibleCategoryAtom,
  visibleMemoAndAlarmAtom,
  visibleTagAtom,
} from '@/atoms';
import LinkCard from '@/components/ui/card/LinkCard';
import TextField from '@/components/ui/TextField';
import type { saveSchema } from '@/schema/save';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { Controller, type Control, type UseFormSetValue } from 'react-hook-form';
import type z from 'zod';

interface ILinkField {
  isOpen?: boolean;
  title?: string;
  platform?: string;
  editable?: boolean;
  isLoading?: boolean;
  image?: string;
  control: Control<z.infer<typeof saveSchema>>;
  setValue: UseFormSetValue<z.infer<typeof saveSchema>>;
}

const LinkField = ({
  isOpen,
  title = '제목',
  platform = '플랫폼',
  image,
  editable = true,
  isLoading = false,
  control,
  setValue,
}: ILinkField) => {
  const [visibleCard, setVisibleCard] = useAtom(visibleCardAtom);
  const visible = isOpen ?? visibleCard;
  const setVisibleCategory = useSetAtom(visibleCategoryAtom);
  const setVsibleTag = useSetAtom(visibleTagAtom);
  const setSuggestionList = useSetAtom(suggestionListAtom);
  const setVisibleMemoAndAlarm = useSetAtom(visibleMemoAndAlarmAtom);
  const resetMemo = useSetAtom(memoAtom);

  // 링크가 있으면 카테고리 보여주기
  useEffect(() => {
    if (control._formValues.url) {
      setVisibleCard(true);
      setVisibleCategory(true);
    }
  }, [control._formValues.url, setVisibleCard, setVisibleCategory]);

  const handleLink = (v: string) => {
    // 임시로 링크가 있으면 카테고리 보여주기 -> 추후에는 링크가 올바른지 및 추출 구현 필요
    // 임시 제목, 플랫폼, 이미지 설정
    setValue('title', '제목');
    setValue('platform', '플랫폼');
    setValue('image', 'https://www.google.com/image.png');

    if (v.length > 0) {
      setVisibleCard(true);
      setVisibleCategory(true);
      // 제목이 있으면 태그 제안 가져오기
      getSuggestionTag(v).then((res) => {
        setSuggestionList(
          res.tags.map((t: string, index: number) => ({
            id: index,
            content: t,
            isSelected: false,
            type: 'suggestion',
          })),
        );
      });
    }
  };

  const handleSetVisible = (e: string) => {
    if (e.length > 0) {
      setVisibleCard(true);
      setVisibleCategory(true);
    } else {
      setVisibleCard(false);
      setVisibleCategory(false);
      setVsibleTag(false);
      setVisibleMemoAndAlarm(false);
      setSuggestionList([]); // 제안 리스트 빈 배열로 초기화
      resetMemo('');
    }
  };

  return (
    <div className='bg-white w-full rounded-xl shadow-[0_2px_7px_rgba(2,34,94,0.1)] px-3 pb-4'>
      <p className='text-sm text-stone font-semibold mt-4'>
        링크 입력<span className='text-[#FF2C3D]'>*</span>
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
      {visible && (
        <>
          <hr className='border-t-2 border-lightGrayBlue my-4' />
          <LinkCard
            title={title}
            platform={platform}
            isLoading={isLoading}
            editable={editable}
            image={image}
          />
        </>
      )}
    </div>
  );
};

export default LinkField;
