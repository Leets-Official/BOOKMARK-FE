export interface BookMarkURLProps {
  title: string;
  thumbnailUrl: string;
  faviconUrl: string;
  platform: string;
}

export interface BookmarkSaveProps {
  title: string;
  url: string;
  memo?: string;
  file?: {
    fileName: string;
    fileUrl: string;
  };
  notification?: {
    notifyAt: string;
  };
  platform: 'NAVER' | 'NAVER_BLOG' | 'TISTORY' | 'YOUTUBE' | 'INSTAGRAM' | 'VELOG' | 'ETC';
  categoryId: number;
  faviconUrl: string;
  tagIds: number[];
}

export interface BookmarkSearchProps {
  keyword?: string | null;
  categoryTagRequests?:
    | {
        categoryId: number;
        tagIds: number[];
      }[]
    | null;
  platforms?: string[] | null;
  page: number;
  size: number;
}

export interface BookmarkSearchDataProps {
  size: number;
  content: {
    id: number;
    url: string;
    title: string;
    memo: string;
    platform: string;
    faviconUrl: string;
    categoryTagInfos: {
      categoryId: number;
      categoryName: string;
      tags: {
        tagId: number;
        tagName: string;
      }[];
    }[];
    file?: {
      fileName: string;
      fileUrl: string;
    } | null;
    createdAt: string;
    updatedAt: string;
  }[];
}

export interface SaveBookMarkProps {
  id: number;
  url: string;
  title: string;
  memo: string;
  platform: string;
  image: string;
  faviconUrl: string;
  category: string;
  tags: string[];
  createdAt: string;
}
