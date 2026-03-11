## Текущие задачи Memory Bank

- [x] Инициализация структуры `memory-bank/` для проекта `learn-react`.
- [x] Индексация секции `<microprojects-list>` файла `readme.md`.
- [x] Настройка локального `memory-bank` и документации для микропроекта `react-lazy`.

---

## Новая задача: Docker-запуск для `react-lazy`

- Task ID: `task-react-lazy-docker`
- Описание: Настроить dev/prod Docker-запуск для микропроекта `react-lazy` (`lazy-load-components/react-lazy`), включая рабочий dev-сервер на Node внутри контейнера и раздачу собранного `dist` через `nginx` в prod.
- Статус: completed
- Complexity Level: 2 (простое улучшение инфраструктуры без сложных архитектурных решений)

### План реализации (PLAN, Level 2)

1. Проверить актуальное состояние `docker-compose.yml` в `react-lazy` и наличие `dist`.
2. Настроить dev-сервис:
   - подходящий образ Node (совместимый с Vite);
   - корректный `working_dir` и volume проекта;
   - установка зависимостей внутри контейнера;
   - запуск `npm run dev` с пробросом на хост.
3. Настроить prod-сервис:
   - использовать `nginx` как статический сервер;
   - замонтировать `dist` в корень статики `nginx`;
   - обеспечить доступ по `http://localhost:5080`.
4. Добавить удобные npm-скрипты (`docker:dev`, `docker:prod`, логи).
5. Обновить документацию `readme.md` микропроекта.

### Статус планирования

- Plan Status: completed
- Примечание: детальный план зафиксирован на уровне файлов и шагов; можно переходить к фазе `/build` с опорой на этот список.

### Рефлексия

- Reflection: completed
- Документ: `memory-bank/reflection/reflection-task-react-lazy-docker.md`
