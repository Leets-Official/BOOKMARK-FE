import CompactCard from '@/components/ui/card/CompactCard';
import ChipDropDown from '@/components/layout/dropDown/ChipDropDown';
import ChangeSearchBar from '@/components/layout/searchBar/ChangeSearchBar';
import { dummyCategoryList, dummyPlatformList, dummyTagList } from '@/contants/DummyData';

const SearchResult = () => {
  return (
    <div className='relative min-h-screen flex flex-col gap-4'>
      <ChangeSearchBar barMarginTop={100} />
      <div className='flex flex-row gap-5 items-center justify-center'>
        <ChipDropDown title='카테고리' options={dummyCategoryList} />
        <ChipDropDown title='태그' options={dummyTagList} />
        <ChipDropDown title='플랫폼' options={dummyPlatformList} />
      </div>
      <div className='flex flex-col gap-5 px-4'>
        <CompactCard
          title='제목'
          src='https://picsum.photos/200/300'
          memo='메모'
          category='카테고리'
          tags={['태그1', '태그2']}
        />
      </div>
      <div className='flex flex-col gap-5 px-4'>
        <CompactCard
          title='제목'
          src='https://picsum.photos/200/300'
          memo='메모'
          category='카테고리'
          tags={['태그1', '태그2']}
        />
      </div>
      <div className='flex flex-col gap-5 px-4'>
        <CompactCard
          title='제목'
          src='https://picsum.photos/200/300'
          memo='메모'
          category='카테고리'
          tags={['태그1', '태그2']}
        />
      </div>
      <div className='flex flex-col gap-5 px-4'>
        <CompactCard
          title='제목'
          src='https://picsum.photos/200/300'
          memo='메모'
          category='카테고리'
          tags={['태그1', '태그2']}
        />
      </div>
      <div className='flex flex-col gap-5 px-4'>
        <CompactCard
          title='제목'
          src='https://picsum.photos/200/300'
          memo='메모'
          category='카테고리'
          tags={['태그1', '태그2']}
        />
      </div>
      <div className='flex flex-col gap-5 px-4'>
        <CompactCard
          title='제목'
          src='https://picsum.photos/200/300'
          memo='메모'
          category='카테고리'
          tags={['태그1', '태그2']}
        />
      </div>
      <div className='flex flex-col gap-5 px-4'>
        <CompactCard
          title='제목'
          src='https://picsum.photos/200/300'
          memo='메모'
          category='카테고리'
          tags={['태그1', '태그2']}
        />
      </div>
      <div className='flex flex-col gap-5 px-4'>
        <CompactCard
          title='제목'
          src='https://picsum.photos/200/300'
          memo='메모'
          category='카테고리'
          tags={['태그1', '태그2']}
        />
      </div>
      <div className='flex flex-col gap-5 px-4'>
        <CompactCard
          title='제목'
          src='https://picsum.photos/200/300'
          memo='메모'
          category='카테고리'
          tags={['태그1', '태그2']}
        />
      </div>
    </div>
  );
};

export default SearchResult;
