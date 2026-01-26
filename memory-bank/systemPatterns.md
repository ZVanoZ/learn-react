# Memory Bank: System Patterns

## Architecture Patterns

### 1. Component-Based Architecture
- Модульная структура с разделением на компоненты
- Каждый компонент - отдельный модуль с собственной логикой

### 2. Lazy Loading Pattern
- Использование React.lazy() для динамической загрузки компонентов
- Code splitting на уровне компонентов
- Управление загрузкой через Suspense boundary

### 3. State Management Pattern
- Локальное состояние для отслеживания загруженных компонентов
- Управление активным компонентом через React state

## Design Patterns

### 1. Factory Pattern (для компонентов)
- Функция-фабрика для создания lazy компонентов
- Централизованное управление загрузкой компонентов

### 2. Strategy Pattern (для выбора компонента)
- Стратегия выбора компонента на основе нажатой кнопки
- Инкапсуляция логики выбора компонента

### 3. Singleton Pattern (для менеджера компонентов)
- Единая точка управления загруженными компонентами
- Кэширование загруженных компонентов

## Code Patterns

### 1. TypeScript Interfaces
```typescript
interface ComponentLoader {
  loadComponent: (name: string) => Promise<React.ComponentType>;
  isLoaded: (name: string) => boolean;
}
```

### 2. React Component Structure
```typescript
// Функциональный компонент с хуками
const Component: React.FC<Props> = ({ ... }) => {
  // Логика компонента
  return <div>...</div>;
};
```

### 3. Lazy Loading Pattern
```typescript
const LazyComponent = React.lazy(() => import('./Component'));
```

### 4. Error Boundary Pattern
- Обработка ошибок при загрузке компонентов
- Fallback UI при ошибках загрузки
