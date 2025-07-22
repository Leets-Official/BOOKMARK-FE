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

export interface SaveCardProps {
  id: number;
  category: string;
  tags: string[];
  image: string;
  memo: string;
  platform: string;
}
