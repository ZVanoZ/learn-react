## Прогресс по Memory Bank

- [x] Создана базовая структура `memory-bank/` для проекта `learn-react`.
- [x] Инициализированы файлы `projectbrief.md`, `tasks.md`, `activeContext.md`.
- [x] Добавлены подробные записи по микропроекту `react-lazy` (локальный `memory-bank`, перенос документации, workflow микропроектов).
- [ ] Добавлены подробные записи по остальным микропроектам (будет расширяться по мере работы).

---

### task-react-lazy-docker

- Статус: completed
- Кратко: настройка dev/prod Docker-запуска для микропроекта `react-lazy` (`lazy-load-components/react-lazy`).
- Состояние:
  - dev: `react-lazy-dev` (node:22-alpine), Vite на http://localhost:6080.
  - prod: `react-lazy-prod` (nginx), `./dist` → `/usr/share/nginx/html`, http://localhost:5080.
  - npm-скрипты и readme обновлены. Рефлексия: `memory-bank/reflection/reflection-task-react-lazy-docker.md`.

