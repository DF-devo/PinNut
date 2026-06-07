import { useEffect } from 'react';  // НОВЫЙ ИМПОРТ
import { NoteForm } from './components/NoteForm';
import { FilterBar } from './components/FilterBar';
import { NoteList } from './components/NoteList';
import { useNoteStore } from './store/noteStore';  // ИСПРАВЛЕН ИМПОРТ
import './App.css';

function App() {
  const { addNote, theme, toggleTheme } = useNoteStore();  // ДОБАВЛЕНЫ theme, toggleTheme
  
  // НОВЫЙ ЭФФЕКТ - применяем тему к body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`app-container ${theme}`}>  {/* ДОБАВЛЕН КЛАСС theme */}
      <header className="app-header">
        <div style={{   // НОВЫЙ БЛОК С КНОПКОЙ
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center'
        }}>
          <h1 className="app-title">
            🥜 PinNut
          </h1>
          <button 
            onClick={toggleTheme} 
            className="theme-toggle"
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: '1px solid var(--ui-border)',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            {theme === 'light' ? '🌙 Тёмная тема' : '☀️ Светлая тема'}
          </button>
        </div>
      </header>

      <main className="app-main">
        <section className="form-section">
          <h2 className="section-title">Создать новую заметку</h2>
          <NoteForm onSubmit={addNote} />
        </section>

        <section className="filters-section">
          <h2 className="section-title">Фильтры и сортировка</h2>
          <FilterBar />
        </section>

        <section className="notes-section">
          <h2 className="section-title">Все заметки</h2>
          <NoteList />
        </section>
      </main>
    </div>
  );
}

export default App;