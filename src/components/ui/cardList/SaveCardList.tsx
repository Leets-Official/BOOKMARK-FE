import CardListHeader from '@/components/layout/header/CardListHeader';
import SaveCard from '../card/SaveCard';
import Button from '@/components/common/Button';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { searchBookmarks } from '@/api/bookmark/bookmark';
import type { BookmarkSearchProps } from '@/types/api/bookmark';

const SaveCardList = () => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState(true);
  const [bookmarkData, setBookmarkData] = useState<any[]>([]);

  const sortLabel = sortOrder ? '최신순' : '오래된순';
  const displayCount = isMobile ? 6 : 9;

  const searchBookMarkMutation = useMutation({
    mutationFn: searchBookmarks,
    onSuccess: (res) => {
      console.log('조회된 북마크 데이터:', res);
      const content = res.data?.content ?? [];

      const resData = content.map((data) => {
        const categoryInfo = data.categoryTagInfos?.[0];
        const category = categoryInfo?.categoryName ?? '기타';
        const tags = categoryInfo?.tags?.map((tag: any) => tag.tagName) ?? [];

        return {
          id: data.id,
          title: data.title,
          memo: data.memo,
          platform: data.platform,
          image: data.file?.fileUrl ?? '', // 없을 경우 대비
          category,
          tags,
          createdAt: data.createdAt,
        };
      });

      const sorted = [...resData].sort((a, b) =>
        sortOrder
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
      setBookmarkData(sorted);
    },
    onError: (err) => {
      console.error('북마크 조회 실패:', err);
    },
  });

  useEffect(() => {
    const requestBody: BookmarkSearchProps = {
      keyword: null,
      categoryTagRequests: null,
      platforms: null,
      page: 0,
      size: displayCount,
    };

    searchBookMarkMutation.mutate(requestBody);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayCount, sortOrder]);

  return (
    <div className='pb-25 mt-20'>
      <CardListHeader
        title='전체 저장 List'
        showAllContent={true}
        sortLabel={sortLabel}
        onSortToggle={() => setSortOrder((prev) => !prev)}
      />
      <div className='w-[95%] max-sm:w-9/10 mx-auto gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
        {bookmarkData.map((card) => (
          <SaveCard key={card.id} data={card} />
        ))}
      </div>
      <div className='flex justify-center mt-10'>
        <Button
          onClick={() => {
            navigate('/search-result');
          }}
          className='sm:w-7/10 w-9/10 py-4 bg-white text-[15px] sm:text-base border-1 border-[#BCC0CC] rounded-[10px] active:brightness-95'
        >
          전체보기
        </Button>
      </div>
    </div>
  );
};

export default SaveCardList;
