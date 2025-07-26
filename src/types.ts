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
