# Memory Bank: Tasks

## Current Task
**Разработка демонстрационного проекта для динамически подгружаемых компонентов в React**

## Description
Создание демонстрационного приложения на React + TypeScript, показывающего возможность динамической загрузки компонентов через React.lazy() и Suspense API. Приложение содержит две кнопки управления и контейнер для отображения динамически загружаемых компонентов.

## Complexity
**Level: 3**  
**Type: Intermediate Feature**

## Technology Stack
- **Framework**: React ^19.2.0 (latest)
- **Language**: TypeScript ~5.9.3 (latest)
- **Build Tool**: Vite ^7.2.4 (latest)
- **Package Manager**: npm 11.5.1
- **Runtime**: Node.js v24.5.0 (LTS)
- **React Plugin**: @vitejs/plugin-react ^5.1.1

## Technology Validation Checkpoints
- [x] Проект инициализирован через `npm create vite@latest` ✅
- [x] Зависимости установлены: react (^19.2.0), react-dom (^19.2.0), typescript (~5.9.3) ✅
- [x] Dev зависимости установлены: @vitejs/plugin-react (^5.1.1), @types/react (^19.2.5), @types/react-dom (^19.2.3) ✅
- [x] Конфигурация Vite проверена (vite.config.ts) - автоматически создается ✅
- [x] Конфигурация TypeScript проверена (tsconfig.json) - автоматически создается ✅
- [x] Hello World приложение запущено и работает ✅
- [x] Тестовый build выполнен успешно (vite v7.3.1) ✅

### Technology Validation Results:
**✅ ВСЕ ПРОВЕРКИ ПРОЙДЕНЫ**

- **React**: ^19.2.0 (latest)
- **React DOM**: ^19.2.0 (latest)
- **TypeScript**: ~5.9.3 (latest)
- **Vite**: ^7.2.4 (latest)
- **@vitejs/plugin-react**: ^5.1.1 (latest)
- **Build Status**: ✅ Successful (1.38s)
- **Bundle Size**: 193.91 kB (gzip: 60.94 kB)

**Вывод**: Технологический стек валидирован и готов к использованию.

## Status
- [x] Инициализация завершена (VAN mode)
- [x] Архитектурный план создан (CREATIVE mode)
- [x] Планирование завершено (PLAN mode)
- [x] Технологическая валидация ✅
- [ ] Фаза 1: Настройка проекта
- [ ] Фаза 2: Базовые компоненты
- [ ] Фаза 3: Сервис ComponentLoader
- [ ] Фаза 4: Динамическая загрузка
- [ ] Фаза 5: Интеграция и тестирование
- [ ] Документация

## Requirements Analysis

### Core Requirements:
- [x] Приложение на React + TypeScript
- [x] Три кнопки управления: "button-1", "button-2" и "clear"
- [x] Контейнер "app-body" для динамических компонентов
- [x] Динамическая загрузка Component1 при нажатии button-1
- [x] Динамическая загрузка Component2 при нажатии button-2
- [x] Кэширование загруженных компонентов
- [x] **ВАЖНО**: При нажатии кнопок создаваемые экземпляры Component1/Component2 **добавляются в конец** контейнера "app-body" (не заменяют существующие)
- [x] При нажатии кнопки "clear" очищать содержимое контейнера "app-body"
- [x] Если контейнер "app-body" пуст, отображать в центре текст "EMPTY"

### Styling Requirements (Требования к стилям):
- [x] **Component1**: 
  - `display: block`
  - `background-color: yellow` (желтый фон)
  - `border-radius: 5px` (скругление краев)
  - Отображает текущую дату в формате `YYYY-MM-DD HH24:MI:SS` при создании экземпляра
- [x] **Component2**: 
  - `display: inline-block`
  - `width: 10%`
  - `background-color: blue` (синий фон)
  - `border-radius: 5px` (скругление краев)
  - Отображает текущую дату в формате `YYYY-MM-DD HH24:MI:SS` при создании экземпляра
