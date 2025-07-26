export interface BookmarkProps {
  id: number;
  url: string;
  title: string;
  memo: string;
  thumbnailUrl: string;
  categoryTagInfo: {
    categoryId: number;
    categoryName: string;
    tags: {
      id: number;
      tagName: string;
    }[];
  };
  createdAt: string;
  updatedAt: string;
}
