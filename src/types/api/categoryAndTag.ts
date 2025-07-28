export interface CategoryProps {
  id: number;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryWithTagProps {
  categoryId: number;
  categoryName: string;
  createdAt: string;
  tags: tagProps[];
}

export interface tagProps {
  tagId: number;
  categoryId: number;
  tagName: string;
}
