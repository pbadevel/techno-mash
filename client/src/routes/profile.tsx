import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { auth } from '@/lib/auth'
import { usePageTitle } from '@/hooks/use-page-title'
import { useOnScreen } from '@/hooks/use-on-screen'

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
})

const mockLog = [
  { time: 'Сегодня, 14:22', action: 'Вход в систему' },
  { time: 'Вчера, 10:05', action: 'Добавлена новость «Производство ЖРД для «Ангары»»' },
  { time: '25.08.2026', action: 'Обновлён профиль' },
]

function ProfilePage() {
  usePageTitle('Профиль')
  const navigate = useNavigate()
  const role = auth.getRole()
  const { ref, visible } = useOnScreen<HTMLDivElement>()

  const handleLogout = () => {
    auth.logout()
    navigate({ to: '/' })
  }

  return (
    <div
      ref={ref}
      className={`mx-auto max-w-4xl px-6 pt-40 pb-24 transition-all duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
    >
      <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent">Личный кабинет</p>
      <h1 className="mt-4 text-4xl font-bold uppercase md:text-5xl">Профиль</h1>

      {role === 'guest' ? (
        <div className="mt-12 border border-line bg-panel p-10">
          <p className="text-lg">Вы не авторизованы.</p>
          <Link
            to="/login"
            className="mt-6 inline-block bg-accent px-7 py-3 font-mono text-xs uppercase tracking-[0.25em] text-white transition hover:bg-[#ff8142]"
          >
            Войти
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="border border-line bg-panel p-8">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">Данные</p>
            <dl className="mt-6 space-y-4">
              <div>
                <dt className="text-xs text-muted">Имя</dt>
                <dd className="text-lg">Администратор Техномаша</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Email</dt>
                <dd className="text-lg">admin@tmnpo.ru</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Роль</dt>
                <dd className="text-lg uppercase tracking-wider text-accent">{role}</dd>
              </div>
            </dl>

            <div className="mt-8 flex gap-3">
              {role === 'admin' && (
                <Link
                  to="/admin"
                  className="bg-accent px-5 py-2 font-mono text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#ff8142]"
                >
                  В админку
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="border border-line px-5 py-2 font-mono text-xs uppercase tracking-[0.2em] transition hover:border-accent hover:text-accent"
              >
                Выйти
              </button>
            </div>
          </div>

          <div className="border border-line bg-panel p-8">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">Журнал действий</p>
            <ul className="mt-6 divide-y divide-line">
              {mockLog.map((e, i) => (
                <li key={i} className="flex items-baseline justify-between gap-4 py-3">
                  <span className="text-sm">{e.action}</span>
                  <time className="shrink-0 font-mono text-xs text-muted">{e.time}</time>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}