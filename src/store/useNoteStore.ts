import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: number;
  pinned: boolean;  // твоё поле
}

interface NoteState {
  notes: Note[];
  filterTags: string[];
  sortBy: 'date' | 'title';
  theme: 'light' | 'dark';  // НОВОЕ
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'pinned'>) => void;
  togglePin: (id: string) => void;
  deleteNote: (id: string) => void;
  toggleFilterTag: (tag: string) => void;
  setSortBy: (sort: 'date' | 'title') => void;
  clearFilters: () => void;
  toggleTheme: () => void;  // НОВОЕ
}

export const useNoteStore = create<NoteState>()(
  persist(
    (set) => ({
      notes: [],
      filterTags: [],
      sortBy: 'date',
      theme: 'light',  // НОВОЕ

      addNote: (noteData) => set((state) => {
        const newNote: Note = {
          ...noteData,
          id: crypto.randomUUID(),
          createdAt: Date.now(),
          pinned: false,
        };
        return { notes: [newNote, ...state.notes] };
      }),

      togglePin: (id) => set((state) => ({
        notes: state.notes.map((n) =>
          n.id === id ? { ...n, pinned: !n.pinned } : n
        )
      })),

      deleteNote: (id) => set((state) => ({
        notes: state.notes.filter((n) => n.id !== id)
      })),

      toggleFilterTag: (tag) => set((state) => ({
        filterTags: state.filterTags.includes(tag)
          ? state.filterTags.filter((t) => t !== tag)
          : [...state.filterTags, tag]
      })),

      setSortBy: (sortBy) => set({ sortBy }),

      clearFilters: () => set({ filterTags: [] }),
      
      toggleTheme: () => set((state) => ({  // НОВОЕ
        theme: state.theme === 'light' ? 'dark' : 'light'
      })),
    }),
    {
      name: 'pinnut-storage',
    }
  )
);