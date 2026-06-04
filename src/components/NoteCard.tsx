// Компонент одной карточки
import { useMemo, useEffect, useState } from 'react'
import type { Note } from '../types'
import { useNoteStore } from '../store/useNoteStore'
import { getTimeIndicator } from '../utils/getTimeIndicator'
import { getProgressColor } from '../utils/getProgressColor'
import { formatDeadline } from '../utils/formatDeadline'
import '../styles/NoteCard.css'

interface Props {
    note: Note
    onTogglePin: (id: string) => void
    onDelete: (id: string) => void
    onEdit: (note: Note) => void
}

function NoteCard({ note, onTogglePin, onDelete, onEdit }: Props) {
    const toggleItem = useNoteStore(state => state.toggleItem)
    const [now, setNow] = useState(Date.now)
    const hasDeadline = !!note.deadline

    useEffect(() => {
        if (!hasDeadline) return
        const timer = setInterval(() => setNow(Date.now()), 1000)
        return () => clearInterval(timer)
    }, [hasDeadline])

    const isUrgent = useMemo(() =>
            hasDeadline && new Date(note.deadline).getTime() - now < 24 * 60 * 60 * 1000,
        [hasDeadline, note.deadline, now]
    )

    const indicatorColor = useMemo(() => getTimeIndicator(note.deadline, now), [note.deadline, now])
    const progressColor = useMemo(() => getProgressColor(note.createdAt, note.deadline, now), [note.createdAt, note.deadline, now])
    const deadlineText = useMemo(() => formatDeadline(note.deadline, now), [note.deadline, now])

    const progressPercent = useMemo(() => {
        const total = new Date(note.deadline).getTime() - note.createdAt
        const elapsed = now - note.createdAt
        return Math.min(Math.max(elapsed / total * 100, 0), 100)
    }, [note.deadline, note.createdAt, now])

    const priorityLabels = {
        low: 'Низкий',
        medium: 'Средний',
        high: 'Высокий'
    }

    const sortedItems = note.items ?? []

    return (
        <div className="note-card" style={{ background: note.color }}>
            {hasDeadline && (
                <div className="note-card__indicator" style={{ background: indicatorColor }} />
            )}

            {note.type === 'list' ? (
                <ul className="note-card__checklist">
                    {sortedItems.map(item => (
                        <li
                            key={item.id}
                            className={`note-card__checklist-item${item.done ? ' note-card__checklist-item--done' : ''}`}
                            onClick={() => toggleItem(note.id, item.id)}
                        >
                            <span className="note-card__checkbox">{item.done ? '☑' : '☐'}</span>
                            <span className="note-card__checklist-text">{item.text}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="note-card__text" style={{ color: isUrgent ? 'var(--indicator-red)' : 'var(--text-primary)' }}>
                    {note.text}
                </p>
            )}

            <div className="note-card__tags">
                {note.tags.map(tag => (
                    <span className="tag" key={tag}>{tag}</span>
                ))}
            </div>

            <span className="note-card__priority">{priorityLabels[note.priority]}</span>

            {hasDeadline && (
                <>
                    <span className="note-card__deadline">{deadlineText}</span>
                    <div style={{ background: 'rgba(0,0,0,0.15)', borderRadius: '2px', height: '4px' }}>
                        <div
                            className="note-card__progress"
                            style={{ width: `${progressPercent}%`, background: progressColor }}
                        />
                    </div>
                </>
            )}

            <div className="note-card__actions">
                <button className="note-card__btn" onClick={() => onTogglePin(note.id)}>
                    {note.pinned ? '📌' : '📍'}
                </button>
                <button className="note-card__btn" onClick={() => onEdit(note)}>✏️</button>
                <button className="note-card__btn" onClick={() => onDelete(note.id)}>🗑</button>
            </div>
        </div>
    )
}

export default NoteCard