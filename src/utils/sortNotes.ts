// функция сортировки заметки

import type { Note } from '../types'

export function sortNotes(notes: Note[], option: 'date' | 'priority'): Note[] {
    if (option === 'date') {
        return [...notes].sort((a, b) => b.createdAt - a.createdAt)
    }

    const priorityOrder = { high: 0, medium: 1, low: 2 }

    return [...notes].sort((a, b) => {
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
            return priorityOrder[a.priority] - priorityOrder[b.priority]
        }
        return b.createdAt - a.createdAt
    })
}