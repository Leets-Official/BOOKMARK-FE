import CompactCard from '@/components/ui/card/CompactCard';
import { dummyCompactCardList } from '@/contants/DummyData';
import type { CompactCardProps } from '@/types';

const SearchResult = () => {
  return (
    <div className='flex flex-col gap-4 w-full p-4'>
      {dummyCompactCardList.map((card: CompactCardProps) => (
        <CompactCard key={card.title} {...card} />
      ))}
    </div>
  );
};

export default SearchResult;
