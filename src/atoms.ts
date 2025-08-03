import { atom } from 'jotai';
import type { ChipProps } from './types/components/components';
import { dateOptions, timeOptions } from './constants/dateTimeData';

// Save Page Atoms
const linkAtom = atom('');
const titleAtom = atom<string>('');
const platformAtom = atom<string>('');
const thumbnailAtom = atom<string | undefined>(undefined);
const faviconAtom = atom<string | undefined>(undefined);
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
const selectedCategoriesAtom = atom<string[]>([]);
const selectedTagsAtom = atom<string[]>([]);
const selectedPlatformsAtom = atom<string[]>([]);
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
};
