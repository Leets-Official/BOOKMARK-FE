import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  tempCategoriesAtom,
  tempTagsAtom,
  visibleTagAtom,
  visibleMemoAndAlarmAtom,
  selectedCategoryAtom,
  selectedTagAtom,
  suggestionListAtom,
  uploadUrlAtom,
  alarmAtAtom,
} from '@/atoms';
import { createCategory, getCategories } from '@/api/category/category';
import { createTag, getTags } from '@/api/tag/tag';
import { saveBookmarks, updateBookmarks } from '@/api/bookmark/bookmark';
import toast from 'react-hot-toast';
import type { BookmarkSaveRequestProps } from '@/types/api/bookmark';
import type { saveSchema } from '@/schema/save';
import type z from 'zod';

const SaveButton = () => {
  const tempCategories = useAtomValue(tempCategoriesAtom);
  const tempTags = useAtomValue(tempTagsAtom);
  const selectedCategory = useAtomValue(selectedCategoryAtom);
  const selectedTag = useAtomValue(selectedTagAtom);
  const suggestionList = useAtomValue(suggestionListAtom);
  const [uploadUrl, setUploadUrl] = useAtom(uploadUrlAtom);
  const alarmAt = useAtomValue(alarmAtAtom);

  const setVisibleTag = useSetAtom(visibleTagAtom);
  const setVisibleMemoAndAlarm = useSetAtom(visibleMemoAndAlarmAtom);
  const queryClient = useQueryClient();

  const saveBookmarkMutation = useMutation({
    mutationFn: async (bookmarkData: BookmarkSaveRequestProps) => {
      const res = await saveBookmarks(bookmarkData);
      return res;
    },
    onSuccess: () => {
      toast.success('저장되었습니다');
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setUploadUrl('');
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

  // 북마크 저장
  const saveLinkData = async (data: z.infer<typeof saveSchema>) => {
    const url = data.url;
    const title = data.title;
    const platform = data.platform;
    const thumbnail = data.image;
    const faviconUrl = data.favicon;
    const memo = data.memo;

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

    // 북마크 저장 API 호출
    const bookmarkData: BookmarkSaveRequestProps = {
      title: title ?? '제목',
      url: url ?? '',
      memo: memo ?? '',
      thumbnail: uploadUrl || thumbnail,
      notification: {
        notifyAt: alarmAt ?? '',
      },
      platform: platform,
      categoryId,
      faviconUrl: faviconUrl ?? '',
      tagIds,
    };

    saveBookmarkMutation.mutate(bookmarkData);
    setVisibleTag(false);
    setVisibleMemoAndAlarm(false);
  };

  // 북마크 수정
  const updateLinkData = async (data: z.infer<typeof saveSchema>, bookmarkId: number) => {
    const url = data.url;
    const title = data.title;
    const platform = data.platform;
    const thumbnail = data.image;
    const faviconUrl = data.favicon;
    const memo = data.memo;

    if (!selectedCategory || selectedTag.length === 0) return;

    let categoryId: number | null = null;

    if (tempCategories.includes(selectedCategory)) {
      await createCategoryMutation.mutateAsync(selectedCategory);
      const res = await getCategories();
      const matched = res.data?.find((c) => c.categoryName === selectedCategory);
      categoryId = matched?.id ?? null;
    }

    if (!categoryId) {
      const res = await getCategories();
      categoryId = res.data?.find((c) => c.categoryName === selectedCategory)?.id ?? null;
      if (!categoryId) throw new Error('카테고리 ID 찾기 실패');
    }

    const selectedSuggestionTags = suggestionList.filter((s) => s.isSelected).map((s) => s.content);
    const selectedTempTags = (tempTags[selectedCategory] || []).filter((t) =>
      selectedTag.includes(t),
    );

    const res = await getTags(categoryId);
    const existingTags = res.data || [];
    const selectedExistingTags = existingTags
      .filter((t) => selectedTag.includes(t.tagName))
      .map((t) => ({ id: t.tagId, name: t.tagName }));

    const createTagNames = [...selectedSuggestionTags, ...selectedTempTags].filter(
      (tag) => !selectedExistingTags.some((t) => t.name === tag),
    );

    await Promise.all(
      createTagNames.map((tag) => createTagMutation.mutateAsync({ categoryId, tagName: tag })),
    );

    await queryClient.invalidateQueries({ queryKey: ['categoriesWithTags'] });

    const tagRes = await getTags(categoryId);
    const tagIds = (tagRes.data || [])
      .filter((t) => selectedTag.includes(t.tagName))
      .map((t) => t.tagId);

    const bookmarkData: BookmarkSaveRequestProps = {
      title: title ?? '제목',
      url: url ?? '',
      memo: memo ?? '',
      thumbnail: uploadUrl || thumbnail,
      notification: {
        notifyAt: alarmAt ?? '',
      },
      platform,
      categoryId,
      faviconUrl: faviconUrl ?? '',
      tagIds,
    };

    try {
      await updateBookmarks(bookmarkId, bookmarkData);
      toast.success('수정되었습니다');
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setVisibleTag(false);
      setVisibleMemoAndAlarm(false);
    } catch (err) {
      toast.error('수정에 실패했습니다');
      console.error(err);
    }
  };

  return { saveLinkData, updateLinkData };
};

export default SaveButton;
