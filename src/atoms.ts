import { atom } from 'jotai';
import type { ChipProps } from './types/components/components';
import { dateOptions, timeOptions } from './constants/dateTimeData';
import type { SearchCategory, SearchTag } from './types/common/search';
import type { PlatformProps } from './types/api/platform';

// Save Page Atoms
const uploadUrlAtom = atom<string>('');
const visibleCardAtom = atom(false);
const visibleCategoryAtom = atom(false);
const visibleTagAtom = atom(false);
const visibleMemoAndAlarmAtom = atom(false);
const suggestionListAtom = atom<ChipProps[]>([]);
const dateOptionsAtom = atom<{ id: number; name: string }[]>(dateOptions);
const timeOptionsAtom = atom<{ id: number; name: string }[]>(timeOptions);
const selectedDateAtom = atom<string>('');
const selectedTimeAtom = atom<string>('');
const isSaveButtonDisabledAtom = atom<boolean>(true);
const searchContentsAtom = atom<string>('');
const selectedCategoriesAtom = atom<string[]>([]);
const selectedTagsAtom = atom<string[]>([]);
const selectedPlatformsAtom = atom<string[]>([]);
const selectedSearchCategoriesAtom = atom<SearchCategory[]>([]);
const selectedSearchTagsAtom = atom<SearchTag[]>([]);
const selectedSearchPlatformsAtom = atom<PlatformProps[]>([]);
const previewImageAtom = atom<string | undefined>(undefined);
const isSuggestionLoadingAtom = atom(false);
const tempCategoriesAtom = atom<string[]>([]);
const tempTagsAtom = atom<Record<string, string[]>>({});
const selectedCategoryAtom = atom<string>('');
const selectedTagAtom = atom<string[]>([]);
const scrollBarWidthAtom = atom(0);

export {
  uploadUrlAtom,
  visibleCardAtom,
  visibleCategoryAtom,
  visibleTagAtom,
  visibleMemoAndAlarmAtom,
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
  selectedSearchCategoriesAtom,
  selectedSearchTagsAtom,
  selectedSearchPlatformsAtom,
};
