import { getSuggestionTag } from '@/agent/TagAgent';
import {
  linkAtom,
  memoAtom,
  suggestionListAtom,
  visibleCardAtom,
  visibleCategoryAtom,
  visibleMemoAndAlarmAtom,
  visibleTagAtom,
} from '@/atoms';
import LinkCard from '@/components/ui/card/LinkCard';
import TextField from '@/components/ui/TextField';
import { useAtom, useSetAtom } from 'jotai';

interface ILinkField {
  isOpen?: boolean;
  cardLink?: string;
  // eslint-disable-next-line no-unused-vars
  setCardLink?: (value: string) => void;
  title?: string;
  platform?: string;
  editable?: boolean;
  isLoading?: boolean;
  image?: string;
}

const LinkField = ({
  isOpen,
  cardLink,
  setCardLink,
  title = '제목',
  platform = '플랫폼',
  image,
  editable = true,
  isLoading = false,
}: ILinkField) => {
  const [visibleCard, setVisibleCard] = useAtom(visibleCardAtom);
  const visible = isOpen ?? visibleCard;
  const setVisibleCategory = useSetAtom(visibleCategoryAtom);
  const setVsibleTag = useSetAtom(visibleTagAtom);
  const setSuggestionList = useSetAtom(suggestionListAtom);
  const setVisibleMemoAndAlarm = useSetAtom(visibleMemoAndAlarmAtom);
  const [link, setLink] = useAtom(linkAtom);
  const resetMemo = useSetAtom(memoAtom);

  const handleLink = (v: string) => {
    if (setCardLink) {
      setCardLink(v); // 로컬 state에서 온 경우
    } else {
      setLink(v); // jotai atom을 사용하는 경우
    }

    // 임시로 링크가 있으면 카테고리 보여주기 -> 추후에는 링크가 올바른지 여부 확인 필요
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
    } else {
      // 링크가 없으면 전부 안보여주기
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
      <TextField
        label=''
        placeholder='제목을 입력해주세요'
        onChange={handleLink}
        initialValue={cardLink ?? link}
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
