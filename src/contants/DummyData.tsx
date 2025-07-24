// 더미 데이터(카테고리, 태그)
import type { ChipProps, CompactCardProps, SaveCardProps } from '@/types';

const dummyCategoryList: ChipProps[] = [
  { id: 0, content: '개발', isSelected: false, type: 'category' },
  { id: 1, content: '디자인', isSelected: false, type: 'category' },
  { id: 2, content: '레퍼런스', isSelected: false, type: 'category' },
  { id: 3, content: '공모전', isSelected: false, type: 'category' },
  { id: 4, content: '드로잉', isSelected: false, type: 'category' },
  { id: 5, content: '아티클', isSelected: false, type: 'category' },
  { id: 6, content: '카테고리', isSelected: false, type: 'category' },
  { id: 7, content: '카테고리', isSelected: false, type: 'category' },
  { id: 8, content: '카테고리', isSelected: false, type: 'category' },
  { id: 9, content: '카테고리', isSelected: false, type: 'category' },
  { id: 10, content: '카테고리', isSelected: false, type: 'category' },
];

const dummyTagList: ChipProps[] = [
  { id: 0, content: '태그', isSelected: false, type: 'tag', isNew: false },
  { id: 1, content: '태그', isSelected: false, type: 'tag', isNew: false },
  { id: 2, content: '태그', isSelected: false, type: 'tag', isNew: false },
  { id: 3, content: '태그', isSelected: false, type: 'tag', isNew: false },
  { id: 4, content: '태그', isSelected: false, type: 'tag', isNew: false },
];

const dummyPlatformList: ChipProps[] = [
  { id: 0, content: '플랫폼', isSelected: false, type: 'platform' },
  { id: 1, content: '플랫폼', isSelected: false, type: 'platform' },
  { id: 2, content: '플랫폼', isSelected: false, type: 'platform' },
  { id: 3, content: '플랫폼', isSelected: false, type: 'platform' },
  { id: 4, content: '플랫폼', isSelected: false, type: 'platform' },
];

const dummyCompactCardList: CompactCardProps[] = [
  {
    id: 1,
    title: 'SEMIHARU CITY PO',
    image: 'https://cdn.pixabay.com/photo/2021/03/18/19/56/keyboard-6105750_960_720.jpg',
    memo: '작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트.',
    category: '카테고리',
    tags: ['태그', '태그', '태그'],
  },
  {
    id: 2,
    title: 'SEMIHARU CITY PO',
    image: 'https://cdn.pixabay.com/photo/2021/03/18/19/56/keyboard-6105750_960_720.jpg',
    memo: '작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트.',
    category: '카테고리',
    tags: ['태그', '태그', '태그'],
  },
  {
    id: 3,
    title: 'SEMIHARU CITY PO',
    image: 'https://cdn.pixabay.com/photo/2021/03/18/19/56/keyboard-6105750_960_720.jpg',
    memo: '작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트.',
    category: '카테고리',
    tags: ['태그', '태그', '태그'],
  },
  {
    id: 4,
    title: 'SEMIHARU CITY PO',
    image: 'https://cdn.pixabay.com/photo/2021/03/18/19/56/keyboard-6105750_960_720.jpg',
    memo: '작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트.',
    category: '카테고리',
    tags: ['태그', '태그', '태그'],
  },
];

// 더미 데이터(알림 설정 시간)
const dummyDateOptions = [
  {
    id: 1,
    name: '내일 (금)',
  },
  {
    id: 2,
    name: '2일뒤 (토)',
  },
  {
    id: 3,
    name: '3일뒤 (일)',
  },
  {
    id: 4,
    name: '4일뒤 (월)',
  },
  {
    id: 5,
    name: '5일뒤 (화)',
  },
  {
    id: 6,
    name: '6일뒤 (수)',
  },
];

const dummyTimeOptions = [
  {
    id: 1,
    name: '10:00',
  },
  {
    id: 2,
    name: '11:00',
  },
  {
    id: 3,
    name: '12:00',
  },
  {
    id: 4,
    name: '13:00',
  },
  {
    id: 5,
    name: '14:00',
  },
  {
    id: 6,
    name: '15:00',
  },
];

