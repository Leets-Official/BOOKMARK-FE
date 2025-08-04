export interface SearchCategory {
  categoryId: number;
  categoryName: string;
}

export interface SearchTag {
  tagName: string;
  tagIds: number[];
  categoryIds: number[];
}
