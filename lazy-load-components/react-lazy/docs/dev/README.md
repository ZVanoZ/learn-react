# Инструкция для разработчика

Документ описывает структуру проекта, стек технологий, архитектуру и шаги для локальной разработки и расширения приложения.

---

## 1. Обзор проекта

**react-dynamic-components-demo** — демонстрационное приложение на React + TypeScript, показывающее динамическую (ленивую) загрузку компонентов с помощью `React.lazy()` и Suspense API.

### Цели проекта

- Демонстрация lazy loading и code splitting в React.
- Управление состоянием загруженных компонентов через синглтон `ComponentLoader`.
- Типобезопасность через TypeScript (strict mode).

### Основные возможности

- Кнопки «button-1» и «button-2» добавляют экземпляры Component1 и Component2 в область отображения.
- Кнопка «clear» очищает список отображаемых компонентов.
- Компоненты подгружаются по требованию; после первой загрузки переиспользуются из кэша.

---

## 2. Стек технологий

| Категория      | Технология              | Версия / примечание      |
|----------------|-------------------------|---------------------------|
| UI             | React                   | ^19.2.0                   |
| Язык           | TypeScript              | ~5.9.3, strict             |
| Сборка / dev   | Vite                    | ^7.2.4                    |
| React в Vite   | @vitejs/plugin-react    | ^5.1.1                    |

- **Модули:** ES Modules (`"type": "module"` в `package.json`).
- **JSX:** `react-jsx` (tsconfig).

Актуальная документация по технологиям доступна через **Context7 MCP** (например, React lazy/Suspense, Vite CLI и конфигурация).

---

## 3. Структура проекта

```
react-lazy/
├── docs/                    # Документация
│   ├── dev/                 # Инструкции для разработчика (этот документ)
│   └── chat/                # История чатов по задачам
├── memory-bank/             # Memory Bank (задачи, контекст, архив)
├── src/
│   ├── components/
│   │   ├── App.tsx              # Корневой компонент, состояние списка компонентов
│   │   ├── ButtonPanel.tsx      # Кнопки button-1, button-2, clear
│   │   ├── ComponentContainer.tsx  # Рендер списка + Suspense по каждому компоненту
│   │   ├── ErrorBoundary.tsx    # Обработка ошибок загрузки/рендера
│   │   ├── Component1/          # Демо-компонент 1
│   │   └── Component2/         # Демо-компонент 2
│   ├── services/
│   │   └── ComponentLoader.ts  # Синглтон: загрузка и кэш lazy-компонентов
│   ├── types/
│   │   └── index.ts            # LoadableComponent, ComponentInstance, ComponentLoaderConfig
│   ├── App.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 4. Архитектура и ключевые паттерны

### 4.1. Lazy loading (React.lazy + Suspense)

- Компоненты **не** импортируются статически в `App.tsx`; загрузка идёт через `ComponentLoader`, который внутри использует динамический `import()` и `React.lazy()`.
- При первом запросе компонента загружается чанк; при повторном — берётся из кэша `ComponentLoader`.
- Каждый отображаемый экземпляр оборачивается в `<Suspense>` с fallback «Загрузка компонента...» (см. `ComponentContainer.tsx`).

Рекомендация из документации React: ленивый компонент должен быть экспортирован как **default**; для отображения во время загрузки обязательно использовать границу `<Suspense>`.

### 4.2. ComponentLoader (singleton)

- **Файл:** `src/services/ComponentLoader.ts`.
- Один экземпляр на приложение (`getInstance()`).
- Хранит маппинг имён компонентов на фабрики вида `() => import('...')` и кэш уже созданных `React.lazy(...)` компонентов.
- Методы:
  - `loadComponent(name)` — при необходимости загружает и кэширует, возвращает lazy-компонент.
  - `isLoaded(name)` — проверка, загружен ли компонент.
  - `getComponent(name)` — получить закэшированный lazy-компонент или `null`.

Добавление нового ленивого компонента требует: запись в `componentMap`, при необходимости — обновление типов в `src/types/index.ts` (см. раздел 7).

### 4.3. Error Boundary

- **Файл:** `src/components/ErrorBoundary.tsx`.
- Классовый компонент; перехватывает ошибки в дочернем дереве (в т.ч. при загрузке/рендере ленивых компонентов).
- При ошибке показывает сообщение и кнопку «Попробовать снова»; в консоль пишет `componentDidCatch`.
- В приложении оборачивает `ComponentContainer`, чтобы сбой одного ленивого компонента не ломал всю страницу.

### 4.4. Поток данных

1. Пользователь нажимает button-1 или button-2 → `App.handleButtonClick(componentName)`.
2. `App` запрашивает у `ComponentLoader.getInstance()` загрузку/получение компонента.
3. В состояние `App` добавляется новый объект `ComponentInstance` (id, type, component).
4. `ComponentContainer` рендерит список: для каждого экземпляра — `<Suspense><Component /></Suspense>`.
5. При первом показе компонента React загружает чанк и рендерит его; при повторном — использует кэш.

---

## 5. Запуск и сборка

Требования: **Node.js** (рекомендуется LTS), **npm**.

```bash
# Установка зависимостей
npm install

