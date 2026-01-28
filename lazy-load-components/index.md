# "lazy-load-components"

Исследуем возможность ленивой загрузки компонент.

---

Нужно создать модульное приложение, где модули являются подгружаемыми компонентами.

Например:
```text
На виртуальном рабочем столе несколько иконок. 
При нажатии на иконку, скацивается связанный с ней компонент модуля.
Затем создается экземпляр этого компонента и вставляется в рабочую область.
```

## Ссылки

Внутренние.
* [dev](react-lazy/docs/dev)

## Варианты для реализации

См. [creative-analysis.md](react-lazy/memory-bank/creative/creative-analysis.md)
* React.lazy()
* Динамический import() без React.lazy()
* @loadable/component
* ~~React Loadable (устаревший)~~
* Ручной code splitting через Vite
* Module Federation (Webpack 5)
