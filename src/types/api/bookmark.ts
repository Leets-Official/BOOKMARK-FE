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

export interface BookmarkSearchResultRequestProps {
  keyword: string;
  categoryTagRequests: {
    categoryId: number;
    tagIds: number[];
  }[];
  platforms: string[];
  page: number;
  size: number;
}

export interface BookmarkSearchResultProps {
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
    file: {
      fileName: string;
      fileUrl: string;
    };
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