# Режим разработки (dev-сервер, по умолчанию порт 3000, открытие браузера — см. vite.config.ts)
npm run dev

# Сборка для продакшена (tsc + vite build)
npm run build

# Локальный просмотр собранного приложения
npm run preview
```

В проекте используется `tsc && vite build`: сначала проверка типов, затем сборка Vite. Конфигурация Vite: `vite.config.ts` (плагин React, порт 3000, `open: true`).

---

## 6. Типы (TypeScript)

- **`LoadableComponent`** — тип для результата `React.lazy(...)` (`React.LazyExoticComponent<ComponentType<any>>`).
- **`ComponentInstance`** — элемент списка в состоянии App: `id`, `type: 'Component1' | 'Component2'`, `component: LoadableComponent`.
- **`ComponentLoaderConfig`** — описание конфигурации загрузчика (componentName, importPath); может использоваться при расширении на регистрируемые компоненты.

Строгая типизация: в tsconfig включены `strict`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`.

---

## 7. Добавление нового ленивого компонента

1. **Создать компонент** в `src/components/`, например `Component3/Component3.tsx`, с **default export**.
2. **Зарегистрировать в ComponentLoader:** в `ComponentLoader.ts` добавить в `componentMap`:
   - ключ, например `'Component3'`;
   - значение: `() => import('../components/Component3/Component3')`.
3. **Обновить типы:** в `src/types/index.ts` расширить union для `ComponentInstance.type`, например: `'Component1' | 'Component2' | 'Component3'`.
4. **Обновить UI:** в `App.tsx` и `ButtonPanel.tsx` расширить тип аргумента (например, `'Component1' | 'Component2' | 'Component3'`) и добавить кнопку/обработчик для Component3.

После этого новый компонент будет подгружаться по требованию и кэшироваться так же, как Component1 и Component2.

---

## 8. Memory Bank и рабочий процесс

- Задачи и контекст хранятся в `memory-bank/` (см. правило **memory-bank-paths**).
- Важные файлы: `tasks.md`, `activeContext.md`, `progress.md`, `projectbrief.md`, `techContext.md`.
- Для инициализации и анализа задачи используется команда **VAN**; для планирования — **PLAN**; для реализации — **BUILD**; для рефлексии и архива — **REFLECT** и **ARCHIVE**.

Подробности — в `.cursor/rules/isolation_rules/` и визуальных картах режимов (van-mode-map и др.).

---

## 9. Рекомендации по разработке

- **Стиль кода:** по возможности строгие типы и OOP там, где это уместно (например, `ComponentLoader` как класс, `ErrorBoundary` как классовый компонент).
- **Ошибки загрузки:** всегда держать ленивые компоненты внутри `Suspense` и при необходимости — внутри `ErrorBoundary`, как в текущем приложении.
- **Экономия токенов (для AI/агентов):** при запросах по коду указывать конкретные файлы или директории (`@src/services/ComponentLoader.ts`, `@src/types/index.ts` и т.д.), чтобы сужать контекст.

---

## 10. Ссылки на документацию (Context7)

При необходимости уточнить API или лучшие практики используйте MCP **user-context7**:

- **React:** lazy, Suspense, Error Boundary — библиотека `/websites/react_dev` (или актуальный аналог из resolve-library-id).
- **Vite:** настройка проекта, скрипты dev/build/preview — библиотека `/vitejs/vite`.

Перед вызовом `query-docs` рекомендуется получить точный library ID через `resolve-library-id` по имени библиотеки и задаче.
