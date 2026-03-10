# Диагностика: Docker «context deadline exceeded» при pull с registry-1.docker.io

## Симптом

При запуске `docker compose --profile dev up react-lazy-prod` или `docker pull nginx:1.26-alpine`:

```
Error response from daemon: Get "https://registry-1.docker.io/v2/": context deadline exceeded
```

## Проведённая проверка

| Проверка | Результат |
|----------|------------|
| `curl https://registry-1.docker.io/v2/` с хоста | **Успех** (401 за ~0.5 с) |
| `docker pull nginx:1.26-alpine` | **Таймаут** (context deadline exceeded) |
| DNS: `getent hosts registry-1.docker.io` | Разрешается, несколько A-записей |
| IPv4: `curl -4 https://registry-1.docker.io/v2/` | **Успех** (401) |
| IPv6: `curl -6 https://registry-1.docker.io/v2/` | **Неудача** (соединение не установлено) |
| IPv6 маршрут: `ip -6 route get 2001:4860:4860::8888` | **Network is unreachable** |
| `/etc/docker/daemon.json` | Отсутствует |
| Прокси в окружении (HTTP_PROXY/HTTPS_PROXY) | Не заданы |

## Вывод: причина ошибки

**Docker пытается использовать IPv6 для обращения к Docker Hub, тогда как в текущей сети IPv6 недоступен** (ядро сообщает «Network is unreachable»). Клиент/демон ждёт установки соединения по IPv6, не получает его в срок и возвращает «context deadline exceeded». С хоста запрос по IPv4 (curl -4) проходит нормально.

Итог: проблема не в отсутствии интернета и не в DNS, а в том, что **сеть не поддерживает IPv6**, а Docker по умолчанию может пытаться использовать IPv6 при обращении к реестру.

## Рекомендуемое решение

Принудительно отключить использование IPv6 в Docker, чтобы весь трафик к реестру шёл по IPv4.

1. Создать или отредактировать `/etc/docker/daemon.json` (требуются права root):

   ```json
   {
     "ipv6": false
   }
   ```

   Если файл уже существует, добавить в него только ключ `"ipv6": false`, сохранив остальные параметры.

2. Перезапустить демон Docker:

   ```bash
   sudo systemctl restart docker
   ```

3. Повторить загрузку образа или запуск Compose:

   ```bash
   docker pull nginx:1.26-alpine
   # или
   docker compose --profile dev up react-lazy-prod
   ```

В репозитории лежит пример конфига: `docs/dev/docker-daemon-ipv4.example.json`. Его можно скопировать в `/etc/docker/daemon.json` с помощью sudo.

## Альтернативы (если отключать IPv6 нежелательно)

- **Настроить рабочую IPv6-сеть** (маршруты, шлюз, DNS), чтобы до `registry-1.docker.io` был доступ по IPv6.
- **Указать в системе приоритет IPv4** (например, через `gai.conf` или настройки резолвера), чтобы первыми использовались A-записи, а не AAAA — это может уменьшить попытки соединения по IPv6 со стороны Docker (поведение зависит от окружения).

Для быстрого устранения ошибки предпочтительно решение с `"ipv6": false` в `daemon.json`.
