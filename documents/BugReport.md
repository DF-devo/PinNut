| ID        | Заголовок                                                               | Severity    | Файл(ы)                                         | Как воспроизвести                 | Ожидаемый результат     | Фактический результат                                      | ✅ Как исправить                                 | Статус  |

| --------- | ----------------------------------------------------------------------- | ----------- | ----------------------------------------------- | --------------------------------- | ----------------------- | ---------------------------------------------------------- | ----------------------------------------------- | ------- |

| `BUG-001` | Белый экран при запуске                                                 | 🔴 Critical | `App.tsx`, `FilterBar.tsx`, `NoteForm.tsx`      | `npm run dev` → открыть localhost | Рендер интерфейса       | Пустой экран, ошибка `does not provide an export named...` | Заменить `export default` на `export const`     | ✅ Fixed |

| `BUG-002` | Unused imports (TS6133)                                                 | 🟡 Major    | `App.tsx`                                       | Запуск `npm run dev`              | Сборка без ошибок TS    | `useState` declared but never read                         | Удалить неиспользуемые импорты                  | ✅ Fixed |

| `BUG-003` | Ошибка импорта стора                                                    | 🔴 Critical | `App.tsx`                                       | Открыть приложение                | Корректный импорт стора | Failed to resolve import `useNotesStore`                   | Исправить имя стора                             | ✅ Fixed |

| `BUG-004` | Артефакты генерации AI                                                  | 🔴 Critical | `NoteForm.tsx`, `NoteList.tsx`, `FilterBar.tsx` | Открыть проект                    | Валидный TSX            | Ошибки синтаксиса                                          | Исправить `() =>`, `\&\&` и пробелы               | ✅ Fixed |

| `BUG-005` | Рассинхрон пропсов формы                                                | 🟡 Major    | `App.tsx`, `NoteForm.tsx`                       | Отправка формы                    | Заметка сохраняется     | `onSubmit is not a function`                               | Исправить пропсы                                | ✅ Fixed |

| `BUG-006` | `getTimeIndicator` без `now`                                            | 🟡 Major    | `NoteList.tsx`                                  | Открыть список                    | Корректный цвет         | NaN/undefined                                              | Передавать `Date.now()`                         | ✅ Fixed |

| `BUG-007` | `FilterBar` не получает состояние                                       | 🟠 Major    | `App.tsx`, `FilterBar.tsx`                      | Клик по тегу                      | Фильтрация работает     | Не работает фильтр                                         | Поднять state в App                             | ✅ Fixed |

| `BUG-008` | Пути `/PinNut/` в `index.html`                                          | 🔴 Critical | `index.html`, `vite.config.ts`                  | Запуск проекта                    | Загрузка скриптов       | 404 на Vite client                                         | Убрать ручные пути                              | ✅ Fixed |

| `BUG-009` | Дубликат `<!doctype>`                                                   | 🔴 Critical | `index.html`                                    | Открыть файл                      | Валидный HTML           | Парсер падает                                              | Очистить HTML                                   | ✅ Fixed |

| `BUG-010` | Отсутствие CSS-переменных                                               | 🟠 Minor    | `index.css`                                     | Рендер                            | Цвета работают          | Нет индикаторов                                            | Добавить `:root`                                | ✅ Fixed |

| `BUG-011` | Краш `toggleItem` на старых заметках                                    | 🔴 Critical | `useNoteStore.ts`                               | Клик по чеклисту                  | Переключение работает   | Crash `map undefined`                                      | `(n.items ?? \[])`                               | ✅ Fixed |

| `BUG-012` | Фильтр не сбрасывался после удаления                                    | 🟡 Major    | `App.tsx`                                       | Удалить последнюю заметку с тегом | Фильтр сбрасывается     | "Нет заметок", фильтр активен                              | Проверка оставшихся заметок                     | ✅ Fixed |

| `BUG-013` | NaN в сортировке по приоритету                                          | 🟡 Major    | `sortNotes.ts`                                  | Сортировка                        | Стабильный порядок      | NaN / random order                                         | fallback `?? 3`                                 | ✅ Fixed |

| `BUG-014` | NaN в memo без дедлайна                                                 | 🟢 Minor    | `NoteCard.tsx`                                  | Нет дедлайна                      | Корректный рендер       | NaN цвета                                                  | Условная проверка                               | ✅ Fixed |

| `BUG-015` | GIF не загружается                                                      | 🟡 Major    | `OfflineOverlay.tsx`                            | Offline режим                     | GIF отображается        | Broken image                                               | Исправить имя файла                             | ✅ Fixed |

| `BUG-016` | Пункты списка перемешиваются                                            | 🟡 Major    | `NoteCard.tsx`                                  | Клик чекбокса                     | Стабильный порядок      | Перемешивание                                              | Убрать sort из render                           | ✅ Fixed |

| `BUG-017` | Краш при копировании списка                                             | 🔴 Critical | `NoteForm.tsx`                                  | Copy note                         | Заполнение работает     | items undefined                                            | `?? \[]`                                         | ✅ Fixed |

| `BUG-018` | NaN в прогрессе (deadline == createdAt)                                 | 🟢 Minor    | `getProgressColor.ts`                           | deadline == now                   | корректный цвет         | NaN                                                        | `total <= 0` check                              | 🔴 Open |

| `BUG-019` | Неверный прогресс при прошлом дедлайне                                  | 🟢 Minor    | `getProgressColor.ts`                           | deadline < createdAt              | красный                 | зелёный                                                    | тот же guard                                    | 🔴 Open |

| `BUG-020` | "Через 0 сек"                                                           | 🟢 Minor    | `formatDeadline.ts`                             | <1 сек                            | "Истекает..."           | 0 сек                                                      | if `<1` return text                             | ✅ Fixed |

| `BUG-021` | Двойной вызов `onClose`                                                 | 🟢 Minor    | `Modal.tsx`                                     | Быстрый клик                      | один close              | двойной вызов                                              | guard `isClosing`                               | ✅ Fixed |

| `BUG-022` | Фильтр не сбрасывался после удаления последней заметки с активным тегом | 🟡 Major    | `App.tsx`                                       | удалить последнюю заметку с тегом | фильтр сбрасывается     | "Нет заметок", фильтр активен                              | проверка оставшихся заметок и сброс `activeTag` | ✅ Fixed |

| `BUG-023` | Текст не переносился в список                                           | 🟡 Major    | `NoteForm.tsx`                                  | сменить тип заметки               | текст переносится       | текст исчезает                                             | `setItemInput + setText('')`                    | ✅ Fixed |

| `BUG-024` | `getProgressColor` NaN при total=0                                      | 🟡 Major    | `getProgressColor.ts`                           | дедлайн == now                    | fallback цвет           | NaN                                                        | `if (total <= 0)`                               | ✅ Fixed |

| `BUG-025` | Неверный цвет прогресса при изменении дедлайна                          | 🟡 Major    | `getProgressColor.ts`                           | изменить дедлайн назад            | красный                 | зелёный                                                    | тот же guard                                    | ✅ Fixed |

| `BUG-026` | `getTimeIndicator` зелёный при невалидной строке                        | 🟡 Major    | `getTimeIndicator.ts`                           | localStorage = "abc"              | серый цвет              | зелёный                                                    | `isNaN(timeLeft)` check                         | ✅ Fixed |



