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
  file: {
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
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}
