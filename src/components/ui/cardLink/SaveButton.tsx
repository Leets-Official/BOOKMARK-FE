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

  const updateBookmarkMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: BookmarkSaveRequestProps }) =>
      updateBookmarks(id, data),
    onSuccess: () => {
      toast.success('수정되었습니다');
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: () => {
      toast.error('수정에 실패했습니다');
    },
  });

  const processInstagramImage = async (imageUrl: string): Promise<string> => {
    // 인스타그램 URL이면 서버에서 처리하도록 요청
    if (imageUrl.includes('cdninstagram.com')) {
      try {
        // 백엔드에 이미지 프록시 API 요청
        const response = await fetch('/api/proxy-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageUrl }),
        });

        if (response.ok) {
          const data = await response.json();
          return data.s3Url; // 백엔드에서 S3에 업로드 후 리턴한 URL
        }
      } catch (error) {
        console.error('이미지 프록시 실패:', error);
      }
    }

    return imageUrl; // 다른 URL은 그대로 사용
  };

  const prepareBookmarkData = async (
    data: z.infer<typeof saveSchema>,
    isImageChanged: boolean,
  ): Promise<BookmarkSaveRequestProps> => {
    const { url, title, platform, image, favicon, memo } = data;

    if (!selectedCategory || selectedTag.length === 0) {
      throw new Error('카테고리 또는 태그가 선택되지 않았습니다.');
    }

    let categoryId: number | null = null;
    if (tempCategories.includes(selectedCategory)) {
      await createCategoryMutation.mutateAsync(selectedCategory);
    }
    const res = await getCategories();
    categoryId = res.data?.find((c) => c.categoryName === selectedCategory)?.id ?? null;
    if (!categoryId) throw new Error('카테고리 ID 찾기 실패'); // 카테고리 ID를 찾는데도 없으면 에러

    // 태그 처리
    const selectedSuggestionTags = suggestionList.filter((s) => s.isSelected).map((s) => s.content);
    const selectedTempTags = (tempTags[selectedCategory] || []).filter((tag) =>
      selectedTag.includes(tag),
    );
    const existingTags = (await getTags(categoryId)).data || [];
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
    const allTags = tagRes.data || [];
    const tagIds = allTags.filter((t) => selectedTag.includes(t.tagName)).map((t) => t.tagId);

    // 이미지 처리
    const rawImageUrl = uploadUrl && uploadUrl.trim() !== '' ? uploadUrl : image || '';
    const fileUrl = isImageChanged ? await processInstagramImage(rawImageUrl) : rawImageUrl;

    // 최종 데이터 구성
    return {
      title: title ?? '제목',
      url: url ?? '',
      memo: memo ?? '',
      file: {
        fileName: 'bookmarkExample.jpg',
        fileUrl,
      },
      notification: {
        notifyAt: alarmAt ?? '',
      },
      platform,
      categoryId,
      faviconUrl: favicon ?? '',
      tagIds,
    };
  };

  const saveLinkData = async (data: z.infer<typeof saveSchema>) => {
    const bookmarkData = await prepareBookmarkData(data, true); // 저장 시 항상 이미지 처리
    saveBookmarkMutation.mutate(bookmarkData);
    setVisibleTag(false);
    setVisibleMemoAndAlarm(false);
  };

  const updateLinkData = async (
    data: z.infer<typeof saveSchema>,
    bookmarkId: number,
    isImageChanged: boolean,
  ) => {
    const bookmarkData = await prepareBookmarkData(data, isImageChanged);
    await updateBookmarkMutation.mutateAsync({ id: bookmarkId, data: bookmarkData });
  };

  return { saveLinkData, updateLinkData };
};

export default SaveButton;
