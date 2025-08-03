import { FolderDetailIcon } from '@/assets';
import { Image, Button } from '@/components/common';
import clsx from 'clsx';
import { isMobile } from 'react-device-detect';
import { MenuPortal, ModalPortal } from '@/utils';
import { useMenuHandler } from '@/hooks/menuPosition';
import { useState } from 'react';
import DeleteModal from '../modal/DeleteModal';
import TextField from '../TextField';
import { modalAddSchema } from '@/schema/save';
import { zodResolver } from '@hookform/resolvers/zod';
import type z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import type { CategoryProps } from '@/types/api/category';
import { getBookmarks } from '@/api/bookmark/bookmark';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteCategory, updateCategory } from '@/api/category/category';
import Loading from '../loading/Loading';
import toast from 'react-hot-toast';
import { useScrollLock } from '@/hooks/scrollLock';

// 제목 텍스트 스타일 (반응형)
const TitleText =
  'overflow-hidden font-sans font-semibold text-ellipsis whitespace-nowrap ml-1 md:text-xl text-base';

const FolderCard = ({
  category,
  allCategoryNames,
  pages,
}: {
  category: CategoryProps;
  allCategoryNames: string[];
  pages?: [number, number, number, () => void];
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { isMenuOpen, menuPosition, iconRef, isOpen, isClose } = useMenuHandler(); // 아이콘 기반으로 메뉴바 위치를 설정하는 커스텀 훅
  const [isDisabled, setIsDisabled] = useState(true);
  const [isScrollLock, setIsScollLock] = useState(false);

  useScrollLock(isScrollLock);

  const schema = modalAddSchema('category', allCategoryNames);
  const queryClient = useQueryClient();
  const { handleSubmit, control, reset } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      category: '',
    },
  });

  const { data: bookmarks, isPending: isBookmarksLoading } = useQuery({
    queryKey: ['bookmarks'],
    queryFn: () => getBookmarks(),
  });

  const { mutate: updateCategoryMutation } = useMutation({
    mutationFn: (categoryName: string) => updateCategory(category.id, categoryName),
    onMutate: async (newCategoryName) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: ['categories'] });

      // 이전 데이터 백업
      const previousCategories = queryClient.getQueryData(['categories']);

      // 즉시 UI 업데이트 (낙관적 업데이트)
      queryClient.setQueryData(['categories'], (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.map((cat: CategoryProps) =>
            cat.id === category.id ? { ...cat, categoryName: newCategoryName } : cat,
          ),
        };
      });

      return { previousCategories };
    },
    onSettled: (data, error, _, context) => {
      if (data?.error || error) {
        const errorMessage = data?.error ? data.message : error?.message || '알 수 없는 오류';
        console.log('카테고리 수정 실패:', errorMessage);
        queryClient.setQueryData(['categories'], context?.previousCategories);
        toast.error('카테고리 수정 실패');
        return;
      }

      toast.success('카테고리 수정 완료');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const { mutate: deleteCategoryMutation } = useMutation({
    mutationFn: (categoryId: number) => deleteCategory(categoryId),
    onMutate: async (categoryId) => {
      await queryClient.cancelQueries({ queryKey: ['categories'] });
      const previousCategories = queryClient.getQueryData(['categories']);
      queryClient.setQueryData(['categories'], (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.filter((cat: CategoryProps) => cat.id !== categoryId),
        };
      });

      // 삭제 후 페이지 조정
      if (!isMobile && pages) {
        const [page, categoryLength, cardsPerSlide, decreaseIndex] = pages;
        const newCategoryLength = categoryLength - 1; // 삭제될 카테고리 개수
        const newMaxIndex = Math.floor((newCategoryLength - 1) / cardsPerSlide);

        if (page > newMaxIndex && newMaxIndex >= 0) {
          decreaseIndex();
        }
      }

      return { previousCategories };
    },
    onSettled: (data, error, _, context) => {
      if (data?.error || error) {
        const errorMessage = data?.error ? data.message : error?.message || '알 수 없는 오류';
        console.log('카테고리 삭제 실패:', errorMessage);
        queryClient.setQueryData(['categories'], context?.previousCategories);
        toast.error('카테고리 삭제 실패');
        return;
      }

      toast.success('카테고리 삭제 완료');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  if (!bookmarks || bookmarks.error || !bookmarks.data) {
    if (bookmarks?.error) {
      console.error('북마크 조회 실패:', bookmarks.message);
    }
    return;
  }

  const handleConfirmModal = (data: z.infer<typeof schema>) => {
    if (!data.category.trim()) return;
    updateCategoryMutation(data.category);
    setIsModalOpen(false);
    reset();
    setIsDisabled(true);
  };

  const images = bookmarks.data.slice(0, 3).map((bookmark) => bookmark.thumbnailUrl);

  // 이미지 렌더링
  const renderImages = (images: string[]) => {
    if (images.length === 1) {
      return <Image src={images[0]} className='w-full h-full object-cover rounded-2xl' />;
    }

    if (images.length === 2) {
      return (
        <>
          <div className='w-1/2 h-full'>
            <Image src={images[0]} className='w-full h-full object-cover rounded-l-2xl' />
          </div>
          <div className='w-1/2 h-full'>
            <Image src={images[1]} className='w-full h-full object-cover rounded-r-2xl' />
          </div>
        </>
      );
    }

    if (images.length >= 3) {
      return (
        <>
          <div className='w-2/3 h-full'>
            <Image src={images[0]} className='w-full h-full object-cover rounded-l-2xl' />
          </div>
          <div className='w-2/3 h-full flex flex-col'>
            <div className='w-full h-1/2 border-l border-b border-white'>
              <Image src={images[1]} className='w-full h-full object-cover' />
            </div>
            <div className='w-full h-1/2 border-l border-white'>
              <Image src={images[2]} className='w-full h-full object-cover rounded-br-2xl' />
            </div>
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <>
      <div className={clsx(isMobile ? 'min-w-40 pt-2' : 'w-1/2 lg:w-1/3 xl:w-1/4 mt-2')}>
        {/**카테고리에 카드가 하나만 있으면 폴더에 하나만, 두개 있으면 1 : 1 비율... 3개까지 표시 */}
        <div className='w-full aspect-[3/2] rounded-2xl overflow-hidden flex hover:scale-103 duration-400 cursor-pointer'>
          {isBookmarksLoading ? (
            <div className='w-full h-full flex items-center justify-center'>
              <Loading className='w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin' />
            </div>
          ) : (
            renderImages(images)
          )}
        </div>
        <div className='flex items-center justify-between pt-2'>
          <p className={TitleText}>{category.categoryName}</p>
          <div
            ref={iconRef}
            onClick={() => {
              isOpen();
            }}
          >
            <FolderDetailIcon
              width={24}
              height={24}
              className={clsx(
                'hover:text-grayBg transition-colors cursor-pointer',
                isMobile ? 'w-6 h-6' : 'sm:w-10 w-8 sm:h-10 h-8',
                isMenuOpen ? 'text-grayBg' : 'text-white',
              )}
            />
          </div>
        </div>
      </div>
      {/* Portal로 렌더링되는 메뉴 */}
      <MenuPortal isOpen={isMenuOpen} onClose={() => isClose()} position={menuPosition}>
        <div className='flex flex-col w-32'>
          <p className='text-left px-1 mb-2 text-[#A4A8B2] rounded text-xs'>카테고리 설정</p>
          <Button
            onClick={() => {
              isClose();
              setIsModalOpen(true);
              setIsScollLock(true);
            }}
            className='text-left px-1 py-3 text-stone hover:bg-gray-100 rounded text-15'
          >
            카테고리 수정
          </Button>
        </div>
      </MenuPortal>
      {/* 모달 포탈 */}
      <ModalPortal
        isOpen={isModalOpen}
        title='카테고리 수정'
        confirmLabel='저장하기'
        onCancel={() => {
          setIsModalOpen(false);
          reset();
          setIsDisabled(true);
          setIsScollLock(false);
        }}
        onConfirm={handleSubmit(handleConfirmModal)}
        disabled={isDisabled}
        onScrollLock={false}
      >
        <Controller
          name='category'
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              label='이름'
              placeholder={category.categoryName}
              maxLength={10}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              errorMessage={fieldState.error?.message}
              setDisabled={(disabled) => setIsDisabled(disabled)}
            />
          )}
        />
        <div className='text-xs mt-3'>
          <p>작업</p>
          <div
            onClick={() => {
              setIsModalOpen(false);
              setIsDeleteModalOpen(true);
            }}
            className='hover:bg-gray-100 rounded mt-1.5 p-1 cursor-pointer'
          >
            <p className='text-base font-semibold mb-1.5'>카테고리 삭제</p>
            <p className='text-xs text-stone break-keep whitespace-pre-wrap'>
              카테고리를 삭제하면 해당 카테고리를 적용한 링크도 모두 삭제됩니다. 그래도 삭제할까요?
            </p>
          </div>
        </div>
      </ModalPortal>
      {/**삭제 모달 */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setIsScollLock(false);
        }}
        warningText={`"${category.categoryName}"카테고리를 정말 삭제할까요?`}
        subText={
          '카테고리를 삭제하면 해당 카테고리를 적용한 링크도 모두 삭제됩니다. 그래도 삭제할까요?'
        }
        onDelete={() => {
          setIsDeleteModalOpen(false);
          deleteCategoryMutation(category.id);
          setIsScollLock(false);
        }}
        onScrollLock={false}
      />
    </>
  );
};

export default FolderCard;
