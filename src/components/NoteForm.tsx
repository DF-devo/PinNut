import React, { useState } from 'react';
import type { Priority, Note } from '../types';
import { useNoteStore } from '../store/useNoteStore';
import { createItem } from '../utils/checklistUtils';

interface NoteFormProps {
  onAdd: (noteData: Omit<Note, 'id' | 'createdAt' | 'pinned'>) => void;
  initialData?: Note;
}

const NoteForm: React.FC<NoteFormProps> = ({ onAdd, initialData }) => {
  const notes = useNoteStore((state) => state.notes);

  const [type, setType] = useState<'text' | 'list'>(initialData?.type ?? 'text');
  const [text, setText] = useState(initialData?.text ?? '');
  const [items, setItems] = useState(initialData?.items ?? []);
  const [itemInput, setItemInput] = useState('');
  const [tagsInput, setTagsInput] = useState(initialData?.tags.join(', ') ?? '');
  const [priority, setPriority] = useState<Priority>(initialData?.priority ?? 'medium');
  const [deadline, setDeadline] = useState(initialData?.deadline ?? '');
  const [color, setColor] = useState(initialData?.color ?? '#7F49B4');
  const [error, setError] = useState('');

  const handleAddItem = () => {
    const trimmed = itemInput.trim();
    if (!trimmed) return;
    setItems(prev => [...prev, createItem(trimmed)]);
    setItemInput('');
  };

  const handleRemoveItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const handleCopy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const note = notes.find(n => n.id === e.target.value);
    if (!note) return;
    setType(note.type);
    setText(note.text);
    setItems(note.items ?? []);
    setTagsInput(note.tags.join(', '));
    setPriority(note.priority);
    setDeadline(note.deadline);
    setColor(note.color);
    e.target.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (type === 'text' && !text.trim()) {
      setError('Текст заметки не может быть пустым');
      return;
    }
    if (type === 'list' && items.length === 0) {
      setError('Добавьте хотя бы один пункт');
      return;
    }

    const tags = tagsInput
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);

    onAdd({
      type,
      text: type === 'text' ? text.trim() : '',
      items: type === 'list' ? items : [],
      tags,
      color,
      priority,
      deadline,
    });

    setText('');
    setItems([]);
    setItemInput('');
    setTagsInput('');
    setPriority('medium');
    setDeadline('');
    setColor('#7F49B4');
    setType('text');
  };

  return (
      <form onSubmit={handleSubmit} className="note-form">

        {!initialData && notes.length > 0 && (
            <select className="note-form__input" defaultValue="" onChange={handleCopy}>
              <option value="" disabled>— скопировать из существующей —</option>
              {notes.map(n => (
                  <option key={n.id} value={n.id}>
                    {n.type === 'list'
                        ? `[список] ${n.items[0]?.text ?? ''}`
                        : n.text.slice(0, 40) + (n.text.length > 40 ? '...' : '')}
                  </option>
              ))}
            </select>
        )}

        <div className="note-form__type-toggle">
          <button
              type="button"
              className={`note-form__type-btn${type === 'text' ? ' note-form__type-btn--active' : ''}`}
              onClick={() => setType('text')}
          >
            Текст
          </button>
          <button
              type="button"
              className={`note-form__type-btn${type === 'list' ? ' note-form__type-btn--active' : ''}`}
              onClick={() => setType('list')}
          >
            Список
          </button>
        </div>

        {type === 'text' ? (
            <label className="note-form__label">
              Текст заметки*
              <textarea
                  className="note-form__textarea"
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder="Введите текст заметки..."
                  rows={2}
              />
            </label>
        ) : (
            <div>
              <span className="note-form__label">Пункты списка*</span>
              <div className="note-form__add-item">
                <input
                    className="note-form__input"
                    type="text"
                    value={itemInput}
                    onChange={e => setItemInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddItem(); }}}
                    placeholder="Новый пункт..."
                />
                <button type="button" className="note-form__add-btn" onClick={handleAddItem}>
                  + Добавить
                </button>
              </div>
              <ul className="note-form__items">
                {items.map(item => (
                    <li key={item.id} className="note-form__item">
                      <span className="note-form__item-text">{item.text}</span>
                      <button
                          type="button"
                          className="note-form__item-remove"
                          onClick={() => handleRemoveItem(item.id)}
                      >
                        ✕
                      </button>
                    </li>
                ))}
              </ul>
            </div>
        )}

        <label className="note-form__label">
          Теги (через запятую)
          <input
              className="note-form__input"
              type="text"
              value={tagsInput}
              onChange={e => setTagsInput(e.target.value)}
              placeholder="работа, идеи, важно"
          />
        </label>

        <div className="note-form__fields-row">
          <label className={`note-form__label note-form__field`}>
            Приоритет
            <select className="note-form__input" value={priority} onChange={e => setPriority(e.target.value as Priority)}>
              <option value="low">Низкий</option>
              <option value="medium">Средний</option>
              <option value="high">Высокий</option>
            </select>
          </label>

          <label className={`note-form__label note-form__field`}>
            Дедлайн
            <input
                className="note-form__input"
                type="datetime-local"
                value={deadline}
                onChange={e => setDeadline(e.target.value)}
            />
          </label>

          <label className="note-form__label" style={{width: 'auto'}}>
            Цвет
            <input
                className="note-form__input note-form__color"
                type="color"
                value={color}
                onChange={e => setColor(e.target.value)}
            />
          </label>
        </div>

        {error && <p className="note-form__error">{error}</p>}

        <button type="submit" className="note-form__submit">
          {initialData ? 'Сохранить' : 'Добавить'}
        </button>

      </form>
  );
};

export default NoteForm;