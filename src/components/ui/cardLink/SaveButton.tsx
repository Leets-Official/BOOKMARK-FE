import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  tempCategoriesAtom,
  tempTagsAtom,
  visibleTagAtom,
  visibleMemoAndAlarmAtom,
  selectedCategoryAtom,
  selectedTagAtom,
  suggestionListAtom,
  linkAtom,
  faviconAtom,
  titleAtom,
  memoAtom,
  platformAtom,
  thumbnailAtom,
  uploadUrlAtom,
} from '@/atoms';
import { createCategory, getCategories } from '@/api/category/category';
import { createTag, getTags } from '@/api/tag/tag';
import { saveBookmarks } from '@/api/bookmark/bookmark';
import toast from 'react-hot-toast';
import type { BookmarkSaveProps } from '@/types/api/bookmark';

const SaveButton = () => {
  const tempCategories = useAtomValue(tempCategoriesAtom);
  const tempTags = useAtomValue(tempTagsAtom);
  const selectedCategory = useAtomValue(selectedCategoryAtom);
  const selectedTag = useAtomValue(selectedTagAtom);
  const suggestionList = useAtomValue(suggestionListAtom);
  const url = useAtomValue(linkAtom);
  const title = useAtomValue(titleAtom);
  const platfrom = useAtomValue(platformAtom);
  const thumbnail = useAtomValue(thumbnailAtom);
  const faviconUrl = useAtomValue(faviconAtom);
  const memo = useAtomValue(memoAtom);
  const uploadUrl = useAtomValue(uploadUrlAtom);

  const setVisibleTag = useSetAtom(visibleTagAtom);
  const setVisibleMemoAndAlarm = useSetAtom(visibleMemoAndAlarmAtom);
  const queryClient = useQueryClient();

  const saveBookmarkMutation = useMutation({
    mutationFn: async (bookmarkData: BookmarkSaveProps) => {
      const res = await saveBookmarks(bookmarkData);
      return res;
    },
    onSuccess: (res) => {
      console.log('✅ 저장된 북마크 데이터:', res);
      console.log('📦 data 필드:', res.data);
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
    onError: () => {
      toast.error('저장에 실패했습니다');
    },
  });

  const createCategoryMutation = useMutation({
    mutationFn: async (categoryName: string) => {
      const res = await createCategory(categoryName);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const createTagMutation = useMutation({
    mutationFn: async ({ categoryId, tagName }: { categoryId: number; tagName: string }) => {
      const res = await createTag(categoryId, tagName);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });

  const saveLinkData = async () => {
    if (!selectedCategory || selectedTag.length === 0) return;

    let categoryId: number | null = null;

    // 임시 생성한 카테고리를 선택한 상태이면 카테고리 생성
    if (tempCategories.includes(selectedCategory)) {
      await createCategoryMutation.mutateAsync(selectedCategory);
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

    // 제안 태그 중 선택된 태그
    const selectedSuggestionTags = suggestionList.filter((s) => s.isSelected).map((s) => s.content);

    // 임시 태그 중 선택된 태그
    const selectedTempTags = (tempTags[selectedCategory] || []).filter((tag) =>
      selectedTag.includes(tag),
    );

    const res = await getTags(categoryId); // 기존 태그 조회
    const existingTags = res.data || [];
    const selectedExistingTags = existingTags
      .filter((t) => selectedTag.includes(t.tagName))
      .map((t) => ({ id: t.tagId, name: t.tagName }));

    // 새로 생성할 태그 (suggestion + temp 중 기존에 없던 것)
    const createTagNames = [...selectedSuggestionTags, ...selectedTempTags].filter(
      (tag) => !selectedExistingTags.some((t) => t.name === tag),
    );

    await Promise.all(
      createTagNames.map((tag) => createTagMutation.mutateAsync({ categoryId, tagName: tag })),
    );

    await queryClient.invalidateQueries({ queryKey: ['categoriesWithTags'] });

    const tagRes = await getTags(categoryId);
    const allTags = tagRes.data || [];
    const tagIds = allTags.filter((t) => selectedTag.includes(t.tagName)).map((t) => t.tagId);

    const platformUpper = platfrom?.toUpperCase() || 'ETC';

    // 북마크 저장 API 호출
    const bookmarkData: BookmarkSaveProps = {
      title: title ?? '제목',
      url: url ?? '',
      memo: memo ?? '',
      file: {
        fileName: 'bookmarkExample.jpg',
        fileUrl: uploadUrl || thumbnail || '',
      },
      notification: {
        notifyAt: '2025-08-04T00:00:00',
      },
      platform: platformUpper as BookmarkSaveProps['platform'],
      categoryId,
      faviconUrl: faviconUrl ?? '',
      tagIds,
    };
    console.log('📤 bookmarkData:', JSON.stringify(bookmarkData, null, 2));
    saveBookmarkMutation.mutate(bookmarkData);
    console.log('📤 최종 bookmarkData', bookmarkData);

    setVisibleTag(false);
    setVisibleMemoAndAlarm(false);
  };
  return { saveLinkData };
};

export default SaveButton;
