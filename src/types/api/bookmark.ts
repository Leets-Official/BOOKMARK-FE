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

export interface BookMarkURLProps {
  title: string;
  thumbnailUrl: string;
  faviconUrl: string;
  platform: string;
}

export interface BookmarkSaveProps {
  title: string;
  url: string;
  memo: string;
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
