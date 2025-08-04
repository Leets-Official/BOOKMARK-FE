export interface SearchCategory {
  categoryId: number;
  categoryName: string;
  platforms: string[];
}

export interface SearchTag {
  tagName: string;
  tagIds: number[];
  categoryIds: number[];
}
