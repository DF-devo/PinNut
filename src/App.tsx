import { NoteForm } from './components/NoteForm';
import { FilterBar } from './components/FilterBar';
import { NoteList } from './components/NoteList';
import { useNoteStore } from './store/useNoteStore';

function App() {
    const { addNote } = useNotesStore();

    return (
        <div className="app-container">
            <header className="app-header">
                <h1 className="app-title">
                    🥜 PinNut
                </h1>
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
