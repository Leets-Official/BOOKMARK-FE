import { getSuggestionTag } from '@/agent/TagAgent';
import {
  categoryListAtom,
  linkAtom,
  suggestionListAtom,
  tagListAtom,
  visibleCardAtom,
  visibleCategoryAtom,
} from '@/atoms';
import LinkCard from '@/components/ui/card/LinkCard';
import TextField from '@/components/ui/TextField';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

const LinkField = () => {
  const [visibleCard, setVisibleCard] = useAtom(visibleCardAtom);
  const setVisibleCategory = useSetAtom(visibleCategoryAtom);
  const setSuggestionList = useSetAtom(suggestionListAtom);
  const setCategoryList = useSetAtom(categoryListAtom);
  const setTagList = useSetAtom(tagListAtom);
  const categoryList = useAtomValue(categoryListAtom);
  const tagList = useAtomValue(tagListAtom);
  const suggestionList = useAtomValue(suggestionListAtom);
  const [link, setLink] = useAtom(linkAtom);

  const handleLink = (v: string) => {
    setLink(v);

    // 임시로 링크가 있으면 카테고리, 태그 보여주기 -> 추후에는 링크가 올바른지 여부 확인 필요
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
      // 링크가 없으면 카테고리, 태그 안보여주기 및 카테고리, 태그 선택 초기화
      setVisibleCard(false);
      setVisibleCategory(false);
      setCategoryList(categoryList.map((c) => ({ ...c, isSelected: false })));
      setTagList(tagList.map((t) => ({ ...t, isSelected: false })));
      setSuggestionList(suggestionList.map((s) => ({ ...s, isSelected: false })));
    }
  };

  return (
    <div className='bg-white w-full rounded-[12px] shadow p-2 flex flex-col gap-3'>
      <TextField
        label='링크입력'
        placeholder='제목을 입력해주세요'
        onChange={handleLink}
        isCreateType={false}
      />
      {visibleCard && (
        <>
          <hr className='border-t-2 border-lightGrayBlue my-1' />
          <LinkCard title={link} platform='youtube' isLoading={false} editable={true} />
        </>
      )}
    </div>
  );
};

export default LinkField;
