import { create } from 'zustand';
import type { Note } from '../types'

interface NoteState {
  notes: Note[];
  filterTags: string[];
  sortBy: 'date' | 'title';
  theme: 'light' | 'dark';  // НОВОЕ
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'pinned'>) => void;
  updateNote: (id: string, data: Omit<Note, 'id' | 'createdAt' | 'pinned'>) => void;
  togglePin: (id: string) => void;
  deleteNote: (id: string) => void;
  toggleItem: (noteId: string, itemId: string) => void;
  reorderNoteItems: (noteId: string, fromIndex: number, toIndex: number) => void;
}

const STORAGE_KEY = 'pinnut_notes_v1';

const loadNotes = (): Note[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveNotes = (notes: Note[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
};

export const useNoteStore = create<NoteState>((set) => ({
  notes: loadNotes(),

  addNote: (noteData) => set((state) => {
    const newNote: Note = {
      ...noteData,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      pinned: false,
    };
    const newNotes = [newNote, ...state.notes];
    saveNotes(newNotes);
    return { notes: newNotes };
  }),

  updateNote: (id, data) => set((state) => {
    const newNotes = state.notes.map((n) =>
        n.id === id ? { ...n, ...data } : n
    );
    saveNotes(newNotes);
    return { notes: newNotes };
  }),

  togglePin: (id) => set((state) => {
    const newNotes = state.notes.map((n) =>
        n.id === id ? { ...n, pinned: !n.pinned } : n
    );
    saveNotes(newNotes);
    return { notes: newNotes };
  }),

  deleteNote: (id) => set((state) => {
    const newNotes = state.notes.filter((n) => n.id !== id);
    saveNotes(newNotes);
    return { notes: newNotes };
  }),

  toggleItem: (noteId, itemId) => set((state) => {
    const newNotes = state.notes.map((n) => {
      if (n.id !== noteId) return n;
      const items = n.items ?? [];
      const target = items.find(i => i.id === itemId);
      const becomingDone = target ? !target.done : false;
      const toggled = items.map(i =>
          i.id === itemId ? { ...i, done: !i.done } : i
      );
      return {
        ...n,
        items: becomingDone
            ? toggled.sort((a, b) => Number(a.done) - Number(b.done))
            : toggled,
      };
    });
    saveNotes(newNotes);
    return { notes: newNotes };
  }),

  reorderNoteItems: (noteId, fromIndex, toIndex) => set((state) => {
    const newNotes = state.notes.map((n) => {
      if (n.id !== noteId) return n;
      const items = [...(n.items ?? [])];
      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);
      return { ...n, items };
    });
    saveNotes(newNotes);
    return { notes: newNotes };
  }),
}));
