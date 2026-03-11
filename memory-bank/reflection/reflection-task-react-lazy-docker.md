# Reflection: task-react-lazy-docker

**Task ID:** task-react-lazy-docker  
**Описание:** Настроить dev/prod Docker-запуск для микропроекта `react-lazy`.  
**Complexity Level:** 2  
**Дата рефлексии:** 2025-03-11

---

## Summary

Реализована полная настройка Docker для микропроекта `lazy-load-components/react-lazy`: dev-сервис на Node (Vite) и prod-сервис на nginx для раздачи собранного `dist`. Добавлены npm-скрипты и обновлена документация в `readme.md`.

---

## What Went Well

- **Dev-сервис:** образ `node:22-alpine`, монтирование всего проекта в `/app`, отдельный named volume для `node_modules` (установка внутри контейнера под musl) — устранило несовместимость бинарников rollup. Команда `npm install && npm run dev -- --host 0.0.0.0 --port 80` обеспечивает стабильный запуск Vite на порту 6080.
- **Prod-сервис:** монтирование `./dist` в `/usr/share/nginx/html:ro` (корень статики nginx:alpine) — приложение отображается на `http://localhost:5080` вместо дефолтной страницы nginx.
- **Скрипты в package.json:** `docker:dev`, `docker:dev:logs`, `docker:prod`, `docker:prod:logs` — единообразный запуск из корня микропроекта.
- **Документация:** в `readme.md` описаны команды запуска, порты и необходимость `npm run build` перед prod.

---

## Challenges

- **Изначальный dev:** команда `npx tsx --inspect src/main.tsx` и volume только `./src:/app/src` — модуль не находился (путь/рабочая директория). Переход на полный volume проекта и запуск Vite исправил ситуацию.
- **Node + Vite в Alpine:** Node 20.17 в контейнере не удовлетворял требованиям Vite; при использовании host-овых `node_modules` (glibc) в Alpine (musl) падала загрузка `@rollup/rollup-linux-x64-musl`. Решение: образ Node 22 + установка зависимостей внутри контейнера (отдельный volume для `node_modules`).
- **Prod показывал "Welcome to nginx!":** volume был указан как `./dist:/var/www/html`, тогда как в образе `nginx:alpine` статика отдаётся из `/usr/share/nginx/html`. Замена пути на `/usr/share/nginx/html` устранила проблему.

---

## Lessons Learned

- Для фронтовых контейнеров на Alpine нужно либо собирать `node_modules` внутри контейнера, либо использовать образ на glibc (например Debian/Bookworm).
- В docker-compose для nginx:alpine корень статики — `/usr/share/nginx/html`; при монтировании своего билда использовать именно его.
- Явное указание `working_dir` и полного монтирования проекта упрощает отладку и совместимость с инструментами (Vite, npm).

---

## Process Improvements

- При новой задаче типа «настроить Docker» сразу проверять: (1) какой root у статики в выбранном образе веб-сервера, (2) совместимость версии Node в образе с требованиями Vite/других инструментов.
- После изменения docker-compose выполнять быструю проверку: `docker compose config` и пробный `up` для каждого профиля (dev/prod).

---

## Technical Improvements

- Возможное развитие: multi-stage Dockerfile (stage 1: node — build, stage 2: nginx — копирование `dist`), чтобы prod-образ не зависел от хостовой сборки и монтирования.
- Для SPA при необходимости добавить в nginx конфиг fallback на `index.html` для client-side routing (если ещё не предусмотрено дефолтной конфигурацией).

---

## Next Steps

- Следующая задача по микропроекту `react-lazy`: реализация ленивой загрузки компонентов (например рабочий стол с иконками и подгружаемыми модулями) согласно описанию в `lazy-load-components/index.md`.
- При появлении новых микропроектов — описать в `memory-bank/progress.md` и при необходимости вынести общие паттерны Docker в документацию или шаблоны.
