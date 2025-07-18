import ChipDropDown from '@/components/layout/dropDown/ChipDropDown';
import { dummyCategoryList, dummyPlatformList, dummyTagList } from '@/contants/DummyData';

const SearchResult = () => {
  return (
    <div className='flex flex-row gap-5'>
      <ChipDropDown title='카테고리' options={dummyCategoryList} />
      <ChipDropDown title='태그' options={dummyTagList} />
      <ChipDropDown title='플랫폼' options={dummyPlatformList} />
    </div>
  );
};

export default SearchResult;
