import { AlertIcon, FolderDetailIcon } from '@/assets';
import { Image, Chip, Button } from '@/components/common';
import clsx from 'clsx';
import { isMobile } from 'react-device-detect';
import { motion, useMotionValue } from 'framer-motion';
import { MenuPortal } from '@/utils/';
import { useMenuHandler } from '@/hooks/menuPosition';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../modal/DeleteModal';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import type { BookMarkProps } from '@/types/api/bookmark';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteBookmarks } from '@/api/bookmark/bookmark';
import toast from 'react-hot-toast';
import { getNotificaton } from '@/api/alarm/notification';

const SaveCard = ({ data }: { data: BookMarkProps }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { isMenuOpen, menuPosition, iconRef, isOpen, isClose } = useMenuHandler();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: notificationData } = useQuery({
    queryKey: ['notification'],
    queryFn: async () => {
      const res = await getNotificaton(data.id);
      if (res.error) {
        throw new Error(res.message);
      }
      return res.data;
    },
  });

  const deleteBookmarkMutate = useMutation({
    mutationFn: deleteBookmarks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      toast.success('북마크 삭제에 성공했습니다');
    },
    onError: () => {
      toast.error('북마크 삭제에 실패했습니다');
    },
  });

  const isNotified = notificationData?.some((noti) => noti.isNotified) ?? false;

  const x = useMotionValue(0);
  const dragRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    const updateConstraints = () => {
      if (dragRef.current && containerRef.current) {
        const totalChipWidth = dragRef.current.scrollWidth;
        const containerWidth = containerRef.current.offsetWidth;
        const buffer = 8;
        const maxDrag = totalChipWidth - containerWidth + buffer;
        const newLeft = -Math.max(0, maxDrag);

        setConstraints({ left: newLeft, right: 0 });

        const currentX = x.get();
        if (currentX < newLeft) {
          x.set(newLeft);
        } else if (currentX > 0) {
          x.set(0);
        }
      }
    };
    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, [data, x]);

  const menuOpenStyles =
    isMenuOpen && !isMobile
      ? 'shadow-[0_2px_7px_rgba(2,34,94,0.1)] ring ring-gray-200 hover:ring hover:ring-gray-200'
      : '';

  return (
    <>
      <motion.div
        animate={{ scale: isMenuOpen && !isMobile ? 1.03 : 1 }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.4 }}
        className={clsx(
          'mt-3 w-full relative rounded-[16px] shadow-[0_2px_7px_rgba(2,34,94,0.1)] cursor-pointer bg-white',
          !isMobile && 'hover:ring hover:ring-gray-200',
          menuOpenStyles,
        )}
      >
        <div className='p-3.5 pb-10'>
          <div ref={containerRef} className='overflow-hidden p-1'>
            <motion.div
              ref={dragRef}
              style={{ x }}
              drag='x'
              dragConstraints={constraints}
              dragElastic={0.05}
              dragTransition={{ power: 0.01, timeConstant: 200 }}
              className='flex gap-2 mb-4 w-full hide-scrollbar'
            >
              <Chip
                content={data.category}
                isSelected={false}
                className='bg-[#80CA14] text-white border-lightGrayBlue text-[15px] px-3 h-[36px] flex-shrink-0'
              />
              {data.tags?.map((tag, i) => (
                <Chip
                  key={i}
                  content={tag}
                  isSelected={false}
                  className='border-[#EAEDF5] text-[15px] px-3 h-[36px] flex-shrink-0'
                />
              ))}
              {data.faviconUrl ? (
                <Chip
                  content={
                    <span className='flex items-center gap-1'>
                      <img src={data.faviconUrl} alt='favicon' className='w-4 h-4' />
                      <span>{data.platform}</span>
                    </span>
                  }
                  isSelected={false}
                  className='border-blue text-[15px] px-3 h-[36px] flex-shrink-0'
                />
              ) : (
                <Chip
                  content={data.platform}
                  isSelected={false}
                  className='border-blue text-[15px] px-3 h-[36px] flex-shrink-0'
                />
              )}
            </motion.div>
          </div>
          <Image
            src={data.image}
            className='w-full aspect-[4/2.2] object-cover rounded-xl mb-4'
            onClick={() => window.open(data.url, '_blank')}
          />
          <div className='flex justify-between items-start pl-2 pb-2'>
            <div className='flex-1'>
              <h3 className='font-semibold text-[20px] text-gray-900 mb-2 line-clamp-1 leading-tight'>
                {data.title}
              </h3>
              <p className='text-[15px] text-gray-600 leading-relaxed mb-2 line-clamp-2'>
                {data.memo}
              </p>
              <div className='absolute bottom-4 left-6 right-4 flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <p className='text-sm text-stone'>
                    {dayjs(data.createdAt).format('YYYY.MM.DD HH:mm')} 저장
                  </p>
                  {isNotified && <AlertIcon width={16} height={16} stroke={'#A4A8B2'} />}
                </div>
                <div ref={iconRef} onClick={isOpen}>
                  <FolderDetailIcon
                    width={24}
                    height={24}
                    className={clsx(
                      'hover:text-grayBg transition-colors',
                      isMobile ? 'w-6 h-6' : 'sm:w-10 w-8 sm:h-10 h-8',
                      isMenuOpen ? 'text-grayBg' : 'text-white',
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <MenuPortal isOpen={isMenuOpen} onClose={isClose} position={menuPosition}>
        <div className='flex flex-col w-32'>
          <p className='text-left px-1 mb-2 text-[#A4A8B2] rounded text-xs'>링크 설정</p>
          <Button
            onClick={() => {
              isClose();
              navigate(`edit/${data.id}`);
            }}
            className='text-left px-1 py-3 text-stone hover:bg-gray-100 rounded text-15 cursor-pointer'
          >
            수정
          </Button>
          <Button
            onClick={() => {
              isClose();
              setIsDeleteModalOpen(true);
            }}
            className='text-left px-1 py-3 text-[#FF2C3D] hover:bg-gray-100 rounded text-15 cursor-pointer'
          >
            삭제
          </Button>
        </div>
      </MenuPortal>
      {/**삭제 모달 */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        warningText='해당 북마크를 정말 삭제할까요?'
        onDelete={() => {
          setIsDeleteModalOpen(false);
          deleteBookmarkMutate.mutate(data.id);
        }}
        onScrollLock={isDeleteModalOpen}
      />
    </>
  );
};

export default SaveCard;
