// функция сортировки заметки

import type { Note } from '../types'

export function sortNotes(notes: Note[], option: 'date' | 'priority'): Note[] {
    if (option === 'date') {
        return [...notes].sort((a, b) => b.createdAt - a.createdAt)
    }

    const priorityOrder: Record<string, number> = { high: 0, medium: 1, low: 2 }

    return [...notes].sort((a, b) => {
        const aPri = priorityOrder[a.priority] ?? 3
        const bPri = priorityOrder[b.priority] ?? 3
        if (aPri !== bPri) return aPri - bPri
        return b.createdAt - a.createdAt
    })
}