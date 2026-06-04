export type Priority = 'low' | 'medium' | 'high';

export interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

export interface Note {
  id: string;
  type: 'text' | 'list';
  text: string;
  items: ChecklistItem[];
  tags: string[];
  color: string;
  priority: Priority;
  deadline: string;
  pinned: boolean;
  createdAt: number;
}

export type SortOption = 'date' | 'priority';