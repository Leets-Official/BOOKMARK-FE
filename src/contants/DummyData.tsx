// 더미 데이터(카테고리, 태그)
import type { ChipProps, CompactCardProps } from '@/types';

const dummyCategoryList: ChipProps[] = [
  { id: 0, content: '카테고리', isSelected: false, type: 'category' },
  { id: 1, content: '카테고리', isSelected: false, type: 'category' },
  { id: 2, content: '카테고리', isSelected: false, type: 'category' },
  { id: 3, content: '카테고리', isSelected: false, type: 'category' },
  { id: 4, content: '카테고리', isSelected: false, type: 'category' },
  { id: 5, content: '카테고리', isSelected: false, type: 'category' },
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

const dummyCompactCardList: CompactCardProps[] = [
  {
    title: 'SEMIHARU CITY PO',
    src: 'https://cdn.pixabay.com/photo/2021/03/18/19/56/keyboard-6105750_960_720.jpg',
    memo: '작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트.',
    category: '카테고리',
    tags: ['태그', '태그', '태그'],
  },
  {
    title: 'SEMIHARU CITY PO',
    src: 'https://cdn.pixabay.com/photo/2021/03/18/19/56/keyboard-6105750_960_720.jpg',
    memo: '작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트.',
    category: '카테고리',
    tags: ['태그', '태그', '태그'],
  },
  {
    title: 'SEMIHARU CITY PO',
    src: 'https://cdn.pixabay.com/photo/2021/03/18/19/56/keyboard-6105750_960_720.jpg',
    memo: '작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트.',
    category: '카테고리',
    tags: ['태그', '태그', '태그'],
  },
  {
    title: 'SEMIHARU CITY PO',
    src: 'https://cdn.pixabay.com/photo/2021/03/18/19/56/keyboard-6105750_960_720.jpg',
    memo: '작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트. 친구에게 추천받음. 내가 딱 좋아하는 시티팝 재질. 작업하면서 듣기 좋은 플레이리스트.',
    category: '카테고리',
    tags: ['태그', '태그', '태그'],
  },
];

// 더미 데이터(알림 설정 시간)
const dummyDateOptions = [
  {
    id: 1,
    name: '내일(금) 8/1',
  },
  {
    id: 2,
    name: '모레(토) 8/2',
  },
  {
    id: 3,
    name: '8/3',
  },
  {
    id: 4,
    name: '8/4',
  },
  {
    id: 5,
    name: '8/5',
  },
  {
    id: 6,
    name: '8/6',
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

export interface SaveCardProps {
  id: number;
  category: string;
  tags: string[];
  image: string;
  memo: string;
  platform: string;
}

const dummyCardData: SaveCardProps[] = [
  {
    id: 1,
    category: 'React Basics',
    tags: ['React', 'JavaScript', 'Frontend', 'JSX'],
    image: 'https://cdn.pixabay.com/photo/2018/04/26/16/31/marine-3352341_1280.jpg',
    memo: 'Learn the fundamentals of React.',
    platform: '유튜브',
  },
  {
    id: 2,
    category: 'Tailwind CSS Tips',
    tags: ['CSS', 'Tailwind', 'UI', 'Responsive', 'Utility-first'],
    image: 'https://cdn.pixabay.com/photo/2016/03/08/20/03/flag-1244648_1280.jpg',
    memo: 'Build modern UIs quickly using Tailwind CSS.',
    platform: '인스타',
  },
  {
    id: 3,
    category: 'Framer Motion Guide',
    tags: ['Animation', 'Framer Motion', 'React', 'UI'],
    image: 'https://cdn.pixabay.com/photo/2018/04/26/12/14/travel-3351825_1280.jpg',
    memo: 'Animate your components with ease.',
    platform: '네이버',
  },
  {
    id: 4,
    category: 'Node.js API',
    tags: ['Node.js', 'Backend', 'Express', 'API'],
    image: 'https://cdn.pixabay.com/photo/2013/03/01/18/40/crispus-87928_1280.jpg',
    memo: 'Build a backend with Node.js and Express.',
    platform: '유튜브',
  },
  {
    id: 5,
    category: 'TypeScript Intro',
    tags: ['TypeScript', 'Types', 'JavaScript'],
    image: 'https://cdn.pixabay.com/photo/2013/02/01/18/14/url-77169_1280.jpg',
    memo: 'Type safety in JavaScript using TypeScript.',
    platform: '티스토리',
  },
  {
    id: 6,
    category: 'MongoDB Essentials',
    tags: ['Database', 'MongoDB', 'NoSQL'],
    image: 'https://cdn.pixabay.com/photo/2020/09/19/19/37/landscape-5585247_1280.jpg',
    memo: 'Work with NoSQL databases using MongoDB.',
    platform: '유튜브',
  },
  {
    id: 7,
    category: 'Next.js Basics',
    tags: ['Next.js', 'React', 'SSR'],
    image: 'https://cdn.pixabay.com/photo/2017/01/28/17/43/fish-2016013_1280.jpg',
    memo: 'A powerful React framework for production.',
    platform: '인스타',
  },
  {
    id: 8,
    category: 'Redux Toolkit',
    tags: ['Redux', 'State', 'React'],
    image: 'https://cdn.pixabay.com/photo/2013/01/29/00/47/google-76517_1280.png',
    memo: 'Simplified Redux state management.',
    platform: '깃허브',
  },
  {
    id: 9,
    category: 'Firebase Auth',
    tags: ['Firebase', 'Authentication', 'Login'],
    image: 'https://cdn.pixabay.com/photo/2024/02/05/18/54/sunlight-8555108_1280.jpg',
    memo: 'Integrate secure login systems easily.',
    platform: '유튜브',
  },
  {
    id: 10,
    category: 'GraphQL with Apollo',
    tags: ['GraphQL', 'API', 'Apollo'],
    image: 'https://cdn.pixabay.com/photo/2024/05/22/21/51/dog-8781844_640.jpg',
    memo: 'Flexible data fetching with GraphQL.',
    platform: '유튜브',
  },
  {
    id: 11,
    category: 'Jest Testing',
    tags: ['Testing', 'Jest', 'Unit Test'],
    image: 'https://cdn.pixabay.com/photo/2025/05/16/07/22/arcades-9603171_1280.jpg',
    memo: 'Test your components and logic.',
    platform: '인스타',
  },
  {
    id: 12,
    category: 'Docker Basics',
    tags: ['Docker', 'DevOps', 'Container'],
    image: 'https://cdn.pixabay.com/photo/2022/01/16/13/02/budapest-6941969_1280.jpg',
    memo: 'Build and run containerized applications.',
    platform: '유튜브',
  },
  {
    id: 13,
    category: 'Zustand State',
    tags: ['Zustand', 'State Management', 'Hooks'],
    image: 'https://cdn.pixabay.com/photo/2025/07/16/07/19/british-shorthair-9717301_1280.jpg',
    memo: 'A minimalist global state library.',
    platform: '유튜브',
  },
  {
    id: 14,
    category: 'SWR vs React Query',
    tags: ['SWR', 'React Query', 'Data'],
    image: 'https://cdn.pixabay.com/photo/2022/03/07/10/47/bird-7053394_1280.jpg',
    memo: 'Choose the right tool for async data.',
    platform: '유튜브',
  },
  {
    id: 15,
    category: 'Git Workflow',
    tags: ['Git', 'GitHub', 'Version Control'],
    image: 'https://cdn.pixabay.com/photo/2022/11/05/22/11/channel-7572879_1280.jpg',
    memo: 'Master common Git workflows.',
    platform: '인스타',
  },
  {
    id: 16,
    category: 'CI/CD with GitHub Actions',
    tags: ['CI', 'CD', 'Deployment'],
    image: 'https://cdn.pixabay.com/photo/2021/08/17/09/52/woman-6552517_1280.jpg',
    memo: 'Automate your build and deploy pipelines.',
    platform: '네이버',
  },
  {
    id: 17,
    category: 'Web Accessibility',
    tags: ['Accessibility', 'A11y', 'WCAG'],
    image: 'https://cdn.pixabay.com/photo/2022/08/21/08/02/animal-7400625_1280.jpg',
    memo: 'Make your app inclusive and accessible.',
    platform: '유튜브',
  },
  {
    id: 18,
    category: 'Storybook for UI',
    tags: ['Storybook', 'UI', 'Components'],
    image: 'https://cdn.pixabay.com/photo/2025/04/15/05/45/heat-9534673_1280.jpg',
    memo: 'Develop and document components in isolation.',
    platform: '네이버',
  },
  {
    id: 19,
    category: 'Performance Optimization',
    tags: ['Performance', 'Optimization', 'Speed'],
    image: 'https://cdn.pixabay.com/photo/2025/05/02/23/23/australia-9574728_1280.jpg',
    memo: 'Speed up your web apps effectively.',
    platform: '인스타',
  },
  {
    id: 20,
    category: 'React Native Intro',
    tags: ['React Native', 'Mobile', 'Cross-platform'],
    image: 'https://cdn.pixabay.com/photo/2025/07/12/13/27/shellfish-9710628_1280.jpg',
    memo: 'Build mobile apps using React.',
    platform: '유튜브',
  },
];

export {
  dummyCategoryList,
  dummyTagList,
  dummyDateOptions,
  dummyTimeOptions,
  dummyCompactCardList,
  dummyCardData,
};
