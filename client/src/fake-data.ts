// Временные данные для разработки UI (до подключения реального API)
export type User = { id: string; name: string; role: string; email: string }
export type Server = { id: string; host: string; region: string; status: 'online' | 'offline' }
export type ApiKey = { id: string; label: string; scope: string; createdAt: string }

export const fakeUsers: User[] = [
  { id: 'u-01', name: 'Администратор', role: 'admin', email: 'admin@tmnpo.ru' },
  { id: 'u-02', name: 'Редактор Вестника', role: 'editor', email: 'vestnik@tmnpo.ru' },
]

export const fakeServers: Server[] = [
  { id: 's-01', host: 'web-01.tmnpo.ru', region: 'MSK', status: 'online' },
  { id: 's-02', host: 'db-01.tmnpo.ru', region: 'MSK', status: 'online' },
]

export const fakeKeys: ApiKey[] = [
  { id: 'k-01', label: 'frontend-prod', scope: 'read', createdAt: '2026-01-12' },
]
