import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { auth } from '@/lib/auth'
import { useTheme } from '@/hooks/use-theme'
import { useScrolled } from '@/hooks/use-scrolled'
import { cn } from '@/lib/utils'

const nav = [
  { to: '/', label: 'Главная' },
  { to: '/about', label: 'О предприятии' },
  { to: '/products', label: 'Продукция' },
  { to: '/services', label: 'Услуги' },
  { to: '/all-news', label: 'Новости' },
]

export function Layout({ children }: { children: ReactNode }) {
  const role = auth.getRole()
  const { theme, toggle } = useTheme()
  const scrolled = useScrolled(12)


  return (
    <div className="min-h-screen bg-bg text-ink">
      <header
          className={cn(
            'fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md',
            'transition-[background-color,border-color] duration-300',
            scrolled ? 'border-line bg-bg/80' : 'border-transparent bg-bg/50',
          )}
        >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <Link
            to="/"
            className="font-mono text-sm font-bold uppercase tracking-[0.3em] transition hover:text-accent"
          >
            НПО «Техномаш»
          </Link>

          <nav className="hidden items-center gap-6 font-mono text-xs uppercase tracking-[0.2em] text-muted md:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeProps={{ className: 'text-accent' }}
                className="transition hover:text-ink"
              >
                {n.label}
              </Link>
            ))}
            {role === 'admin' && (
              <Link
                to="/admin"
                activeProps={{ className: 'text-accent' }}
                className="transition hover:text-ink"
              >
                Админ
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              aria-label={
                theme === 'dark' ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'
              }
              className="border border-line px-3 py-2 font-mono text-xs uppercase tracking-[0.15em] transition hover:border-accent hover:text-accent"
            >
              {theme === 'dark' ? '☀' : '☾'}
            </button>

            {role === 'guest' ? (
              <Link
                to="/login"
                className="border border-line px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] transition hover:border-accent hover:text-accent"
              >
                Вход
              </Link>
            ) : (
              <Link
                to="/profile"
                className="border border-line px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] transition hover:border-accent hover:text-accent"
              >
                Профиль
              </Link>
            )}
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">Контакты</p>
            <p className="mt-4 text-lg font-semibold">8 (495) 689-50-66</p>
            <p className="mt-1 text-sm text-muted">127018, Москва, 3-й проезд Марьиной Рощи, д. 40</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">Предприятие</p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="transition hover:text-accent">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">Госкорпорация</p>
            <p className="mt-4 text-sm text-muted">Входит в состав Госкорпорации «Роскосмос»</p>
          </div>
        </div>
        <div className="border-t border-line py-6 text-center font-mono text-xs tracking-[0.2em] text-muted">
          © {new Date().getFullYear()} АО «НПО «Техномаш» им. С. А. Афанасьева
        </div>
      </footer>
    </div>
  )
}