// Home에 뜨는 카드 데이터
const dummyCardData: SaveCardProps[] = [
  {
    id: 1,
    title: '홍대 파스타 맛집 추천',
    category: '맛집',
    tags: ['파스타', '이탈리안', '데이트'],
    image: 'https://cdn.pixabay.com/photo/2018/04/26/16/31/marine-3352341_1280.jpg',
    memo: '홍대 숨은 파스타 맛집 발견!',
    platform: '인스타',
  },
  {
    id: 2,
    title: '리액트 기초 문법 정리',
    category: '리액트',
    tags: ['JSX', '컴포넌트', '훅스'],
    image: 'https://cdn.pixabay.com/photo/2016/03/08/20/03/flag-1244648_1280.jpg',
    memo: '리액트 기초 문법을 익혀보자.',
    platform: '유튜브',
  },
  {
    id: 3,
    title: '갤럭시 워치 실사용 후기',
    category: '갤럭시 워치',
    tags: ['헬스', '알림', '배터리'],
    image: 'https://cdn.pixabay.com/photo/2018/04/26/12/14/travel-3351825_1280.jpg',
    memo: '애플 워치는 너무 비싸서 갤럭시 워치 사려고 했는데 벤텐 시계 같아서 너무 안 이쁨 ㅜㅜ',
    platform: '브런치',
  },
  {
    id: 4,
    title: 'Node.js와 Express로 API 만들기',
    category: '백엔드',
    tags: ['Node.js', 'Express', 'REST'],
    image: 'https://cdn.pixabay.com/photo/2013/03/01/18/40/crispus-87928_1280.jpg',
    memo: 'Node.js와 Express로 API 제작.',
    platform: '네이버',
  },
  {
    id: 5,
    title: '집에서 하는 홈트 루틴',
    category: '운동',
    tags: ['홈트', '루틴', '근력'],
    image: 'https://cdn.pixabay.com/photo/2013/02/01/18/14/url-77169_1280.jpg',
    memo: '집에서 할 수 있는 효과적인 운동법.',
    platform: '티스토리',
  },
  {
    id: 6,
    title: 'MongoDB로 NoSQL 배우기',
    category: '개발',
    tags: ['MongoDB', 'NoSQL', '스키마'],
    image: 'https://cdn.pixabay.com/photo/2020/09/19/19/37/landscape-5585247_1280.jpg',
    memo: 'MongoDB로 NoSQL 구조 학습.',
    platform: '유튜브',
  },
  {
    id: 7,
    title: 'Next.js로 SSR 구현하기',
    category: '리액트',
    tags: ['Next.js', 'SSR', '라우팅'],
    image: 'https://cdn.pixabay.com/photo/2017/01/28/17/43/fish-2016013_1280.jpg',
    memo: 'Next.js로 서버사이드 렌더링 구현.',
    platform: '인스타',
  },
  {
    id: 8,
    title: 'Git 협업 전략 요약',
    category: '깃허브',
    tags: ['푸시', '브랜치', '머지'],
    image: 'https://cdn.pixabay.com/photo/2013/01/29/00/47/google-76517_1280.png',
    memo: 'Git 브랜치 전략과 협업 흐름.',
    platform: '깃허브',
  },
  {
    id: 9,
    title: '성수 브런치 카페 리스트',
    category: '맛집',
    tags: ['브런치', '카페', '디저트'],
    image: 'https://cdn.pixabay.com/photo/2024/02/05/18/54/sunlight-8555108_1280.jpg',
    memo: '성수동 브런치 카페 추천 리스트.',
    platform: '노션',
  },
  {
    id: 10,
    title: 'GraphQL + Apollo 기초 연결',
    category: 'API',
    tags: ['GraphQL', 'Apollo', '쿼리'],
    image: 'https://cdn.pixabay.com/photo/2024/05/22/21/51/dog-8781844_640.jpg',
    memo: 'GraphQL과 Apollo로 유연한 API 연결.',
    platform: '유튜브',
  },
  {
    id: 11,
    title: '아침 요가 루틴',
    category: '운동',
    tags: ['요가', '스트레칭', '밸런스'],
    image: 'https://cdn.pixabay.com/photo/2025/05/16/07/22/arcades-9603171_1280.jpg',
    memo: '아침 요가로 하루를 시작하는 법.',
    platform: '인스타',
  },
  {
    id: 12,
    title: 'Docker로 배포 자동화하기',
    category: '개발',
    tags: ['Docker', '컨테이너', '배포'],
    image: 'https://cdn.pixabay.com/photo/2022/01/16/13/02/budapest-6941969_1280.jpg',
    memo: '도커로 환경 통일과 배포 자동화.',
    platform: '브런치',
  },
  {
    id: 13,
    title: '헬스장 입문자를 위한 가이드',
    category: '운동',
    tags: ['헬스장', '스쿼트', '데드리프트'],
    image: 'https://cdn.pixabay.com/photo/2025/07/16/07/19/british-shorthair-9717301_1280.jpg',
    memo: '헬스장 초보자를 위한 운동 가이드.',
    platform: '유튜브',
  },
  {
    id: 14,
    title: 'SWR vs React Query 비교',
    category: 'API',
    tags: ['SWR', 'React Query', '캐싱'],
    image: 'https://cdn.pixabay.com/photo/2022/03/07/10/47/bird-7053394_1280.jpg',
    memo: '데이터 패칭 비교: SWR vs ReactQuery',
    platform: '깃허브',
  },
  {
    id: 15,
    title: '갤럭시 워치 페이스 커스터마이징',
    category: '갤럭시 워치',
    tags: ['앱', '커스텀', '페이스'],
    image: 'https://cdn.pixabay.com/photo/2022/11/05/22/11/channel-7572879_1280.jpg',
    memo: '갤럭시 워치 페이스 커스터마이징.',
    platform: '인스타',
  },
  {
    id: 16,
    title: 'GitHub Actions로 CI/CD 구축',
    category: '개발',
    tags: ['CI/CD', 'Actions', '자동화'],
    image: 'https://cdn.pixabay.com/photo/2021/08/17/09/52/woman-6552517_1280.jpg',
    memo: 'GitHub Actions로 자동화 구축.',
    platform: '노션',
  },
  {
    id: 17,
    title: 'Tailwind CSS로 빠른 스타일링',
    category: 'TailWind',
    tags: ['반응형', '유틸리티', '스타일'],
    image: 'https://cdn.pixabay.com/photo/2022/08/21/08/02/animal-7400625_1280.jpg',
    memo: 'Tailwind CSS로 빠르게 스타일링.',
    platform: '유튜브',
  },
  {
    id: 18,
    title: 'Storybook으로 UI 관리',
    category: '리액트',
    tags: ['Storybook', 'UI', '컴포넌트'],
    image: 'https://cdn.pixabay.com/photo/2025/04/15/05/45/heat-9534673_1280.jpg',
    memo: 'Storybook으로 독립된 컴포넌트 관리.',
    platform: '네이버',
  },
  {
    id: 19,
    title: '마라톤 완주 훈련 계획',
    category: '운동',
    tags: ['러닝', '마라톤', '페이스'],
    image: 'https://cdn.pixabay.com/photo/2025/05/02/23/23/australia-9574728_1280.jpg',
    memo: '마라톤 완주를 위한 훈련 계획.',
    platform: '유튜브',
  },
  {
    id: 20,
    title: 'React Native로 앱 만들기',
    category: '리액트',
    tags: ['React Native', '모바일', '크로스플랫폼'],
    image: 'https://cdn.pixabay.com/photo/2025/07/12/13/27/shellfish-9710628_1280.jpg',
    memo: 'React Native로 모바일 앱 만들기.',
    platform: '브런치',
  },
];

export {
  dummyCategoryList,
  dummyTagList,
  dummyPlatformList,
  dummyCompactCardList,
  dummyDateOptions,
  dummyTimeOptions,
  dummyCardData,
};
