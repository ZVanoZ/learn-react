## Workflow микропроектов и режимы VAN / PLAN / BUILD / ARCHIVE

Этот документ описывает, как работать с отдельными микропроектами в монорепозитории `learn-react` с помощью режимов `/van`, `/plan`, `/build`, `/reflect`, `/archive`.

## 1. Привязка к микропроекту

- Каждый микропроект имеет собственный корень, например:
  - `lazy-load-components/react-lazy`
- У каждого микропроекта должен быть **локальный `memory-bank/`** в его корне:
  - `lazy-load-components/react-lazy/memory-bank/`
- При работе с микропроектом:
  - текущая рабочая директория агентов и команд должна быть установлена в **корень микропроекта**;
  - все режимы (VAN/PLAN/BUILD/REFLECT/ARCHIVE) читают и пишут в **локальный `memory-bank`** микропроекта.

## 2. Типовой цикл работы (VAN → PLAN → BUILD → REFLECT → ARCHIVE)

### 2.1. VAN (инициализация задачи)
- Установить рабочую директорию в корень нужного микропроекта.
- Вызвать `/van` с описанием задачи.
- Ожидаемый результат:
  - в `memory-bank/tasks.md` микропроекта зафиксирована новая задача;
  - в `memory-bank/activeContext.md` указан текущий фокус и выбранный микропроект.

### 2.2. PLAN (планирование)
- Из корня микропроекта вызвать `/plan` с формулировкой задачи.
- План опирается на:
  - локальные файлы `memory-bank/projectbrief.md`, `memory-bank/techContext.md`, `memory-bank/systemPatterns.md`;
  - локальную документацию (например, `memory-bank/docs/dev/README.md` и `architecture.md`).
- План не изменяет код, только уточняет шаги, которые затем будет выполнять `/build`.

### 2.3. BUILD (реализация)
- Выполняется из корня микропроекта.
- Вносит изменения в код и документацию **только внутри микропроекта**.
- Обновляет:
  - `memory-bank/progress.md` (статус реализации),
  - при необходимости `tasks.md`, `activeContext.md`.

### 2.4. REFLECT (рефлексия)
- Используется для фиксации выводов и уроков по задаче.
- Результаты сохраняются в:
  - `memory-bank/reflection/reflection-[task_id].md`,
  - краткое резюме может попадать в `memory-bank/systemPatterns.md` и `techContext.md`.

### 2.5. ARCHIVE (завершение)
- Финализирует задачу и переносит её в архив:
  - `memory-bank/archive/archive-[task_id].md`.
- `memory-bank/tasks.md` и `activeContext.md` очищаются или переводятся в состояние «готов к новой задаче».

## 3. Роль README микропроекта

- `readme.md` в корне микропроекта:
  - первая точка входа для разработчика;
  - даёт краткое описание, команды запуска и ссылки на локальный `memory-bank/`.
- Структурированная информация для агентов (`tasks`, `activeContext`, `progress`, архитектурные паттерны) хранится **внутри `memory-bank/`**, а не в `readme.md`.

## 4. Пример: микропроект `react-lazy`

- Корень: `lazy-load-components/react-lazy`
- Локальный Memory Bank: `lazy-load-components/react-lazy/memory-bank/`
- Документация:
  - dev‑инструкция и архитектура: `lazy-load-components/react-lazy/memory-bank/docs/dev/README.md` и `architecture.md`
- Типовой сценарий:
  1. `/van` из `lazy-load-components/react-lazy` — зафиксировать новую задачу по `react-lazy`.
  2. `/plan` — составить план, используя локальный `memory-bank` и dev‑документацию.
  3. `/build` — реализовать изменения в коде `react-lazy`.
  4. `/reflect` — записать выводы в `memory-bank/reflection/...`.
  5. `/archive` — создать архивную запись в `memory-bank/archive/...` и подготовить систему к следующей задаче.

## RAW: документация, добавленная пользователем вручную

**Тестовый сценарий: прогоняем новую задачу по цепочке /van -> /plan -> /build -> /reflect -> /archive**

**В итоге, видим что используется "memory-bank" в корне проекта.**
**@TODO: Подумать правильно ли это. Ранее мы планировали, что каждый микропроект имеет свой "memory-bank".**

1. Инициализируем задачу
```text
/van Настроить dev/prod Docker-запуск для микропроекта react-lazy
```
В результате будут модифицированы файлы "<git-repo-root>/memory-bank/["activeContext.md", "progress.md", "tasks.md"]".
В  "<git-repo-root>/memory-bank/tasks.md" добавится:
```text
## Новая задача: Docker-запуск для `react-lazy`

...

### План реализации

...
```
2. Планируем задачу
```text
/plan
```
Изменится "<git-repo-root>/memory-bank/tasks.md"
Добавится:
```text
### Статус планирования
- Plan Status: completed
- Примечание: детальный план зафиксирован на уровне файлов и шагов; можно переходить к фазе `/build` с опорой на этот список.

```
3. Выполнение плана
```text
/build
```
Изменится "Статус" в "<git-repo-root>/memory-bank/tasks.md"
* Было
```text
## Новая задача: Docker-запуск для `react-lazy`

- Статус: in_progress
```
* Стало
```text
- Статус: completed
```
4. Рефлексия
```text
/reflect 
```
Добавится "<git-repo-root>/memory-bank/reflection/reflection-task-react-lazy-docker.md"
Изменятся "<git-repo-root>/memory-bank/[progress.md;tasks.md]"
* В "tasks.md" добавится
```text
### Рефлексия

- Reflection: completed
```
* В "progress.md" изменится
Было
```text
- Статус: in_progress
```
Стало
```text
- Статус: completed
```
5. Архивация
```text
/archive
```
Добавится: "<git-repo-root>/memory-bank/archive/archive-task-react-lazy-docker.md"
Изменятся: "<git-repo-root>/memory-bank/["activeContext.md"; "progress.md"; "tasks.md"]"
* "<git-repo-root>/memory-bank/activeContext.md"
Было
```text
- Фокус: настройка dev/prod Docker-запуска для микропроекта `react-lazy`.
```
Стало
```text
- Фокус: готов к следующей задаче.
```
* "<git-repo-root>/memory-bank/progress.md"
Было
```text
- Статус: completed
```
Стало
```text
- Статус: archived
```
* "<git-repo-root>/memory-bank/tasks.md"
Было
```text
## Новая задача: Docker-запуск для `react-lazy`
...

### План реализации (PLAN, Level 2)
...

### Статус планирования
...

### Рефлексия
...
```
Стало (Удалится все, что в предыдущей секции. Добавится "Архив задач")
```text
## Архив задач

- **task-react-lazy-docker** — COMPLETE. Архив: `memory-bank/archive/archive-task-react-lazy-docker.md`
```