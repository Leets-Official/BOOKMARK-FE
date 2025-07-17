export interface ChipProps {
  id: number;
  content: string;
  isSelected: boolean;
  type: 'category' | 'tag' | 'suggestion';
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
