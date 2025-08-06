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
} from '@/atoms';
import { createCategory, getCategories } from '@/api/category/category';
import { createTag, getTags } from '@/api/tag/tag';
import { saveBookmarks, updateBookmarks } from '@/api/bookmark/bookmark';
import toast from 'react-hot-toast';
import type { BookmarkSaveRequestProps } from '@/types/api/bookmark';
import type { saveSchema } from '@/schema/save';
import type z from 'zod';

export const useSubmit = () => {
  const tempCategories = useAtomValue(tempCategoriesAtom);
  const tempTags = useAtomValue(tempTagsAtom);
  const selectedCategory = useAtomValue(selectedCategoryAtom);
  const selectedTag = useAtomValue(selectedTagAtom);
  const suggestionList = useAtomValue(suggestionListAtom);

  const setVisibleTag = useSetAtom(visibleTagAtom);
  const setVisibleMemoAndAlarm = useSetAtom(visibleMemoAndAlarmAtom);
  const queryClient = useQueryClient();

  const saveBookmarkMutation = useMutation({
    mutationFn: async (bookmarkData: BookmarkSaveRequestProps) => {
      const res = await saveBookmarks(bookmarkData);
      return res;
    },
    onSuccess: (res) => {
      if (res.error) {
        throw new Error(res.message || '저장에 실패했습니다');
      }
      toast.success('저장되었습니다');
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: () => {
      toast.error('저장에 실패했습니다');
    },
  });

  const updateBookmarkMutation = useMutation({
    mutationFn: async ({
      bookmarkId,
      data,
    }: {
      bookmarkId: number;
      data: BookmarkSaveRequestProps;
    }) => {
      const res = await updateBookmarks(bookmarkId, data);
      return res;
    },
    onSuccess: (res) => {
      if (res.error) {
        throw new Error(res.message || '수정에 실패했습니다');
      }
      toast.success('수정되었습니다');
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: () => {
      toast.error('수정에 실패했습니다');
    },
  });

  const createCategoryMutation = useMutation({
    mutationFn: async (categoryName: string) => {
      const res = await createCategory(categoryName);
      return res;
    },
    onSuccess: (res) => {
      if (res.error) {
        throw new Error(res.message || '카테고리 생성에 실패했습니다');
      }
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const createTagMutation = useMutation({
    mutationFn: async ({ categoryId, tagName }: { categoryId: number; tagName: string }) => {
      const res = await createTag(categoryId, tagName);
      return res;
    },
    onSuccess: (res) => {
      if (res.error) {
        throw new Error(res.message || '태그 생성에 실패했습니다');
      }
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });

  // 공통 로직: 카테고리 ID 처리
  const getCategoryId = async (): Promise<number> => {
    if (!selectedCategory) throw new Error('카테고리가 선택되지 않았습니다');

    let categoryId: number | null = null;

    // 임시 생성한 카테고리를 선택한 상태이면 카테고리 생성
    if (tempCategories.includes(selectedCategory)) {
      try {
        await createCategoryMutation.mutateAsync(selectedCategory);
      } catch (error) {
        console.error('카테고리 생성 중 오류:', error);
        throw new Error(error as string);
      }
      const res = await getCategories();
      const matchedCate = res.data?.find((c) => c.categoryName === selectedCategory);
      categoryId = matchedCate?.id ?? null;
    }

    // 기존 카테고리라면 그대로 사용
    if (!categoryId) {
      const res = await getCategories();
      categoryId = res.data?.find((c) => c.categoryName === selectedCategory)?.id ?? null;
      if (!categoryId) throw new Error('카테고리 ID 찾기 실패');
    }

    return categoryId;
  };

  // 공통 로직: 태그 ID 처리
  const getTagIds = async (categoryId: number): Promise<number[]> => {
    if (selectedTag.length === 0) throw new Error('태그가 선택되지 않았습니다');

    // 제안 태그 중 선택된 태그
    const selectedSuggestionTags = suggestionList.filter((s) => s.isSelected).map((s) => s.content);

    // 임시 태그 중 선택된 태그
    const selectedTempTags = (tempTags[selectedCategory!] || []).filter((tag) =>
      selectedTag.includes(tag),
    );

    const res = await getTags(categoryId);
    const existingTags = res.data || [];
    const selectedExistingTags = existingTags
      .filter((t) => selectedTag.includes(t.tagName))
      .map((t) => ({ id: t.tagId, name: t.tagName }));

    // 새로 생성할 태그 (suggestion + temp 중 기존에 없던 것)
    const createTagNames = [...selectedSuggestionTags, ...selectedTempTags].filter(
      (tag) => !selectedExistingTags.some((t) => t.name === tag),
    );

    // 새 태그 생성
    if (createTagNames.length > 0) {
      try {
        await Promise.all(
          createTagNames.map((tag) => createTagMutation.mutateAsync({ categoryId, tagName: tag })),
        );
      } catch (error) {
        console.error('태그 생성 중 오류:', error);
        throw new Error(error as string);
      }
    }

    await queryClient.invalidateQueries({ queryKey: ['categoriesWithTags'] });

    // 최종 태그 ID 조회
    const tagRes = await getTags(categoryId);
    const allTags = tagRes.data || [];
    const tagIds = allTags.filter((t) => selectedTag.includes(t.tagName)).map((t) => t.tagId);

    return tagIds;
  };

  const detectPlatform = (platform: string): string => {
    const platformLower = platform.toLowerCase();

    if (platformLower.includes('네이버 블로그')) return 'NAVER_BLOG';
    if (platformLower.includes('naver')) return 'NAVER';
    if (platformLower.includes('tistory') || platformLower.includes('티스토리')) return 'TISTORY';
    if (platformLower.includes('youtube')) return 'YOUTUBE';
    if (platformLower.includes('instagram')) return 'INSTAGRAM';
    if (platformLower.includes('velog')) return 'VELOG';
    return 'ETC'; // 이외에는 ETC
  };

  // 공통 로직: 북마크 데이터 생성
  const createBookmarkData = (
    data: z.infer<typeof saveSchema>,
    categoryId: number,
    tagIds: number[],
  ): BookmarkSaveRequestProps => {
    const {
      url,
      title,
      platform,
      image: thumbnail,
      favicon: faviconUrl,
      memo,
      date,
      time,
      notificationId,
    } = data;

    let notification = undefined;

    if (date && time) {
      if (notificationId !== 0) {
        notification = {
          notifyAt: `${date}T${time}Z`,
          notificationId: notificationId,
        };
      } else {
        notification = {
          notifyAt: `${date}T${time}Z`,
        };
      }
    }

    const mappedPlatform = platform ? detectPlatform(platform) : 'ETC';

    return {
      title: title ?? '제목',
      url: url ?? '',
      memo: memo?.trim() || undefined,
      thumbnailUrl: thumbnail || '',
      notification: notification,
      platform: mappedPlatform,
      categoryId,
      faviconUrl: faviconUrl ?? '',
      tagIds,
    };
  };

  const resetUIState = () => {
    setVisibleTag(false);
    setVisibleMemoAndAlarm(false);
  };

  const saveLinkData = async (data: z.infer<typeof saveSchema>) => {
    try {
      const categoryId = await getCategoryId();
      const tagIds = await getTagIds(categoryId);
      const bookmarkData = createBookmarkData(data, categoryId, tagIds);
      saveBookmarkMutation.mutate(bookmarkData);
      resetUIState();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '북마크 저장에 실패했습니다');
      return; // 에러 발생 시 함수 종료
    }
  };

  const updateLinkData = async (data: z.infer<typeof saveSchema>, bookmarkId: number) => {
    try {
      const categoryId = await getCategoryId();
      const tagIds = await getTagIds(categoryId);
      const bookmarkData = createBookmarkData(data, categoryId, tagIds);
      await updateBookmarkMutation.mutateAsync({ bookmarkId, data: bookmarkData });
      resetUIState();
      queryClient.removeQueries({ queryKey: ['bookmark', bookmarkId] });
    } catch (error) {
      console.error('북마크 수정 중 오류:', error);
      toast.error(error instanceof Error ? error.message : '북마크 수정에 실패했습니다');
      return; // 에러 발생 시 함수 종료
    }
  };

  return {
    saveLinkData,
    updateLinkData,
  };
};
