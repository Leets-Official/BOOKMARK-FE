// // 더미 데이터(카테고리, 태그)
// import type { ChipProps, CompactCardProps } from '@/types';

// const dummyCategoryList: ChipProps[] = [
//   { id: 0, content: '카테고리', isSelected: false, type: 'category' },
//   { id: 1, content: '카테고리', isSelected: false, type: 'category' },
//   { id: 2, content: '카테고리', isSelected: false, type: 'category' },
//   { id: 3, content: '카테고리', isSelected: false, type: 'category' },
//   { id: 4, content: '카테고리', isSelected: false, type: 'category' },
//   { id: 5, content: '카테고리', isSelected: false, type: 'category' },
//   { id: 6, content: '카테고리', isSelected: false, type: 'category' },
//   { id: 7, content: '카테고리', isSelected: false, type: 'category' },
//   { id: 8, content: '카테고리', isSelected: false, type: 'category' },
//   { id: 9, content: '카테고리', isSelected: false, type: 'category' },
//   { id: 10, content: '카테고리', isSelected: false, type: 'category' },
// ];

// const dummyTagList: ChipProps[] = [
//   { id: 0, content: '태그', isSelected: false, type: 'tag', isNew: false },
//   { id: 1, content: '태그', isSelected: false, type: 'tag', isNew: false },
//   { id: 2, content: '태그', isSelected: false, type: 'tag', isNew: false },
//   { id: 3, content: '태그', isSelected: false, type: 'tag', isNew: false },
//   { id: 4, content: '태그', isSelected: false, type: 'tag', isNew: false },
// ];

// const dummyCompactCardList: CompactCardProps[] = [
//   {
//     title: 'SEMIHARU CITY PO',
//     src: 'https://cdn.pixabay.com/photo/2021/03/18/19/56/keyboard-6105750_960_720.jpg',
//     memo: '작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트.',
//     category: '카테고리',
//     tags: ['태그', '태그', '태그'],
//   },
//   {
//     title: 'SEMIHARU CITY PO',
//     src: 'https://cdn.pixabay.com/photo/2021/03/18/19/56/keyboard-6105750_960_720.jpg',
//     memo: '작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트.',
//     category: '카테고리',
//     tags: ['태그', '태그', '태그'],
//   },
//   {
//     title: 'SEMIHARU CITY PO',
//     src: 'https://cdn.pixabay.com/photo/2021/03/18/19/56/keyboard-6105750_960_720.jpg',
//     memo: '작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트.',
//     category: '카테고리',
//     tags: ['태그', '태그', '태그'],
//   },
//   {
//     title: 'SEMIHARU CITY PO',
//     src: 'https://cdn.pixabay.com/photo/2021/03/18/19/56/keyboard-6105750_960_720.jpg',
//     memo: '작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트.',
//     category: '카테고리',
//     tags: ['태그', '태그', '태그'],
//   },
// ];

// // 더미 데이터(알림 설정 시간)
// const dummyDateOptions = [
//   {
//     id: 1,
//     name: '내일(금) 8/1',
//   },
//   {
//     id: 2,
//     name: '모레(토) 8/2',
//   },
//   {
//     id: 3,
//     name: '8/3',
//   },
//   {
//     id: 4,
//     name: '8/4',
//   },
//   {
//     id: 5,
//     name: '8/5',
//   },
//   {
//     id: 6,
//     name: '8/6',
//   },
// ];

// const dummyTimeOptions = [
//   {
//     id: 1,
//     name: '10:00',
//   },
//   {
//     id: 2,
//     name: '11:00',
//   },
//   {
//     id: 3,
//     name: '12:00',
//   },
//   {
//     id: 4,
//     name: '13:00',
//   },
//   {
//     id: 5,
//     name: '14:00',
//   },
//   {
//     id: 6,
//     name: '15:00',
//   },
// ];

// export {
//   dummyCategoryList,
//   dummyTagList,
//   dummyCompactCardList,
//   dummyDateOptions,
//   dummyTimeOptions,
// };
