import { atom } from 'jotai';
import { dummyCategoryList, dummyTagList } from './constants/DummyData';
import type { ChipProps } from './types/components/components';
import { dateOptions, timeOptions } from './constants/dateTimeData';
import type { SearchCategory, SearchTag } from './types/common/search';
import type { PlatformProps } from './types/api/platform';

// Save Page Atoms
const linkAtom = atom('');
const memoAtom = atom('');
const visibleCardAtom = atom(false);
const visibleCategoryAtom = atom(false);
const visibleTagAtom = atom(false);
const visibleMemoAndAlarmAtom = atom(false);
const categoryListAtom = atom<ChipProps[]>(dummyCategoryList);
const tagListAtom = atom<ChipProps[]>(dummyTagList);
const suggestionListAtom = atom<ChipProps[]>([]);
const dateOptionsAtom = atom<{ id: number; name: string }[]>(dateOptions);
const timeOptionsAtom = atom<{ id: number; name: string }[]>(timeOptions);
const selectedDateAtom = atom<string>('');
const selectedTimeAtom = atom<string>('');
const isSaveButtonDisabledAtom = atom<boolean>(true);
const searchContentsAtom = atom<string>('');
const selectedCategoriesAtom = atom<SearchCategory[]>([]);
const selectedTagsAtom = atom<SearchTag[]>([]);
const selectedPlatformsAtom = atom<PlatformProps[]>([]);
const previewImageAtom = atom<string | undefined>(undefined);
const isSuggestionLoadingAtom = atom(false);
const tempCategoriesAtom = atom<string[]>([]);
const tempTagsAtom = atom<Record<string, string[]>>({});
const selectedCategoryAtom = atom<string>('');
const selectedTagAtom = atom<string[]>([]);
const scrollBarWidthAtom = atom(0);

export {
  linkAtom,
  memoAtom,
  visibleCardAtom,
  visibleCategoryAtom,
  visibleTagAtom,
  visibleMemoAndAlarmAtom,
  categoryListAtom,
  tagListAtom,
  suggestionListAtom,
  dateOptionsAtom,
  timeOptionsAtom,
  selectedDateAtom,
  selectedTimeAtom,
  isSaveButtonDisabledAtom,
  searchContentsAtom,
  selectedCategoriesAtom,
  selectedTagsAtom,
  selectedPlatformsAtom,
  previewImageAtom,
  isSuggestionLoadingAtom,
  tempCategoriesAtom,
  tempTagsAtom,
  selectedCategoryAtom,
  selectedTagAtom,
  scrollBarWidthAtom,
};
