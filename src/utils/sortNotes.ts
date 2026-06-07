// функция сортировки заметки

import type { Note } from '../types'

export type SortOption = 'date_asc' | 'date_desc' | 'priority_asc' | 'priority_desc'

export function sortNotes(notes: Note[], option: SortOption): Note[] {
    const priorityOrder: Record<string, number> = { high: 0, medium: 1, low: 2 }

    return [...notes].sort((a, b) => {
        // Новые сначала
        if (option === 'date_desc') {
            return b.createdAt - a.createdAt
        }
        
        // Старые сначала
        if (option === 'date_asc') {
            return a.createdAt - b.createdAt
        }
        
        // Высокий → Низкий
        if (option === 'priority_desc') {
            const aPri = priorityOrder[a.priority] ?? 3
            const bPri = priorityOrder[b.priority] ?? 3
            if (aPri !== bPri) return aPri - bPri
            return b.createdAt - a.createdAt
        }
        
        // Низкий → Высокий
        if (option === 'priority_asc') {
            const aPri = priorityOrder[a.priority] ?? 3
            const bPri = priorityOrder[b.priority] ?? 3
            if (aPri !== bPri) return bPri - aPri
            return a.createdAt - b.createdAt
        }
        
        return 0
    })
}