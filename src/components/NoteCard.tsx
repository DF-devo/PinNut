import { useMemo } from 'react'
import type { Note } from '../types'

interface Props {
    note: Note
    onTogglePin: (id: string) => void
    onDelete: (id: string) => void
}

function NoteCard({ note, onTogglePin, onDelete }: Props) {
    const isUrgent = useMemo(() =>
            new Date(note.deadline).getTime() - Date.now() < 24 * 60 * 60 * 1000,
        [note.deadline]
    )

    return (
        <div style={{
            background: note.color,
            padding: '16px',
            borderRadius: '12px',
            width: '280px'
        }}>
            <p style={{ color: isUrgent ? '#e53e3e' : 'var(--text-primary)' }}>
                {note.text}
            </p>

            <div>
                {note.tags.map(tag => (
                    <span className="tag" key={tag}>{tag}</span>
                ))}
            </div>

            <span>{note.priority}</span>

            <div>
                <button onClick={() => onTogglePin(note.id)}>
                    {note.pinned ? '📌' : '📍'}
                </button>
                <button onClick={() => onDelete(note.id)}>🗑</button>
            </div>
        </div>
    )
}

export default NoteCard