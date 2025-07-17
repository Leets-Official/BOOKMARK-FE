import CardListHeader from '@/components/layout/header/CardListHeader';
import SaveCard from '../card/SaveCard';
import Button from '@/components/common/Button';

const SaveCardList = () => {
  return (
    <div className='mb-10'>
      <CardListHeader title='이번 주 저장 List' />
      <div className='relative w-4/5 max-sm:w-9/10 mx-auto flex flex-col gap-8'>
        <SaveCard />
        <SaveCard />
        <SaveCard />
      </div>
      <CardListHeader title='전체 저장 List' showAllContent={true} />
      <div className='relative w-4/5 max-sm:w-9/10 mx-auto flex flex-col gap-8'>
        <SaveCard />
        <SaveCard />
        <SaveCard />
      </div>
      <div className='flex justify-center'>
        <Button
          onClick={() => {
            console.log('전체보기');
          }}
          className=' mt-8 w-9/10 py-5 bg-white text-[15px] border-1 border-[#BCC0CC] rounded-[10px] active:brightness-95'
        >
          전체보기
        </Button>
      </div>
    </div>
  );
};

export default SaveCardList;
