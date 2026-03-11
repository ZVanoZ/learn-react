# About

## Запуск

### Node

```shell
npm run dev
```

### Docker

* DEV

Через `npm`:

```shell
npm run docker:dev
```

Или напрямую:

```shell
docker compose --profile dev up react-lazy-dev
```

После запуска приложение доступно на `http://localhost:6080/`.

* PROD

Сначала собрать билд:

```shell
npm run build
```

Затем поднять прод‑контейнер:

```shell
npm run docker:prod
```

Или напрямую:

```shell
docker compose --profile prod up -d react-lazy-prod
```

После запуска статика из `dist` доступна на `http://localhost:5080/`.
