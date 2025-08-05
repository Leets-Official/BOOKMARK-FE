import { atom } from 'jotai';
import type { ChipProps } from './types/components/components';
import { dateOptions, timeOptions } from './constants/dateTimeData';
import type { SearchCategory, SearchTag } from './types/common/search';
import type { PlatformProps } from './types/api/platform';

// Save Page Atoms
const linkAtom = atom('');
const titleAtom = atom<string>('');
const platformAtom = atom<string>('');
const thumbnailAtom = atom<string | undefined>(undefined);
const faviconAtom = atom<string | undefined>(undefined);
const uploadUrlAtom = atom<string>('');
const memoAtom = atom('');
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
  linkAtom,
  titleAtom,
  platformAtom,
  thumbnailAtom,
  faviconAtom,
  memoAtom,
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
