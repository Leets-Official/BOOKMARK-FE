import CardListHeader from '@/components/layout/header/CardListHeader';
import SaveCard from '../card/SaveCard';
import Button from '@/components/common/Button';
import { dummyCardData } from '@/constants/DummyData';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';

const SaveCardList = () => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState(true);

  const sortLabel = sortOrder ? '최신순' : '오래된순';
  const allSortedData = [...dummyCardData].sort((a, b) => (sortOrder ? a.id - b.id : b.id - a.id));
  const displayCount = isMobile ? 6 : 9;

  return (
    <div className='mb-10'>
      <CardListHeader
        title='전체 저장 List'
        showAllContent={true}
        sortLabel={sortLabel}
        onSortToggle={() => setSortOrder((prev) => !prev)}
      />
      <div className='w-4/5 max-sm:w-9/10 mx-auto gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
        {allSortedData.slice(0, displayCount).map((card) => (
          <SaveCard key={card.id} data={card} />
        ))}
      </div>
      <div className='flex justify-center mt-10 mb-20'>
        <Button
          onClick={() => {
            navigate('/search-result');
          }}
          className='sm:w-4/5 w-9/10 py-5 bg-white text-[15px] sm:text-base border-1 border-[#BCC0CC] rounded-[10px] active:brightness-95'
        >
          전체보기
        </Button>
      </div>
    </div>
  );
};

export default SaveCardList;
