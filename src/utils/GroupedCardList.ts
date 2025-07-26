// CardList, MobileCardList에서만 사용 (나중에 API 연동 시 바뀔 수 있음)
import { getCategories } from '@/api/category/category';
import type { CategoryCardProps, CategoryProps, ErrorProps } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useGetGroupedCardList = () => {
  const categoryCards = [] as CategoryCardProps[];

  const { data: categories } = useQuery<CategoryProps[] | ErrorProps>({
    queryKey: ['categories'],
    queryFn: () => {
      return getCategories();
    },
  });

  categories?.forEach((category: CategoryProps) => {
    categoryCards.push({
      id: category.id,
      title: category.categoryName,
      image: category.image,
    });
  });

  // 카테고리 기준으로 그룹화
  const groupedByCategory = dummyCardData.reduce((groupedCards, card) => {
    if (!groupedCards[card.category]) groupedCards[card.category] = [];
    groupedCards[card.category].push(card); // 카테고리가 같은 카드를 하나씩 넣음
    return groupedCards;
  }, {} as GroupedByCategoryType);

  // 각 카테고리마다 최신순 3개 이미지까지 추출
  const cardList = Object.entries(groupedByCategory).map(([category, cards]) => {
    const sorted = cards.sort((a, b) => a.id - b.id);
    return {
      id: sorted[0].id, // 하나의 카테고리로 묶인 여러 카드의 id중 하나 선택
      category: category, // 폴더로 보낼 이미지 최대 3개까지(배열 형태로 최신순 부터 앞에 위치)
      images: sorted.slice(0, 3).map((card) => card.image),
    };
  });

  return cardList;
};
