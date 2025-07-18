import CompactCard from '@/components/ui/card/CompactCard';
import ChipDropDown from '@/components/layout/dropDown/ChipDropDown';
import ChangeSearchBar from '@/components/layout/searchBar/ChangeSearchBar';
import { dummyCategoryList, dummyPlatformList, dummyTagList } from '@/contants/DummyData';
import { useState } from 'react';
import type { ChipProps } from '@/types';

const SearchResult = () => {
  // 카테고리, 태그, 플랫폼 칩 드롭다운 상태 관리(더미 데이터)
  const [categoryList, setCategoryList] = useState<ChipProps[]>(dummyCategoryList);
  const [tagList, setTagList] = useState<ChipProps[]>(dummyTagList);
  const [platformList, setPlatformList] = useState<ChipProps[]>(dummyPlatformList);

  return (
    <div className='relative min-h-screen flex flex-col gap-4'>
      <ChangeSearchBar barMarginTop={100} isBackButton={true} />
      <div className='flex flex-row gap-5 items-center justify-center'>
        {/* 카테고리, 태그, 플랫폼 칩 드롭다운 */}
        <ChipDropDown title='카테고리' options={categoryList} onChange={setCategoryList} />
        <ChipDropDown title='태그' options={tagList} onChange={setTagList} />
        <ChipDropDown title='플랫폼' options={platformList} onChange={setPlatformList} />
      </div>
      {/* 카드 더미 리스트 */}
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
