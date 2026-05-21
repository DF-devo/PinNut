// Корневой компонент: сборка NoteForm, FilterBar, NoteList, управление стейтом
import { useState } from 'react'
import { useNoteStore } from './store/useNoteStore'
import NoteForm from './components/NoteForm'
import FilterBar from './components/FilterBar'
import { NoteList } from './components/NoteList'
import type { SortOption } from './types'
import './App.css'

function App() {
    const { notes, addNote, togglePin, deleteNote } = useNoteStore()
    const [sortOption, setSortOption] = useState<SortOption>('date')
    const [activeTag, setActiveTag] = useState<string | null>(null)
    const [showForm, setShowForm] = useState(false)

    const filteredNotes = activeTag
        ? notes.filter(n => n.tags.includes(activeTag))
        : notes

    return (
        <div className="app-container">
            <header className="app-header">
                <h1 className="app-title">🥜 PinNut</h1>
                <div className="app-header__controls">
                    <select
                        value={sortOption}
                        onChange={e => setSortOption(e.target.value as SortOption)}
                    >
                        <option value="date">По дате</option>
                        <option value="priority">По приоритету</option>
                    </select>
                    <button onClick={() => setShowForm(f => !f)}>
                        {showForm ? '✕ Закрыть' : '+ Заметка'}
                    </button>
                </div>
            </header>

            <main className="app-main">
                <section className="form-section">
                    {showForm && (
                        <NoteForm onAdd={(data: Parameters<typeof addNote>[0]) => { addNote(data); setShowForm(false) }} />
                    )}
                </section>

                <section className="filters-section">
                    <FilterBar activeTag={activeTag} onTagToggle={tag => setActiveTag(t => t === tag ? null : tag)} />
                </section>

                <section className="notes-section">
                    <NoteList
                        notes={filteredNotes}
                        sortOption={sortOption}
                        onTogglePin={togglePin}
                        onDelete={deleteNote}
                    />
                </section>
            </main>
        </div>
    )
}

export default App