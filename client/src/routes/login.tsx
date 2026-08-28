import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { auth, type Role } from '@/lib/auth'
import { usePageTitle } from '@/hooks/use-page-title'
import { useOnScreen } from '@/hooks/use-on-screen'

export const Route = createFileRoute('/login')({ component: LoginPage })

function LoginPage() {
  usePageTitle('Вход')
  const navigate = useNavigate()
  const { ref, visible } = useOnScreen<HTMLDivElement>()

  const submit = (role: Role) => (e: React.FormEvent) => {
    e.preventDefault()
    auth.login(role)
    navigate({ to: '/profile' })
  }

  return (
    <div
      ref={ref}
      className={`mx-auto max-w-md px-6 pt-40 pb-24 transition-all duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
    >
      <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent">Авторизация</p>
      <h1 className="mt-4 text-4xl font-bold uppercase md:text-5xl">Вход для сотрудников</h1>
      <p className="mt-4 text-muted">Все действия фиксируются в журнале безопасности.</p>

      <form className="mt-10 border border-line bg-panel p-8" onSubmit={submit('editor')}>
        <label className="block">
          <span className="text-xs uppercase tracking-[0.2em] text-muted">Email</span>
          <input
            type="email"
            defaultValue="admin@tmnpo.ru"
            className="mt-2 w-full border border-line bg-space px-4 py-3 text-ink outline-none transition focus:border-accent"
          />
        </label>
        <label className="mt-4 block">
          <span className="text-xs uppercase tracking-[0.2em] text-muted">Пароль</span>
          <input
            type="password"
            defaultValue="demo"
            className="mt-2 w-full border border-line bg-space px-4 py-3 text-ink outline-none transition focus:border-accent"
          />
        </label>

        <div className="mt-8 grid gap-3">
          <button
            type="submit"
            className="bg-accent px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.25em] text-white transition hover:bg-[#ff8142]"
          >
            Войти как редактор
          </button>
          <button
            type="button"
            onClick={submit('admin')}
            className="border border-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] text-accent transition hover:bg-accent hover:text-white"
          >
            Войти как админ
          </button>
        </div>
      </form>
    </div>
  )
}