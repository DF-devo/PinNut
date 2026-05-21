import React, { useState } from 'react';
import type { Priority, Note } from '../types';

interface NoteFormProps {
  onAdd: (noteData: Omit<Note, 'id' | 'createdAt' | 'pinned'>) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [deadline, setDeadline] = useState('');
  const [color, setColor] = useState('#7F49B4');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedText = text.trim();
    if (!trimmedText) {
      setError('Текст заметки не может быть пустым');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    onAdd({
      text: trimmedText,
      tags,
      color,
      priority,
      deadline: deadline,
    });

    // Очистка формы
    setText('');
    setTagsInput('');
    setPriority('medium');
    setDeadline('');
    setColor('#7F49B4');
  };

  const formStyle: React.CSSProperties = {
    backgroundColor: 'var(--bg-primary)',
    border: '1px solid var(--ui-border)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: 12,
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid var(--ui-border)',
    borderRadius: 4,
    backgroundColor: '#fff',
    color: '#141414',
    fontSize: '0.9rem',
    boxSizing: 'border-box',
    marginTop: 4,
  };

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    minHeight: 80,
    resize: 'vertical',
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: 'var(--text-primary)',
    color: 'var(--bg-primary)',
    border: 'none',
    padding: '10px 24px',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: 600,
    marginTop: 8,
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <label style={labelStyle}>
        Текст заметки*
        <textarea
          style={textareaStyle}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Введите текст заметки..."
          rows={3}
        />
      </label>

      <label style={labelStyle}>
        Теги (через запятую)
        <input
          style={inputStyle}
          type="text"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="работа, идеи, важно"
        />
      </label>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <label style={{ ...labelStyle, flex: 1, minWidth: 150 }}>
          Приоритет
          <select
            style={inputStyle}
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="low">Низкий</option>
            <option value="medium">Средний</option>
            <option value="high">Высокий</option>
          </select>
        </label>

        <label style={{ ...labelStyle, flex: 1, minWidth: 150 }}>
          Дедлайн
          <input
            style={inputStyle}
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </label>

        <label style={{ ...labelStyle, flex: 1, minWidth: 150 }}>
          Цвет
          <input
            style={{ ...inputStyle, padding: '4px 8px', height: 40 }}
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>
      </div>

      {error && (
        <p style={{ color: '#F44336', fontSize: '0.85rem', margin: '8px 0 0' }}>
          {error}
        </p>
      )}

      <button type="submit" style={buttonStyle}>
        Добавить
      </button>
    </form>
  );
};

export default NoteForm;
