// Карточка заметки
// отображение данных
// чеклист с анимацией и перетаскиванием
// прогресс-бар дедлайна, индикатор срочности, кнопки действий

import { useMemo, useEffect, useState, useRef, useLayoutEffect } from 'react'
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
    const reorderNoteItems = useNoteStore(state => state.reorderNoteItems)
    const [now, setNow] = useState(Date.now)
    const hasDeadline = !!note.deadline

    const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map())
    const prevRectsRef = useRef<Map<string, DOMRect>>(new Map())
    const dragIndex = useRef<number | null>(null)
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

    // Таймер обновления времени — только если есть дедлайн
    useEffect(() => {
        if (!hasDeadline) return
        const timer = setInterval(() => setNow(Date.now()), 1000)
        return () => clearInterval(timer)
    }, [hasDeadline])

    useLayoutEffect(() => {
        if (prevRectsRef.current.size === 0) return
        itemRefs.current.forEach((el, id) => {
            const prev = prevRectsRef.current.get(id)
            if (!prev) return
            const current = el.getBoundingClientRect()
            const deltaY = prev.top - current.top
            if (Math.abs(deltaY) > 1) {
                el.style.transform = `translateY(${deltaY}px)`
                el.style.transition = 'none'
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        el.style.transform = ''
                        el.style.transition = 'transform 0.35s cubic-bezier(0.2, 0, 0, 1)'
                    })
                })
            }
        })
        prevRectsRef.current.clear()
    }, [note.items])

    const snapshotPositions = () => {
        itemRefs.current.forEach((el, id) => {
            prevRectsRef.current.set(id, el.getBoundingClientRect())
        })
    }

    const handleItemClick = (itemId: string) => {
        snapshotPositions()
        toggleItem(note.id, itemId)
    }

    const handleDragStart = (index: number) => {
        dragIndex.current = index
    }

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault()
        setDragOverIndex(index)
    }

    const handleDrop = (index: number) => {
        if (dragIndex.current === null || dragIndex.current === index) {
            setDragOverIndex(null)
            return
        }
        snapshotPositions()
        reorderNoteItems(note.id, dragIndex.current, index)
        dragIndex.current = null
        setDragOverIndex(null)
    }

    const handleDragEnd = () => {
        dragIndex.current = null
        setDragOverIndex(null)
    }

    // Флаг срочности — дедлайн менее чем через 24 часа
    const isUrgent = useMemo(() =>
            hasDeadline && new Date(note.deadline).getTime() - now < 24 * 60 * 60 * 1000,
        [hasDeadline, note.deadline, now]
    )

    const indicatorColor = useMemo(() => hasDeadline ? getTimeIndicator(note.deadline, now) : undefined, [hasDeadline, note.deadline, now])
    const progressColor = useMemo(() => hasDeadline ? getProgressColor(note.createdAt, note.deadline, now) : undefined, [hasDeadline, note.createdAt, note.deadline, now])
    const deadlineText = useMemo(() => hasDeadline ? formatDeadline(note.deadline, now) : undefined, [hasDeadline, note.deadline, now])

    // Процент заполнения прогресс-бара (0–100)
    const progressPercent = useMemo(() => {
        if (!hasDeadline) return 0
        const total = new Date(note.deadline).getTime() - note.createdAt
        const elapsed = now - note.createdAt
        return Math.min(Math.max(elapsed / total * 100, 0), 100)
    }, [hasDeadline, note.deadline, note.createdAt, now])

    const priorityLabels = { low: 'Низкий', medium: 'Средний', high: 'Высокий' }

    return (
        <div className="note-card" style={{ background: note.color }}>
            {hasDeadline && (
                <div className="note-card__indicator" style={{ background: indicatorColor }}

            {note.type === 'list' ? (
                <ul className="note-card__checklist">
                    {(note.items ?? []).map((item, index) => (
                        <li
                            key={item.id}
                            ref={el => {
                                if (el) itemRefs.current.set(item.id, el)
                                else itemRefs.current.delete(item.id)
                            }}
                            className={[
                                'note-card__checklist-item',
                                item.done ? 'note-card__checklist-item--done' : '',
                                dragOverIndex === index ? 'note-card__checklist-item--drag-over' : '',
                            ].filter(Boolean).join(' ')}
                            draggable
                            onClick={() => handleItemClick(item.id)}
                            onDragStart={() => handleDragStart(index)}
                            onDragOver={e => handleDragOver(e, index)}
                            onDrop={() => handleDrop(index)}
                            onDragEnd={handleDragEnd}
                        >
                            <span className="note-card__drag-handle">⠿</span>
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
                    <div className="note-card__progress-track">
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