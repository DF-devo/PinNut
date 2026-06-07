// функция сортировки заметки

import type { Note } from '../types'

export function sortNotes(notes: Note[], option: 'date_asc' | 'date_desc' | 'priority_asc' | 'priority_desc' | 'tag_asc' | 'tag_desc'): Note[] {
    const priorityOrder: Record<string, number> = { high: 0, medium: 1, low: 2 }

    return [...notes].sort((a, b) => {
        // По дате (новые сначала)
        if (option === 'date_desc') {
            return b.createdAt - a.createdAt
        }
        // По дате (старые сначала)
        if (option === 'date_asc') {
            return a.createdAt - b.createdAt
        }
        
        // По приоритету (высокий → низкий)
        if (option === 'priority_desc') {
            const aPri = priorityOrder[a.priority] ?? 3
            const bPri = priorityOrder[b.priority] ?? 3
            if (aPri !== bPri) return aPri - bPri
            return b.createdAt - a.createdAt
        }
        
        // По приоритету (низкий → высокий)
        if (option === 'priority_asc') {
            const aPri = priorityOrder[a.priority] ?? 3
            const bPri = priorityOrder[b.priority] ?? 3
            if (aPri !== bPri) return bPri - aPri
            return a.createdAt - b.createdAt
        }
        
        // По тегам (А → Я)
        if (option === 'tag_asc') {
            const tagA = a.tags[0] || ''
            const tagB = b.tags[0] || ''
            if (tagA !== tagB) return tagA.localeCompare(tagB)
            return b.createdAt - a.createdAt
        }
        
        // По тегам (Я → А)
        if (option === 'tag_desc') {
            const tagA = a.tags[0] || ''
            const tagB = b.tags[0] || ''
            if (tagA !== tagB) return tagB.localeCompare(tagA)
            return b.createdAt - a.createdAt
        }
        
        return 0
    })
}