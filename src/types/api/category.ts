export interface CategoryProps {
  id: number;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryWithTagProps {
  categoryId: number;
  categoryName: string;
  tags: TagProps[];
  platforms: string[];
}

export interface TagProps {
  tagId: number;
  categoryId: number;
  tagName: string;
}