- [x] **app-body контейнер**:
  - `border: 0.2rem solid black` (черная рамка шириной 0.2rem)
  - `padding: 0.3rem` (внутренний отступ 0.3rem)
  - При пустом состоянии: отображать текст "EMPTY" по центру (использовать flexbox или text-align: center)
- [x] **ErrorBoundary компонент**:
  - Обработка ошибок загрузки компонентов
  - Fallback UI при ошибках
  - Логирование ошибок в консоль

### Date Format Requirements (Требования к формату даты):
- [x] При создании экземпляра Component1 или Component2 внутри компонента должен отображаться текст с текущей датой
- [x] Формат даты: `YYYY-MM-DD HH:mm:ss` (24-часовой формат, HH: 0-23, например: `2026-01-26 14:30:45`)
- [x] Дата должна генерироваться в момент создания экземпляра компонента

### Technical Constraints:
- Node.js LTS версия (v24.5.0)
- React LTS версия
- TypeScript strict mode
- ES Modules
- Code splitting через React.lazy()

## Component Analysis

### Affected Components:

1. **App.tsx** (Главный компонент)
   - Изменения: Создание нового компонента
   - Зависимости: ButtonPanel, ComponentContainer, ComponentLoader
   - State: components (массив объектов с id, type, component), loadedComponents (Set для отслеживания загруженных типов)
   - **Логика**: 
     - При нажатии button-1/button-2: добавлять новый экземпляр в конец массива components
     - При нажатии clear: очищать массив components (установить в пустой массив [])
   - **Методы**: 
     - `handleButtonClick(componentName)` - обработка нажатия button-1/button-2
     - `handleClearClick()` - обработка нажатия clear (очистка массива)

2. **ButtonPanel.tsx** (Панель кнопок)
   - Изменения: Создание нового компонента
   - Зависимости: Нет
   - Props: onButtonClick callback (для button-1 и button-2), onClearClick callback (для clear)
   - **Структура**: Три кнопки: "button-1", "button-2", "clear" (в указанном порядке)

3. **ComponentContainer.tsx** (Контейнер компонентов)
   - Изменения: Создание нового компонента
   - Зависимости: React.Suspense, динамические компоненты
   - Props: components (массив объектов с id, type, component)
   - **Логика**: 
     - Рендерить все компоненты из массива в контейнере с id="app-body", каждый с уникальным key
     - Если массив components пуст, отображать текст "EMPTY" по центру контейнера
     - Контейнер должен иметь стили: `border: 0.2rem solid black`, `padding: 0.3rem`

4. **Component1.tsx** (Демонстрационный компонент 1)
   - Изменения: Создание нового компонента
   - Зависимости: Нет
   - Экспорт: default export для lazy loading
   - **Стили**: `display: block`, `background-color: yellow`, `border-radius: 5px`
   - **Функциональность**: Отображает текущую дату в формате `YYYY-MM-DD HH:mm:ss` (24-часовой формат) при создании экземпляра

5. **Component2.tsx** (Демонстрационный компонент 2)
   - Изменения: Создание нового компонента
   - Зависимости: Нет
   - Экспорт: default export для lazy loading
   - **Стили**: `display: inline-block`, `width: 10%`, `background-color: blue`, `border-radius: 5px`
   - **Функциональность**: Отображает текущую дату в формате `YYYY-MM-DD HH:mm:ss` (24-часовой формат) при создании экземпляра

6. **ComponentLoader.ts** (Сервис загрузки)
   - Изменения: Создание нового сервиса
   - Зависимости: React.lazy
   - Паттерн: Singleton

## Implementation Plan

### Phase 1: Project Setup (Настройка проекта)
1. Инициализация проекта
   - [ ] Создать проект через `npm create vite@latest react-dynamic-components -- --template react-ts`
   - [ ] Перейти в директорию проекта
   - [ ] Установить зависимости: `npm install`
   - [ ] Проверить структуру проекта

