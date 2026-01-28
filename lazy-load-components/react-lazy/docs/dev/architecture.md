# Архитектура приложения

Краткое описание потоков данных и связей между модулями.

## Схема потока данных

```
[ButtonPanel]  →  onButtonClick / onClearClick  →  [App]
                                                       ↓
                                              ComponentLoader.getInstance()
                                                       ↓
                                              loadComponent(name) / getComponent(name)
                                                       ↓
                                              setComponents([...prev, newComponent])
                                                       ↓
[ErrorBoundary]  →  [ComponentContainer]  →  components.map(comp =>
                                                    <Suspense fallback="Загрузка...">
                                                      <comp.component />
                                                    </Suspense>
                                                 )
```

## Зависимости модулей

| Модуль               | Зависит от                                      |
|----------------------|--------------------------------------------------|
| App.tsx              | ButtonPanel, ComponentContainer, ErrorBoundary, ComponentLoader, types |
| ButtonPanel.tsx      | — (props)                                        |
| ComponentContainer.tsx | Suspense, types                               |
| ErrorBoundary.tsx    | React (Component, ErrorInfo, ReactNode)          |
| ComponentLoader.ts   | React.lazy, types (LoadableComponent)            |
| Component1/2         | React (FC, useState)                             |

## Синглтон ComponentLoader

- Один экземпляр на приложение.
- `componentMap`: имя компонента → фабрика `() => import('...')`.
- `loadedComponents`: Map имени → результат `React.lazy(loader)`.
- При первом вызове `loadComponent(name)` создаётся lazy-компонент и кэшируется; при повторном — возвращается из кэша.

## Границы Suspense и Error Boundary

- **Suspense:** вокруг каждого отображаемого ленивого компонента в `ComponentContainer`; fallback — «Загрузка компонента...».
- **Error Boundary:** оборачивает весь `ComponentContainer` в `App`; перехватывает ошибки загрузки/рендера и показывает сообщение с кнопкой «Попробовать снова».
