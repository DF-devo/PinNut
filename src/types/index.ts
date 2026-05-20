export type Priority = 'low' | 'medium' | 'high';

export interface Note {
  id: string;
  text: string;
  tags: string[];
  color: string;
  priority: Priority;
  deadline: string; // формат YYYY-MM-DDTHH:mm
  pinned: boolean;
  createdAt: number;
}

export type SortOption = 'date' | 'priority';