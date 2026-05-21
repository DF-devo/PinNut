import { useMemo } from 'react'
import type { Note } from '../types'
import { getTimeIndicator } from '../utils/getTimeIndicator'
import { getProgressColor } from '../utils/getProgressColor'
import { formatDeadline } from '../utils/formatDeadline'
import '../styles/NoteCard.css'

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
    const progressColor = getProgressColor(note.createdAt, note.deadline)
    const deadlineText = formatDeadline(note.deadline)

    const priorityLabels = {
        low: 'Низкий',
        medium: 'Средний',
        high: 'Высокий'
    }

    return (
        <div className="note-card" style={{ background: note.color }}>
            <div
                className="note-card__indicator"
                style={{ background: indicatorColor }}
            />

            <p className="note-card__text" style={{ color: isUrgent ? 'var(--indicator-red)' : 'var(--text-primary)' }}>
                {note.text}
            </p>

            <div className="note-card__tags">
                {note.tags.map(tag => (
                    <span className="tag" key={tag}>{tag}</span>
                ))}
            </div>

            <span className="note-card__priority">{priorityLabels[note.priority]}</span>

            <span className="note-card__deadline">{deadlineText}</span>

            <div
                className="note-card__progress"
                style={{ background: progressColor }}
            />

            <div className="note-card__actions">
                <button className="note-card__btn" onClick={() => onTogglePin(note.id)}>
                    {note.pinned ? '📌' : '📍'}
                </button>
                <button className="note-card__btn" onClick={() => onDelete(note.id)}>🗑</button>
            </div>
        </div>
    )
}

export default NoteCard