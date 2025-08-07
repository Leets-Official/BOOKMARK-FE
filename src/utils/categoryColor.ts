const categoryColors = [
  '#397FFF',
  '#4828D7',
  '#80CA14',
  '#9747FF',
  '#F835AA',
  '#FF2C3D',
  '#FF5A39',
  '#FFC400',
];

// 이 객체가 실제로 categoryName -> color 를 기억함
const categoryColorMap = new Map<string, string>();

export const getColorForCategory = (categoryName: string | undefined | null) => {
  if (!categoryName) return '#80CA14'; // 기본색

  if (!categoryColorMap.has(categoryName)) {
    const nextColor = categoryColors[categoryColorMap.size % categoryColors.length];
    categoryColorMap.set(categoryName, nextColor);
  }

  return categoryColorMap.get(categoryName)!;
};
