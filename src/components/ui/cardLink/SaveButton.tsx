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
  previewImageAtom,
  faviconAtom,
  titleAtom,
  memoAtom,
  platformAtom,
} from '@/atoms';
import { createCategory, getCategories } from '@/api/category/category';
import { createTag, getTags } from '@/api/tag/tag';
import { saveBookmarks } from '@/api/bookmark/bookmark';
import toast from 'react-hot-toast';
import { uploadImage } from '@/api/file/presigned_url_api';

const SaveButton = () => {
  const tempCategories = useAtomValue(tempCategoriesAtom);
  const tempTags = useAtomValue(tempTagsAtom);
  const selectedCategory = useAtomValue(selectedCategoryAtom);
  const selectedTag = useAtomValue(selectedTagAtom);
  const suggestionList = useAtomValue(suggestionListAtom);
  const url = useAtomValue(linkAtom);
  const title = useAtomValue(titleAtom);
  const platfrom = useAtomValue(platformAtom);
  const faviconUrl = useAtomValue(faviconAtom);
  const previewImage = useAtomValue(previewImageAtom);
  const memo = useAtomValue(memoAtom);

  const setVisibleTag = useSetAtom(visibleTagAtom);
  const setVisibleMemoAndAlarm = useSetAtom(visibleMemoAndAlarmAtom);
  const queryClient = useQueryClient();

  const saveBookmarkMutation = useMutation({
    mutationFn: saveBookmarks,
    onSuccess: (data) => {
      console.log('✅ 저장된 북마크 데이터:', data);
      toast.success('저장되었습니다');
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

    // 이미지 처리
    let file: { fileName: string; fileUrl: string } | undefined = undefined;
    if (previewImage?.startsWith('blob')) {
      const fileBlob = await fetch(previewImage).then((res) => res.blob());
      const fileName = `uploaded_${Date.now()}.webp`;
      const uploadResult = await uploadImage(previewImage, fileBlob as File);

      // uploadImage 결과가 string인지 error 객체인지 확인
      if (typeof uploadResult === 'string') {
        file = {
          fileName,
          fileUrl: uploadResult,
        };
      } else {
        // 업로드 실패 시 에러 처리
        toast.error(uploadResult.message);
        return; // 업로드 실패 시 전체 저장 프로세스 중단
      }
    }

    const platformUpper = platfrom?.toUpperCase() || 'ETC';

    // 북마크 저장 API 호출
    const bookmarkData: any = {
      title: title ?? '제목',
      url,
      memo,
      platform: platformUpper as
        | 'NAVER'
        | 'NAVER_BLOG'
        | 'TISTORY'
        | 'YOUTUBE'
        | 'INSTAGRAM'
        | 'VELOG'
        | 'ETC',
      categoryId,
      tagIds,
      faviconUrl: faviconUrl ?? '',
    };

    // file이 있을 때만 추가
    if (file) {
      bookmarkData.file = file;
    }

    saveBookmarkMutation.mutate(bookmarkData);

    setVisibleTag(false);
    setVisibleMemoAndAlarm(false);
  };
  return { saveLinkData };
};

export default SaveButton;
