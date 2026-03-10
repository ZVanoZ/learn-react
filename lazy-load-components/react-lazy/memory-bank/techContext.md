# Memory Bank: Tech Context

## Technology Stack
- **Runtime**: Node.js (LTS)
- **Package Manager**: npm
- **Frontend Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3 (strict mode)
- **Build Tool**: Vite 7.2.4
- **Module System**: ES Modules (`\"type\": \"module\"` в `package.json`)

## Project Structure (ключевые файлы)
- `src/components/App.tsx` — корневой компонент, управляет списком динамических компонентов
- `src/components/ButtonPanel.tsx` — панель с кнопками `button-1`, `button-2`, `clear`
- `src/components/ComponentContainer.tsx` — рендер списка компонентов + `Suspense` для каждого
- `src/components/ErrorBoundary.tsx` — Error Boundary для обработки ошибок загрузки/рендера
- `src/components/Component1/Component1.tsx` — демонстрационный компонент 1
- `src/components/Component2/Component2.tsx` — демонстрационный компонент 2
- `src/services/ComponentLoader.ts` — синглтон, отвечающий за ленивую загрузку и кэширование компонентов
- `src/types/index.ts` — типы `LoadableComponent`, `ComponentInstance`, `ComponentLoaderConfig`

## Development Environment
- **OS**: Linux (актуальная версия ядра по рабочему окружению)
- **Shell**: bash
- **Path Separator**: `/`

## Documentation Links
- Детальная инструкция и архитектура: `memory-bank/docs/dev/README.md`, `memory-bank/docs/dev/architecture.md`
- Общий регламент работы с микропроектами и режимами VAN/PLAN/BUILD/ARCHIVE: `../../../memory-bank/docs/microprojects-workflow.md` (когда будет создан)