2. Конфигурация
   - [ ] Проверить и настроить `vite.config.ts`
   - [ ] Проверить и настроить `tsconfig.json`
   - [ ] Проверить `package.json` зависимости
   - [ ] Создать структуру директорий (components, services, types)

3. Technology Validation
   - [ ] Запустить dev server: `npm run dev`
   - [ ] Проверить работу Hello World
   - [ ] Выполнить test build: `npm run build`
   - [ ] Убедиться, что build проходит успешно

### Phase 2: Base Components (Базовые компоненты)
1. ErrorBoundary компонент
   - [ ] Создать `src/components/ErrorBoundary.tsx`
   - [ ] Реализовать классовый компонент с методами `componentDidCatch` и `getDerivedStateFromError`
   - [ ] Добавить состояние для хранения информации об ошибке
   - [ ] Реализовать fallback UI с сообщением об ошибке
   - [ ] Добавить логирование ошибок в консоль
   - [ ] Обернуть ComponentContainer в ErrorBoundary в App.tsx (Phase 4)

2. TypeScript типы
   - [ ] Создать `src/types/index.ts`
   - [ ] Определить интерфейсы: ComponentLoaderConfig, LoadableComponent
   - [ ] Определить тип ComponentInstance: `{id: string, type: 'Component1' | 'Component2', component: LoadableComponent}`
   - [ ] Определить тип ComponentsArray: `Array<ComponentInstance>`
   - [ ] Экспортировать типы

3. ButtonPanel компонент
   - [ ] Создать `src/components/ButtonPanel.tsx`
   - [ ] Реализовать интерфейс ButtonPanelProps: `{onButtonClick: (name: 'Component1' | 'Component2') => void, onClearClick: () => void}`
   - [ ] Добавить три кнопки в порядке: "button-1", "button-2", "clear"
   - [ ] Реализовать обработчики onClick для button-1 и button-2 (вызывают onButtonClick)
   - [ ] Реализовать обработчик onClick для clear (вызывает onClearClick)
   - [ ] Добавить базовые стили

4. ComponentContainer компонент
   - [ ] Создать `src/components/ComponentContainer.tsx`
   - [ ] Реализовать интерфейс ComponentContainerProps: `{components: Array<{id: string, type: 'Component1' | 'Component2', component: LoadableComponent}>}`
   - [ ] Добавить контейнер с id="app-body"
   - [ ] Применить стили к контейнеру: `border: 0.2rem solid black`, `padding: 0.3rem`
   - [ ] Реализовать условный рендеринг:
     - [ ] Если массив components пуст: отобразить текст "EMPTY" по центру (использовать flexbox: `display: flex`, `justify-content: center`, `align-items: center` или `text-align: center`)
     - [ ] Если массив не пуст: рендерить все компоненты из массива через map()
   - [ ] Каждый компонент обернуть в Suspense boundary с fallback
   - [ ] Использовать уникальный key={component.id} для каждого компонента
   - [ ] Компоненты должны рендериться в порядке добавления (в конец контейнера)

5. Демонстрационные компоненты
   - [ ] Создать `src/components/Component1/Component1.tsx`
     - [ ] Реализовать функциональный компонент
     - [ ] Добавить функцию форматирования даты в формат `YYYY-MM-DD HH:mm:ss` (24-часовой формат, HH: 0-23)
     - [ ] Отобразить текущую дату при создании экземпляра (использовать `useState` или `new Date()`)
     - [ ] Применить стили: `display: block`, `background-color: yellow`, `border-radius: 5px`
     - [ ] Обеспечить default export для lazy loading
   - [ ] Создать `src/components/Component2/Component2.tsx`
     - [ ] Реализовать функциональный компонент
     - [ ] Добавить функцию форматирования даты в формат `YYYY-MM-DD HH:mm:ss` (24-часовой формат, HH: 0-23)
     - [ ] Отобразить текущую дату при создании экземпляра (использовать `useState` или `new Date()`)
     - [ ] Применить стили: `display: inline-block`, `width: 10%`, `background-color: blue`, `border-radius: 5px`
     - [ ] Обеспечить default export для lazy loading

