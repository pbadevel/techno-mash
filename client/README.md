# TMNPO Client

Клиент нового сайта АО «НПО «Техномаш» (замена взломанного Drupal 7).

- **Vite** — сборка и dev-сервер (мгновенный HMR).
- **TanStack Router** — file-based маршруты в `src/routes/`.
- **TanStack Query** — кэш и серверное состояние.

## Команды
```bash
bun install     # или npm install
bun run dev     # dev-сервер :3000 (заодно перегенерирует routeTree.gen.ts)
bun run build   # продакшен-сборка
bun run lint    # eslint
bun run format  # prettier
```
