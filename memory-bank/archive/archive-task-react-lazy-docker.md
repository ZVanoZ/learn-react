# ARCHIVE: Docker-запуск для микропроекта react-lazy

## METADATA

| Поле | Значение |
|------|----------|
| Task ID | task-react-lazy-docker |
| Название | Настроить dev/prod Docker-запуск для микропроекта react-lazy |
| Complexity Level | 2 |
| Статус | COMPLETE |
| Архивация | 2025-03-11 |

## SUMMARY

Настроены dev- и prod-окружения для микропроекта `lazy-load-components/react-lazy`: dev-сервис на Node 22 (Vite) с пробросом на порт 6080, prod-сервис на nginx с раздачей `dist` на порт 5080. Добавлены npm-скрипты и обновлена документация.

## REQUIREMENTS

- Рабочий dev-запуск приложения внутри Docker (профиль `dev`).
- Рабочий prod-запуск: раздача собранного `dist` через веб-сервер (профиль `prod`).
- Удобные команды запуска (npm-скрипты).
- Актуальная документация по запуску в readme микропроекта.

## IMPLEMENTATION

**Файлы изменены:**

- **`lazy-load-components/react-lazy/docker-compose.yml`**
  - `react-lazy-dev`: образ `node:22-alpine`, `working_dir: /app`, volumes `./:/app` и `react-lazy-node-modules:/app/node_modules`, команда `sh -c "npm install && npm run dev -- --host 0.0.0.0 --port 80"`, порт 6080:80.
  - `react-lazy-prod`: образ `nginx:1.26-alpine`, volume `./dist:/usr/share/nginx/html:ro`, порт 5080:80.
  - Секция `volumes`: named volume `react-lazy-node-modules`.

- **`lazy-load-components/react-lazy/package.json`**
  - Скрипты: `docker:dev`, `docker:dev:logs`, `docker:prod`, `docker:prod:logs`.

- **`lazy-load-components/react-lazy/readme.md`**
  - Описаны запуск через npm и напрямую через docker compose для dev и prod, указаны URL (6080 для dev, 5080 для prod) и шаг `npm run build` перед prod.

## TESTING

- Выполнены: `docker compose config`, `docker compose --profile dev up react-lazy-dev`, `docker compose --profile prod up -d react-lazy-prod`.
- Dev: Vite поднимается, приложение доступно на http://localhost:6080.
- Prod: после `npm run build` статика из `dist` отдаётся на http://localhost:5080 (без дефолтной страницы nginx).

## LESSONS LEARNED

- В nginx:alpine корень статики — `/usr/share/nginx/html`; монтировать билд туда.
- Для Alpine-контейнеров с Vite/rollup устанавливать зависимости внутри контейнера (или использовать образ на glibc); образ Node 22 устраняет несовместимость с Vite.
- Явные `working_dir` и полное монтирование проекта упрощают отладку.

## REFERENCES

- Рефлексия: `memory-bank/reflection/reflection-task-react-lazy-docker.md`
- Микропроект: `lazy-load-components/react-lazy/`
- Описание секции lazy-load: `lazy-load-components/index.md`