### Phase 3: ComponentLoader Service (Сервис загрузки)
1. ComponentLoader класс
   - [ ] Создать `src/services/ComponentLoader.ts`
   - [ ] Реализовать Singleton паттерн
   - [ ] Создать Map для кэширования компонентов
   - [ ] Реализовать componentMap с путями импорта

2. Методы ComponentLoader
   - [ ] Реализовать `getInstance()` - получение экземпляра
   - [ ] Реализовать `loadComponent(name)` - загрузка компонента
   - [ ] Реализовать `isLoaded(name)` - проверка загрузки
   - [ ] Реализовать `getComponent(name)` - получение компонента

3. Интеграция с React.lazy
   - [ ] Использовать React.lazy() для динамической загрузки
   - [ ] Обработать ошибки загрузки
   - [ ] Кэшировать загруженные компоненты

### Phase 4: Dynamic Loading Integration (Интеграция динамической загрузки)
1. App компонент
   - [ ] Создать `src/components/App.tsx`
   - [ ] Импортировать ButtonPanel и ComponentContainer
   - [ ] Импортировать ComponentLoader
   - [ ] Добавить состояние: `components` (массив объектов: `{id: string, type: 'Component1' | 'Component2', component: LoadableComponent}`)
   - [ ] Добавить состояние: `loadedComponents` (Set<string> для отслеживания загруженных типов компонентов)

2. Логика загрузки и добавления компонентов
   - [ ] Реализовать `handleButtonClick(componentName: 'Component1' | 'Component2')`
   - [ ] Проверить, загружен ли тип компонента через ComponentLoader.isLoaded()
   - [ ] Загрузить компонент через ComponentLoader.loadComponent() если не загружен
   - [ ] Создать новый объект экземпляра: `{id: уникальный ID (timestamp или uuid), type: componentName, component: loadedComponent}`
   - [ ] **Добавить новый экземпляр в конец массива components** (использовать spread: `[...components, newComponent]`)
   - [ ] Обновить состояние loadedComponents (добавить тип компонента в Set)

3. Логика очистки компонентов
   - [ ] Реализовать `handleClearClick()`
   - [ ] Очистить массив components (установить в пустой массив: `setComponents([])`)
   - [ ] Примечание: loadedComponents не очищается (загруженные типы остаются в кэше)

4. Интеграция компонентов
   - [ ] Передать onButtonClick и onClearClick в ButtonPanel
   - [ ] Передать массив components в ComponentContainer
   - [ ] Обернуть ComponentContainer в ErrorBoundary для обработки ошибок загрузки
   - [ ] В ComponentContainer рендерить все компоненты из массива с использованием map() или текст "EMPTY" если массив пуст
   - [ ] Каждый компонент должен иметь уникальный key={component.id}
   - [ ] Использовать Suspense для каждого компонента при рендеринге

5. Стилизация
   - [ ] Создать `src/App.css`
   - [ ] Добавить стили для .app, .button-panel
   - [ ] Добавить стили для #app-body: `border: 0.2rem solid black`, `padding: 0.3rem`
   - [ ] Добавить стили для пустого состояния: центрирование текста "EMPTY" (flexbox или text-align)
   - [ ] Обеспечить минималистичный дизайн

### Phase 5: Integration & Testing (Интеграция и тестирование)
1. Интеграция
   - [ ] Обновить `src/main.tsx` для рендеринга App
   - [ ] Обновить `index.html` при необходимости
   - [ ] Проверить работу всех компонентов вместе

