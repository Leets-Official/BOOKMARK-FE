export interface CategoryProps {
  id: number;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
  thumbnailUrls: [];
}

export interface CategoryWithTagProps {
  categoryId: number;
  categoryName: string;
  createdAt: string;
  tags: TagProps[];
}

export interface TagProps {
  tagId: number;
  categoryId: number;
  tagName: string;
}
