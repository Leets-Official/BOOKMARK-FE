export interface ChipProps {
  id: number;
  content: string;
  isSelected: boolean;
  type: 'category' | 'tag' | 'suggestion' | 'platform';
  deleteable?: boolean;
  isNew?: boolean;
}

export interface CompactCardProps {
  id: number;
  title: string;
  image: string;
  memo: string;
  category: string;
  tags: string[];
}

export interface CategoryCardProps {
  id: number;
  title: string;
  image: string[];
}

export interface SaveCardProps {
  id: number;
  title: string;
  category: string;
  tags: string[];
  image: string;
  memo: string;
  platform: string;
}

// api response
export interface SuccessResponse<T> {
  data: T;
  error: false;
}

export interface ErrorResponse {
  data: null;
  error: true;
  message: string;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export interface KakaoLoginResponse {
  userId: number;
  profileImage: string;
  jwtAccessToken: string;
  jwtRefreshToken: string;
}

export interface SearchHistoryProps {
  id: number;
  keyword: string;
  searchedAt: string;
}

export interface CategoryProps {
  id: number;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}

export interface ErrorProps {
  error: boolean;
  message: string;
}
