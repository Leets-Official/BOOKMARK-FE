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
  memo: string;
  platform: string;
  image: string;
  category: string;
  tags: string[];
  createdAt: string;
}