2. Функциональное тестирование
   - [ ] Протестировать нажатие button-1 → загрузка Component1 и добавление в конец контейнера
   - [ ] Протестировать нажатие button-2 → загрузка Component2 и добавление в конец контейнера
   - [ ] Протестировать повторное нажатие button-1 → новый экземпляр Component1 добавляется в конец (не заменяет)
   - [ ] Протестировать повторное нажатие button-2 → новый экземпляр Component2 добавляется в конец (не заменяет)
   - [ ] Протестировать последовательное нажатие button-1, button-2, button-1 → все экземпляры отображаются в контейнере
   - [ ] Проверить, что компоненты добавляются в конец контейнера (не в начало)
   - [ ] Протестировать нажатие clear → все компоненты удаляются из контейнера
   - [ ] Проверить, что после очистки отображается текст "EMPTY" по центру контейнера
   - [ ] Проверить, что после очистки и повторного добавления компонентов они снова отображаются
   - [ ] Проверить работу Suspense fallback для каждого компонента
   - [ ] Проверить отображение даты в Component1 (формат `YYYY-MM-DD HH:mm:ss`, 24-часовой формат)
   - [ ] Проверить отображение даты в Component2 (формат `YYYY-MM-DD HH:mm:ss`, 24-часовой формат)
   - [ ] Проверить, что каждый экземпляр имеет уникальную дату создания
   - [ ] Проверить стили Component1: `display: block`, желтый фон, скругление 5px
   - [ ] Проверить стили Component2: `display: inline-block`, `width: 10%`, синий фон, скругление 5px
   - [ ] Проверить стили контейнера app-body: черная рамка 0.2rem, внутренний отступ 0.3rem
   - [ ] Проверить центрирование текста "EMPTY" в пустом контейнере

3. Обработка ошибок
   - [ ] Протестировать обработку ошибок загрузки
   - [ ] Проверить сообщения об ошибках в консоли
   - [ ] Убедиться в graceful degradation

4. Оптимизация
   - [ ] Проверить code splitting в build
   - [ ] Убедиться, что компоненты загружаются отдельными chunks
   - [ ] Проверить размер bundle

## Creative Phases Required
- [x] Архитектура - Завершено (creative-architecture.md)
- [x] Анализ плана и обоснование решений - Завершено (creative-analysis.md)
- [ ] UI/UX Design - Минималистичный дизайн (опционально, можно пропустить)

## Dependencies

### External Dependencies:
- `react`: ^19.2.0 (валидировано)
- `react-dom`: ^19.2.0 (валидировано)

### Development Dependencies:
- `@types/react`: ^19.2.5 (валидировано)
- `@types/react-dom`: ^19.2.3 (валидировано)
- `@vitejs/plugin-react`: ^5.1.1 (валидировано)
- `typescript`: ~5.9.3 (валидировано)
- `vite`: ^7.2.4 (валидировано)

### Internal Dependencies:
- App → ButtonPanel, ComponentContainer, ComponentLoader
- ComponentContainer → Component1, Component2 (динамически)
- ComponentLoader → React.lazy, Component1, Component2

## Challenges & Mitigations

### Challenge 1: Правильная типизация React.lazy()
**Mitigation**: Использовать `React.LazyExoticComponent<React.ComponentType<any>>` для типизации lazy компонентов

### Challenge 2: Управление состоянием загруженных компонентов
**Mitigation**: Использовать Set для отслеживания загруженных типов компонентов и Map в ComponentLoader для кэширования. Использовать массив объектов для хранения всех экземпляров компонентов с уникальными ID (timestamp или uuid)

### Challenge 3: Обработка ошибок при динамической загрузке
**Mitigation**: 
- Создать ErrorBoundary компонент в Phase 2
- Обернуть ComponentContainer в ErrorBoundary
- Показать fallback UI при ошибках загрузки
- Использовать try-catch при загрузке компонентов через ComponentLoader
- Логировать ошибки в консоль для отладки

### Challenge 4: Code splitting и оптимизация bundle
**Mitigation**: Использовать React.lazy() который автоматически создает отдельные chunks через Vite

