import React, { useMemo } from 'react';
import { useNoteStore } from '../store/useNoteStore';

interface FilterBarProps {
  activeTag: string | null;
  onTagToggle: (tag: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ activeTag, onTagToggle }) => {
  const notes = useNoteStore((state) => state.notes);

  const uniqueTags = useMemo(() => {
    const tagSet = new Set<string>();
    notes.forEach((note) => note.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
  }, [notes]);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    padding: '12px 16px',
    backgroundColor: 'var(--bg-primary)',
    border: '1px solid var(--ui-border)',
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  };

  const baseTagStyle: React.CSSProperties = {
    padding: '6px 14px',
    borderRadius: 20,
    border: '1px solid var(--ui-border)',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    background: 'transparent',
    color: 'var(--text-primary)',
  };

  const activeTagStyle: React.CSSProperties = {
    ...baseTagStyle,
    backgroundColor: 'var(--text-primary)',
    color: 'var(--bg-primary)',
    borderColor: 'var(--text-primary)',
  };

  const handleClick = (tag: string) => {
    onTagToggle(tag);
  };

  if (uniqueTags.length === 0) {
    return (
      <div style={containerStyle}>
        <span style={{ color: 'var(--text-primary)', fontSize: '0.85rem', opacity: 0.4 }}>
          Теги появятся здесь, когда вы добавите заметку с тегами
        </span>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <span
        style={{
          color: 'var(--text-primary)',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginRight: 8,
          opacity: 0.7,
        }}
      >
        Фильтр:
      </span>
      {uniqueTags.map((tag) => (
        <button
          key={tag}
          type="button"
          style={activeTag === tag ? activeTagStyle : baseTagStyle}
          onClick={() => handleClick(tag)}
        >
          #{tag}
        </button>
      ))}
      {activeTag && (
        <button
          type="button"
          style={{
            ...baseTagStyle,
            opacity: 0.6,
            fontSize: '0.8rem',
          }}
          onClick={() => handleClick(activeTag)}
        >
          ✕ Сбросить
        </button>
      )}
    </div>
  );
};

export default FilterBar;
