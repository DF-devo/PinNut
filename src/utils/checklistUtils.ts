// для работы с пунктами списка


import type { ChecklistItem } from '../types'

//создает новый пункт
export function createItem(text: string): ChecklistItem {
    return {
        id: crypto.randomUUID(),
        text,
        done: false,
    }
}

// сортирует, невыполненные сверху, выполненные снизу.
export function sortItems(items: ChecklistItem[]): ChecklistItem[] {
    return [...items].sort((a, b) => Number(a.done) - Number(b.done))
}