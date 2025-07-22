export interface ChipProps {
  id: number;
  content: string;
  isSelected: boolean;
  type: 'category' | 'tag' | 'suggestion' | 'platform';
  deleteable?: boolean;
  isNew?: boolean;
}

export interface CompactCardProps {
  title: string;
  src: string;
  memo: string;
  category: string;
  tags: string[];
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
