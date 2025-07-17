import CardListHeader from '@/components/layout/header/CardListHeader';
import SaveCard from '../card/SaveCard';

const SaveCardList = () => {
  return (
    <div className='mt-20 mb-10'>
      <CardListHeader title='이번 주 저장 List' />
      <div className='relative w-4/5 max-sm:w-9/10 mx-auto flex flex-col gap-8'>
        <SaveCard />
        <SaveCard />
        <SaveCard />
      </div>
    </div>
  );
};

export default SaveCardList;
