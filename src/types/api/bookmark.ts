export interface BookMarkURLProps {
  title: string;
  thumbnailUrl: string;
  faviconUrl: string;
  platform: string;
}

export interface BookmarkProps {
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
      id: number;
      tagName: string;
    }[];
  }[];
  file: {
    fileId: number;
    fileName: string;
    fileUrl: string;
    createdAt: string;
    updatedAt: string;
  };
  notificationResponse: {
    notificationId: number;
    notifyAt: string;
    isNotified: boolean;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface BookmarkSearchResultRequestProps {
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

export interface BookmarkSearchResultProps {
  size: number;
  content: BookmarkProps[];
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

export interface BookmarkSaveRequestProps {
  title: string;
  url: string;
  memo?: string;
  thumbnail: string;
  notification?: {
    notifyAt: string;
  };
  platform: string;
  categoryId: number;
  faviconUrl: string;
  tagIds: number[];
}
