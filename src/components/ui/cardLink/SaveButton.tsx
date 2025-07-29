import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  tempCategoriesAtom,
  tempTagsAtom,
  visibleTagAtom,
  visibleMemoAndAlarmAtom,
  selectedCategoryAtom,
  selectedTagAtom,
} from '@/atoms';
import { createCategory, getCategories } from '@/api/category/category';
import { createTag } from '@/api/tag/tag';

const SaveButton = () => {
  const tempCategories = useAtomValue(tempCategoriesAtom);
  const tempTags = useAtomValue(tempTagsAtom);
  const selectedCategory = useAtomValue(selectedCategoryAtom);
  const selectedTag = useAtomValue(selectedTagAtom);

  const setVisibleTag = useSetAtom(visibleTagAtom);
  const setVisibleMemoAndAlarm = useSetAtom(visibleMemoAndAlarmAtom);

  const queryClient = useQueryClient();

  const categoryMutation = useMutation({
    mutationFn: async (categoryName: string) => {
      const res = await createCategory(categoryName);
      return res;
    },
  });

  const tagMutation = useMutation({
    mutationFn: async ({ categoryId, tagName }: { categoryId: number; tagName: string }) => {
      const res = await createTag(categoryId, tagName);
      return res;
    },
  });

  const saveLinkData = async () => {
    if (!selectedCategory || selectedTag.length === 0) return;

    let categoryId: number | null = null;

    // 임시 생성한 카테고리를 선택한 상태이면 카테고리 생성
    if (tempCategories.includes(selectedCategory)) {
      await categoryMutation.mutateAsync(selectedCategory);
      const res = await getCategories(); // 다시 카테고리를 조회해서 카테고리 ID 찾음
      const matchedCate = res.data?.find((c) => c.categoryName === selectedCategory);
      categoryId = matchedCate?.id ?? null;
    }

    // 기존 카테고리라면 그대로 사용
    if (!categoryId) {
      const res = await getCategories();
      categoryId = res.data?.find((c) => c.categoryName === selectedCategory)?.id ?? null;
      if (!categoryId) throw new Error('카테고리 ID 찾기 실패'); // 카테고리 ID를 찾는데도 없으면 에러
    }

    // tempTags에서 해당 카테고리 태그만 추출
    const createTag = tempTags[selectedCategory] || [];

    // 여러개의 태그 생성을 실행하는 동안 기다림 -> 하나라도 실패하면 reject
    await Promise.all(
      createTag.map((tag) => tagMutation.mutateAsync({ categoryId, tagName: tag })),
    );

    await queryClient.invalidateQueries({ queryKey: ['categoriesWithTags'] });

    setVisibleTag(false);
    setVisibleMemoAndAlarm(false);
  };

  return { saveLinkData };
};

export default SaveButton;
