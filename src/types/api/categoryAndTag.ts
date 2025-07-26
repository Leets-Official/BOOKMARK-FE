export interface CategoryProps {
  id: number;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICategoryWithTags {
  categoryId: number;
  categoryName: string;
  createdAt: string;
  tags: ITag[];
}

export interface ITag {
  tagId: number;
  categoryId: number;
  tagName: string;
}
