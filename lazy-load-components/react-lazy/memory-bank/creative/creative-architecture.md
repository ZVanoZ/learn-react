# Архитектурный план: Демонстрация динамической загрузки компонентов

## Дата создания
2026-01-26

## Цель
Создать демонстрационный проект на React + TypeScript, показывающий возможность динамически подгружаемых компонентов.

---

## 1. Архитектура приложения

### 1.1 Структура проекта

```
app/
├── src/
│   ├── components/
│   │   ├── App.tsx                 # Главный компонент приложения
│   │   ├── ButtonPanel.tsx         # Панель с кнопками управления
│   │   ├── ComponentContainer.tsx  # Контейнер для динамических компонентов
│   │   ├── Component1/
│   │   │   └── Component1.tsx      # Первый демонстрационный компонент
│   │   └── Component2/
│   │       └── Component2.tsx      # Второй демонстрационный компонент
│   ├── services/
│   │   └── ComponentLoader.ts      # Сервис для управления загрузкой компонентов
│   ├── types/
│   │   └── index.ts                 # TypeScript типы и интерфейсы
│   ├── App.css                      # Стили приложения
│   ├── main.tsx                     # Точка входа
│   └── vite-env.d.ts               # Типы Vite
├── index.html                       # HTML шаблон
├── package.json                     # Зависимости проекта
├── tsconfig.json                    # Конфигурация TypeScript
├── vite.config.ts                   # Конфигурация Vite
└── README.md                        # Документация проекта
```

### 1.2 Компонентная архитектура

```
┌─────────────────────────────────────┐
│           App.tsx                   │
│  ┌───────────────────────────────┐  │
│  │      ButtonPanel.tsx          │  │
│  │  ┌──────────┐  ┌──────────┐  │  │
│  │  │button-1  │  │button-2  │  │  │
│  │  └──────────┘  └──────────┘  │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │   ComponentContainer.tsx      │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │   app-body             │  │  │
│  │  │  ┌───────────────────┐  │  │  │
│  │  │  │  Component1/2    │  │  │  │
│  │  │  │  (динамически)   │  │  │  │
│  │  │  └───────────────────┘  │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

---

## 2. Технические решения

### 2.1 Динамическая загрузка компонентов

**Подход**: Использование React.lazy() и Suspense API

**Преимущества**:
- Встроенная поддержка в React
- Автоматический code splitting
- TypeScript поддержка из коробки
- Оптимизация bundle size

**Реализация**:
```typescript
// ComponentLoader.ts
const Component1 = React.lazy(() => import('./components/Component1/Component1'));
const Component2 = React.lazy(() => import('./components/Component2/Component2'));
```

### 2.2 Управление состоянием

**Подход**: Локальное состояние через React.useState

**Структура состояния**:
```typescript
interface AppState {
  activeComponent: 'Component1' | 'Component2' | null;
  loadedComponents: Set<string>;
}
```

**Логика**:
- При нажатии кнопки проверяется, загружен ли компонент
- Если не загружен - загружается через React.lazy()
- Компонент кэшируется в состоянии
- Активный компонент отображается в app-body

### 2.3 TypeScript типизация

**Интерфейсы**:
```typescript
// types/index.ts
export interface ComponentLoaderConfig {
  componentName: string;
  importPath: string;
}

export type LoadableComponent = React.LazyExoticComponent<React.ComponentType<any>>;
```

---

## 3. Детальная структура компонентов

### 3.1 App.tsx (Главный компонент)

**Ответственность**:
- Управление общим состоянием приложения
- Координация между ButtonPanel и ComponentContainer
- Обработка логики загрузки компонентов

**Props**: Нет (корневой компонент)

**State**:
```typescript
const [activeComponent, setActiveComponent] = useState<string | null>(null);
const [loadedComponents, setLoadedComponents] = useState<Set<string>>(new Set());
```

**Методы**:
- `handleButtonClick(componentName: string)` - обработчик нажатия кнопки

### 3.2 ButtonPanel.tsx (Панель кнопок)

**Ответственность**:
- Отображение двух кнопок управления
- Передача событий нажатия в родительский компонент

**Props**:
```typescript
interface ButtonPanelProps {
  onButtonClick: (componentName: 'Component1' | 'Component2') => void;
}
```

**Структура**:
- Две кнопки: "button-1" и "button-2"
- Обработчики onClick для каждой кнопки

### 3.3 ComponentContainer.tsx (Контейнер компонентов)

**Ответственность**:
- Отображение загруженного компонента
- Обработка Suspense и ErrorBoundary
- Управление состоянием загрузки

**Props**:
```typescript
interface ComponentContainerProps {
  activeComponent: string | null;
  loadedComponents: Set<string>;
}
```

**Структура**:
- Контейнер с id="app-body"
- Suspense boundary с fallback
- Условный рендеринг активного компонента

### 3.4 Component1.tsx и Component2.tsx

**Ответственность**:
- Демонстрация работы динамической загрузки
- Визуальное различие между компонентами

**Props**: Нет (демонстрационные компоненты)

**Структура**:
- Простые функциональные компоненты
- Уникальный контент для каждого компонента
- Экспорт по умолчанию для lazy loading

---

## 4. Сервис ComponentLoader

### 4.1 Назначение
Централизованное управление загрузкой и кэшированием компонентов.

### 4.2 API

```typescript
class ComponentLoader {
  private loadedComponents: Map<string, LoadableComponent>;
  
