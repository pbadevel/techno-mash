# Конвенции маршрутов (TanStack Router, file-based)

- `__root.tsx`        — корневой лейаут (шапка/подвал, 404).
- `index.tsx`         — публичная главная `/`.
- `login.tsx`         — страница входа `/login`.
- `_app.tsx`          — pathless-лейаут личного кабинета;
  - `_app.index.tsx`    — дашборд кабинета;
  - `_app.keys.tsx`     — API-ключи;
  - `_app.profile.tsx`  — профиль пользователя.
- `_admin.tsx`        — pathless-лейаут админ-панели;
  - `_admin.index.tsx`  — дашборд администратора;
  - `_admin.servers.tsx`— управление серверами;
  - `_admin.admin/users/$id.tsx` — карточка пользователя.

Дерево маршрутов генерируется автоматически в `src/routeTree.gen.ts`.
