import { create } from 'zustand';
import type { Note } from '../types'

interface NoteState {
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'pinned'>) => void;
  updateNote: (id: string, data: Omit<Note, 'id' | 'createdAt' | 'pinned'>) => void;
  togglePin: (id: string) => void;
  deleteNote: (id: string) => void;
  toggleItem: (noteId: string, itemId: string) => void;
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

  // переключение галочки в списке
  toggleItem: (noteId, itemId) => set((state) => {
    const newNotes = state.notes.map((n) =>
        n.id === noteId
            ? { ...n, items: n.items.map(item =>
                  item.id === itemId ? { ...item, done: !item.done } : item
              )}
            : n
    );
    saveNotes(newNotes);
    return { notes: newNotes };
  }),
}));