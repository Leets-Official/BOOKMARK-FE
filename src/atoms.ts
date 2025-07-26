import { atom } from 'jotai';
import {
  dummyCategoryList,
  dummyDateOptions,
  dummyTagList,
  dummyTimeOptions,
} from './contants/DummyData';
import type { ChipProps } from './types/components/components';

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
const dateOptionsAtom = atom<{ id: number; name: string }[]>(dummyDateOptions);
const timeOptionsAtom = atom<{ id: number; name: string }[]>(dummyTimeOptions);
const selectedDateAtom = atom<string>('');
const selectedTimeAtom = atom<string>('');
const isSaveButtonDisabledAtom = atom<boolean>(true);
const searchContentsAtom = atom<string>('');
const selectedCategoriesAtom = atom<string[]>([]);
const selectedTagsAtom = atom<string[]>([]);
const selectedPlatformsAtom = atom<string[]>([]);
const previewImageAtom = atom<string | undefined>(undefined);
const isSuggestionLoadingAtom = atom(false);

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
};
