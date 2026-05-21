// Сетка заметок: сортировка, закреплённые по дедлайну, рендер через NoteCard
import type { Note, SortOption } from '../types'
import { sortNotes } from '../utils/sortNotes'
import NoteCard from './NoteCard'

interface Props {
    notes: Note[]
    sortOption: SortOption
    onTogglePin: (id: string) => void
    onDelete: (id: string) => void
}

export const NoteList = ({ notes, sortOption, onTogglePin, onDelete }: Props) => {
    const pinned = notes.filter(n => n.pinned)
    const unpinned = notes.filter(n => !n.pinned)

    const sorted = [
        ...pinned.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()),
        ...sortNotes(unpinned, sortOption),
    ]

    if (sorted.length === 0) {
        return (
            <div className="empty-state">
                <p>Нет заметок. Создайте первую!</p>
            </div>
        )
    }

    return (
        <div className="notes-grid">
            {sorted.map(note => (
                <NoteCard
                    key={note.id}
                    note={note}
                    onTogglePin={onTogglePin}
                    onDelete={onDelete}
                />
            ))}
        </div>
    )
}

export default NoteList