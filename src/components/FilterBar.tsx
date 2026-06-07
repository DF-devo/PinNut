import React, { useMemo } from 'react'
import { useNoteStore } from '../store/useNoteStore'
import '../styles/FilterBar.css'

interface FilterBarProps {
  activeTag: string | null
  onTagToggle: (tag: string) => void
}

const FilterBar: React.FC<FilterBarProps> = ({ activeTag, onTagToggle }) => {
  const notes = useNoteStore((state) => state.notes)

  const uniqueTags = useMemo(() => {
    const tagSet = new Set<string>()
    notes.forEach((note) => note.tags.forEach((tag) => tagSet.add(tag)))
    return Array.from(tagSet).sort((a, b) => a.localeCompare(b))
  }, [notes])

  if (uniqueTags.length === 0) {
    return (
        <div className="filter-bar">
                <span className="filter-bar__empty">
                    Теги появятся здесь, когда вы добавите заметку с тегами
                </span>
        </div>
    )
  }

  return (
      <div className="filter-bar">
        <span className="filter-bar__label">Фильтр:</span>
        {uniqueTags.map((tag) => (
            <button
                key={tag}
                type="button"
                className={`filter-bar__tag${activeTag === tag ? ' filter-bar__tag--active' : ''}`}
                onClick={() => onTagToggle(tag)}
            >
              #{tag}
            </button>
        ))}
        {activeTag && (
            <button
                type="button"
                className="filter-bar__reset"
                onClick={() => onTagToggle(activeTag)}
            >
              ✕ Сбросить
            </button>
        )}
      </div>
  )
}

export default FilterBar