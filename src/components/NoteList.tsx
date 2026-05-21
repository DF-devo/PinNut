import { useNotesStore } from '../store/useNotesStore';

export const NoteList = () => {
    const { notes, filters } = useNotesStore();

    // Применяем фильтр по тегам и сортировку
    const filteredAndSortedNotes = notes
        .filter(note => {
            if (filters.selectedTags.length === 0) return true;
            return filters.selectedTags.every(tag => note.tags.includes(tag));
        })
        .sort((a, b) => {
            switch (filters.sortBy) {
                case 'date-asc':
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                case 'date-desc':
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                case 'title-asc':
                    return a.title.localeCompare(b.title);
                case 'title-desc':
                    return b.title.localeCompare(a.title);
                default:
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
        });

    if (filteredAndSortedNotes.length === 0) {
        return (
            <div className="empty-state">
                <p>Нет заметок. Создайте первую!</p>
            </div>
        );
    }

    return (
        <div className="notes-grid">
            {filteredAndSortedNotes.map(note => (
                <div key={note.id} className="note-card">
                    <div className="note-header">
                        <h3 className="note-title">{note.title}</h3>
                        <button
                            className="delete-button"
                            onClick={() => useNotesStore.getState().deleteNote(note.id)}
                            aria-label="Удалить заметку"
                        >
                            ×
                        </button>
                    </div>
                    <p className="note-content">{note.content}</p>
                    <div className="note-tags">
                        {note.tags.map(tag => (
                            <button
                                key={tag}
                                className="tag"
                                onClick={() => useNotesStore.getState().toggleTagFilter(tag)}
                            >
                                #{tag}
                            </button>
                        ))}
                    </div>
                    <div className="note-date">
                        {new Date(note.createdAt).toLocaleDateString('ru-RU')}
                    </div>
                </div>
            ))}
        </div>
    );
};