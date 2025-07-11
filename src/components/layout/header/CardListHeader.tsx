import { LeftIcon, RightIcon, AddIcon } from '@/assets';
import Card from '@/components/layout/card/Card';

interface ICardListProps {
  cardList: { id: number; title: string }[];
}

const CardListHeader = ({ cardList }: ICardListProps) => {
  return (
    <div className='w-[85%]'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          <p className='text-xl'>Folder</p>
          <button className='cursor-pointer hover:opacity-70 transition'>
            <LeftIcon />
          </button>
          <p className='text-xl'>1/4</p>
          <button className='cursor-pointer hover:opacity-70 transition'>
            <RightIcon />
          </button>
        </div>
        <div className='flex flex-row gap-1.5 items-center justify-center'>
          <p className='text-xl'>폴더 추가</p>
          <button className='rounded-2xl cursor-pointer hover:bg-gray-300 transition-colors'>
            <AddIcon />
          </button>
        </div>
      </div>
      <hr className='border-t border-gray-200 my-5' />
      <div className='flex flex-row gap-5'>
        {cardList.map((card) => (
          <Card key={card.id} title={card.title} />
        ))}
      </div>
    </div>
  );
};

export default CardListHeader;
