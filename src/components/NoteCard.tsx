import { useMemo } from 'react'
import type { Note } from '../types'
import { getTimeIndicator } from '../utils/getTimeIndicator'

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

    const indicatorColor = getTimeIndicator(note.deadline)

    return (
        <div style={{
            background: note.color,
            padding: '16px',
            borderRadius: '12px',
            width: '280px',
            position: 'relative'
        }}>
            <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: indicatorColor,
                position: 'absolute',
                top: '12px',
                right: '12px'
            }} />

            <p style={{ color: isUrgent ? 'var(--indicator-red)' : 'var(--text-primary)' }}>
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