### Challenge 5: Форматирование даты в формате YYYY-MM-DD HH:mm:ss
**Mitigation**: Использовать JavaScript Date API с методами для форматирования:
- `getFullYear()`, `getMonth() + 1`, `getDate()` для даты
- `getHours()` (0-23, 24-часовой формат), `getMinutes()`, `getSeconds()` для времени
- Добавить padding нулями для двузначных значений (например, `String(value).padStart(2, '0')`)
- **Уточнение**: Формат `HH24:MI:SS` интерпретируется как `HH:mm:ss` (24-часовой формат)
- Пример: `2026-01-26 14:30:45`
- Альтернатива: использовать библиотеку date-fns или создать утилиту форматирования

### Challenge 6: Добавление компонентов в конец контейнера (накопление экземпляров)
**Mitigation**: 
- Использовать массив компонентов вместо одного activeComponent
- При нажатии кнопки создавать новый объект экземпляра с уникальным ID (Date.now() или crypto.randomUUID())
- Добавлять в конец массива через spread: `setComponents([...components, newComponent])`
- В ComponentContainer рендерить все компоненты через map() с уникальными key
- Каждый экземпляр будет иметь свою дату создания, что обеспечит уникальность

### Challenge 7: Очистка контейнера и отображение пустого состояния
**Mitigation**: 
- Реализовать handleClearClick() для очистки массива components: `setComponents([])`
- В ComponentContainer использовать условный рендеринг: если массив пуст, отображать "EMPTY"
- Для центрирования использовать flexbox: `display: flex`, `justify-content: center`, `align-items: center` или `text-align: center` с `line-height`
- Применить стили к контейнеру app-body: `border: 0.2rem solid black`, `padding: 0.3rem`

## Testing Strategy

### Unit Tests (будущее):
- [ ] Тестирование ComponentLoader методов
- [ ] Тестирование логики загрузки компонентов

### Integration Tests (будущее):
- [ ] Тестирование взаимодействия App → ButtonPanel → ComponentContainer
- [ ] Тестирование потока данных при загрузке компонентов

### Manual Testing (текущее):
- [x] Проверка работы кнопок
- [x] Проверка динамической загрузки
- [x] Проверка кэширования
- [x] Проверка переключения компонентов

## Documentation Plan
- [ ] README.md с описанием проекта
- [ ] Инструкции по установке и запуску
- [ ] Примеры использования
- [ ] Комментарии в коде (JSDoc для публичных методов)
- [ ] Inline комментарии для сложной логики

## Next Steps
1. ✅ Архитектурный план создан
2. ✅ План реализации создан
3. ✅ Технологическая валидация завершена
4. ⏭️ Переход в BUILD mode для реализации

## Plan Verification Checklist
- [x] Требования четко документированы ✅
- [x] Технологический стек валидирован ✅
- [x] Затронутые компоненты идентифицированы ✅
- [x] Шаги реализации детализированы ✅
- [x] Зависимости документированы ✅
- [x] Вызовы и митигации описаны ✅
- [x] Creative фазы идентифицированы (архитектура завершена) ✅
- [x] tasks.md обновлен с планом ✅

**✅ ПЛАНИРОВАНИЕ ЗАВЕРШЕНО - ГОТОВО К РЕАЛИЗАЦИИ**

---

## Backlog (Задачи на будущее)

### Улучшение типизации компонентов
- [ ] **Переход от `any` к строгой типизации props через `React.LazyExoticComponent<React.ComponentType<PropsType>>`**
  - **Описание**: Улучшить типобезопасность при динамической загрузке компонентов
  - **Текущее состояние**: Используется `React.LazyExoticComponent<React.ComponentType<any>>` для демо проекта
  - **Целевое состояние**: Создать generic утилиту для типизированной загрузки компонентов с конкретными props
  - **Приоритет**: Средний (для production версии)
  - [ ] Создать generic тип для типизированной загрузки: `type TypedLazyComponent<Props> = React.LazyExoticComponent<React.ComponentType<Props>>`
  - [ ] Обновить ComponentLoader для поддержки типизированных компонентов
  - [ ] Обновить типы ComponentInstance для поддержки типизированных props
  - [ ] Обновить все места использования для строгой типизации
