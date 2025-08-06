import CardListHeader from '@/components/layout/header/CardListHeader';
import SaveCard from '../card/SaveCard';
import Button from '@/components/common/Button';
import { useMemo, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { postBookmarkSearchResult } from '@/api/bookmark/bookmark';
import type { BookmarkSearchResultRequestProps } from '@/types/api/bookmark';
import type { BookmarkProps } from '@/types/components/components';

const SaveCardList = () => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState(true);
  const sortLabel = sortOrder ? '최신순' : '오래된순';
  const displayCount = isMobile ? 6 : 9;

  const homeBookmarkData: BookmarkSearchResultRequestProps = {
    keyword: null,
    categoryTagRequests: null,
    platforms: null,
    page: 0,
    size: 1000,
  };

  const { data } = useQuery({
    queryKey: ['bookmarks', homeBookmarkData], // POST 파라미터를 queryKey에 포함
    queryFn: () => postBookmarkSearchResult(homeBookmarkData),
  });

  const bookmarkData: BookmarkProps[] = useMemo(() => {
    const content = data?.data?.content ?? [];

    const resData = content.map((data) => {
      const categoryInfo = data.categoryTagInfos?.[0];
      const category = categoryInfo?.categoryName;
      const tags = categoryInfo?.tags.map((tag) => tag.tagName);

      return {
        id: data.id,
        url: data.url,
        title: data.title,
        memo: data.memo,
        platform: data.platform,
        image: data.file?.fileUrl ?? '',
        category,
        tags,
        faviconUrl: data.faviconUrl,
        createdAt: data.createdAt,
        isNotified:
          !!data.notificationResponse?.notifyAt && data.notificationResponse?.isNotified === false,
      };
    });

    const sorted = [...resData].sort((a, b) =>
      sortOrder
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );

    return sorted.slice(0, displayCount); // 프론트에서 개수 설정
  }, [data, sortOrder, displayCount]);

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
          className='sm:w-7/10 w-9/10 py-4 bg-white text-[15px] sm:text-base border-1 border-[#BCC0CC] rounded-[10px] active:brightness-95 cursor-pointer'
        >
          전체보기
        </Button>
      </div>
    </div>
  );
};

export default SaveCardList;
