// Корневой компонент: сборка NoteForm, FilterBar, NoteList, управление стейтом
import { useState, useEffect } from 'react'
import { useNoteStore } from './store/useNoteStore'
import NoteForm from './components/NoteForm'
import FilterBar from './components/FilterBar'
import { NoteList } from './components/NoteList'
import Modal from './components/Modal'
import OfflineOverlay from './components/OfflineOverlay'
import type { Note, SortOption } from './types'
import './App.css'
import { Settings } from 'lucide-react'

function App() {
    const { notes, addNote, updateNote, togglePin, deleteNote } = useNoteStore()
    const [sortOption, setSortOption] = useState<SortOption>('date_desc') // Изменено начальное значение
    const [activeTag, setActiveTag] = useState<string | null>(null)
    const [showForm, setShowForm] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [editingNote, setEditingNote] = useState<Note | null>(null)
    const [isOffline, setIsOffline] = useState(!navigator.onLine)

    useEffect(() => {
        const onOffline = () => setIsOffline(true)
        const onOnline  = () => setIsOffline(false)
        window.addEventListener('offline', onOffline)
        window.addEventListener('online',  onOnline)
        return () => {
            window.removeEventListener('offline', onOffline)
            window.removeEventListener('online',  onOnline)
        }
    }, [])

    const handleDelete = (id: string) => {
        if (activeTag) {
            const stillExists = notes
                .filter(n => n.id !== id)
                .some(n => n.tags.includes(activeTag))
            if (!stillExists) setActiveTag(null)
        }
        deleteNote(id)
    }

    const filteredNotes = activeTag
        ? notes.filter(n => n.tags.includes(activeTag))
        : notes

    return (
        <div className="app-container">
            <header className="app-header">
                <h1 className="app-title">🥜 PinNut</h1>
                <div className="app-header__controls">
                    <select
                        className="app-header__select"
                        value={sortOption}
                        onChange={e => setSortOption(e.target.value as SortOption)}
                    >
                        <optgroup label="По дате">
                            <option value="date_desc">Новые сначала</option>
                            <option value="date_asc">Старые сначала</option>
                        </optgroup>
                        <optgroup label="По приоритету">
                            <option value="priority_desc">Высокий → Низкий</option>
                            <option value="priority_asc">Низкий → Высокий</option>
                        </optgroup>
                    </select>
                    <button className="app-header__btn-settings" onClick={() => setShowSettings(true)}>
                        <Settings size={18} />
                    </button>
                    <button className="app-header__btn-add" onClick={() => setShowForm(true)}>
                        + Заметка
                    </button>
                </div>
            </header>

            <main className="app-main">
                <section className="filters-section">
                    <FilterBar activeTag={activeTag} onTagToggle={tag => setActiveTag(t => t === tag ? null : tag)} />
                </section>

                <section className="notes-section">
                    <NoteList
                        notes={filteredNotes}
                        sortOption={sortOption}
                        onTogglePin={togglePin}
                        onDelete={handleDelete}
                        onEdit={note => setEditingNote(note)}
                    />
                </section>
            </main>

            {showForm && (
                <Modal title="Новая заметка" onClose={() => setShowForm(false)}>
                    <NoteForm onAdd={(data: Parameters<typeof addNote>[0]) => { addNote(data); setShowForm(false) }} />
                </Modal>
            )}

            {editingNote && (
                <Modal title="Редактировать заметку" onClose={() => setEditingNote(null)}>
                    <NoteForm
                        initialData={editingNote}
                        onAdd={(data: Parameters<typeof addNote>[0]) => {
                            updateNote(editingNote.id, data)
                            setEditingNote(null)
                        }}
                    />
                </Modal>
            )}

            {showSettings && (
                <Modal title="Настройки" onClose={() => setShowSettings(false)}>
                    <div className="settings-placeholder">
                        <div className="settings-gears">
                            <span className="gear-1">⚙️</span>
                            <span className="gear-2">⚙️</span>
                        </div>
                        <p>Пока в разработке</p>
                    </div>
                </Modal>
            )}

            {isOffline && <OfflineOverlay />}
        </div>
    )
}

export default App