  // Загрузить компонент
  loadComponent(name: string): LoadableComponent;
  
  // Проверить, загружен ли компонент
  isLoaded(name: string): boolean;
  
  // Получить загруженный компонент
  getComponent(name: string): LoadableComponent | null;
}
```

### 4.3 Реализация

```typescript
// ComponentLoader.ts
export class ComponentLoader {
  private static instance: ComponentLoader;
  private loadedComponents: Map<string, LoadableComponent> = new Map();
  
  private componentMap: Record<string, () => Promise<any>> = {
    Component1: () => import('../components/Component1/Component1'),
    Component2: () => import('../components/Component2/Component2'),
  };
  
  static getInstance(): ComponentLoader {
    if (!ComponentLoader.instance) {
      ComponentLoader.instance = new ComponentLoader();
    }
    return ComponentLoader.instance;
  }
  
  loadComponent(name: string): LoadableComponent {
    if (this.loadedComponents.has(name)) {
      return this.loadedComponents.get(name)!;
    }
    
    const loader = this.componentMap[name];
    if (!loader) {
      throw new Error(`Component ${name} not found`);
    }
    
    const lazyComponent = React.lazy(loader);
    this.loadedComponents.set(name, lazyComponent);
    return lazyComponent;
  }
  
  isLoaded(name: string): boolean {
    return this.loadedComponents.has(name);
  }
  
  getComponent(name: string): LoadableComponent | null {
    return this.loadedComponents.get(name) || null;
  }
}
```

---

## 5. Стилизация

### 5.1 Подход
- CSS модули или обычный CSS
- Минималистичный дизайн для демонстрации функциональности
- Адаптивная верстка (опционально)

### 5.2 Структура стилей

```css
/* App.css */
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.button-panel {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f5f5f5;
}

.app-body {
  flex: 1;
  padding: 2rem;
  background: white;
}
```

---

## 6. Конфигурация проекта

### 6.1 package.json

```json
{
  "name": "react-dynamic-components-demo",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.1",
    "typescript": "^5.6.3",
    "vite": "^6.0.0"
  }
}
```

### 6.2 tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 6.3 vite.config.ts

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
});
```

---

## 7. Поток данных

```
User Click Button
    ↓
ButtonPanel.onButtonClick()
    ↓
App.handleButtonClick(componentName)
    ↓
Check: isComponentLoaded?
    ↓
    ├─ Yes → Set activeComponent
    └─ No → Load via ComponentLoader
            ↓
        React.lazy(import())
            ↓
        Cache in loadedComponents
            ↓
        Set activeComponent
            ↓
ComponentContainer.render()
    ↓
Suspense boundary
    ↓
Render Component1/Component2
```

---

## 8. Обработка ошибок

### 8.1 Error Boundary
- Компонент для перехвата ошибок загрузки
- Fallback UI при ошибках
- Логирование ошибок в консоль

### 8.2 Обработка ошибок загрузки
- Проверка существования компонента перед загрузкой
- Обработка network errors при динамическом импорте
- Пользовательское сообщение об ошибке

---

## 9. Оптимизации

### 9.1 Code Splitting
- Автоматический code splitting через React.lazy()
- Каждый компонент - отдельный chunk
- Ленивая загрузка только при необходимости

### 9.2 Кэширование
- Кэширование загруженных компонентов в памяти
- Избежание повторной загрузки уже загруженных компонентов

### 9.3 Производительность
- Минимальный bundle size для начальной загрузки
- Загрузка компонентов только при необходимости
- Оптимизация через Vite

---

## 10. Тестирование (будущее)

### 10.1 Unit тесты
- Тестирование ComponentLoader
- Тестирование логики загрузки компонентов

### 10.2 Integration тесты
- Тестирование взаимодействия компонентов
- Тестирование потока данных

### 10.3 E2E тесты
- Тестирование пользовательского сценария
- Тестирование динамической загрузки

---

## 11. Документация

### 11.1 README.md
- Описание проекта
- Инструкции по установке
- Инструкции по запуску
- Примеры использования

### 11.2 Комментарии в коде
- JSDoc комментарии для всех публичных методов
- Inline комментарии для сложной логики

---

## 12. Следующие шаги

1. ✅ Создание архитектурного плана
2. ⏭️ Переход в PLAN mode для детального планирования
3. ⏭️ Создание структуры проекта
4. ⏭️ Реализация компонентов
5. ⏭️ Тестирование функциональности
6. ⏭️ Документация

---

## Рекомендации по оптимизации токенов

1. **Использовать короткие имена**: Минимизировать длину имен переменных и функций
2. **Избегать дублирования**: Переиспользовать код через утилиты и сервисы
3. **Минимальные комментарии**: Только необходимые комментарии для сложной логики
4. **Типизация через интерфейсы**: Использовать TypeScript интерфейсы вместо длинных inline типов
5. **Компонентная структура**: Разделение на мелкие компоненты для лучшей читаемости и переиспользования
