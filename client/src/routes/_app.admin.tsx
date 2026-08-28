import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { newsStore } from '@/lib/news-store'
import { auth } from '@/lib/auth'
import { NewsList } from '@/components/features/news-list'
import { usePageTitle } from '@/hooks/use-page-title'
import { useOnScreen } from '@/hooks/use-on-screen'

export const Route = createFileRoute('/_app/admin')({
  component: AdminPage,
  beforeLoad: () => {
    if (auth.getRole() !== 'admin') {
      throw new Error('Доступ только для администраторов')
    }
  },
})

function AdminPage() {
  usePageTitle('Админ-панель')
  const navigate = useNavigate()
  const qc = useQueryClient()
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const { ref, visible } = useOnScreen<HTMLDivElement>()

  const add = useMutation({
    mutationFn: async () => newsStore.add(title, summary),
    onSuccess: () => {
      setTitle('')
      setSummary('')
      qc.invalidateQueries({ queryKey: ['news'] })
    },
  })

  if (auth.getRole() !== 'admin') {
    return (
      <div className="mx-auto max-w-2xl px-6 pt-40 pb-24 text-center">
        <h1 className="text-3xl font-bold">Доступ запрещён</h1>
        <button
          onClick={() => navigate({ to: '/login' })}
          className="mt-6 bg-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white"
        >
          Войти
        </button>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={`mx-auto max-w-5xl px-6 pt-40 pb-24 transition-all duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
    >
      <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent">Администрирование</p>
      <h1 className="mt-4 text-4xl font-bold uppercase md:text-5xl">Управление новостями</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (title.trim()) add.mutate()
        }}
        className="mt-10 border border-line bg-panel p-8"
      >
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">Добавить новость</p>

        <label className="mt-6 block">
          <span className="text-xs uppercase tracking-[0.2em] text-muted">Заголовок *</span>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Например: Запуск нового изделия"
            className="mt-2 w-full border border-line bg-space px-4 py-3 text-ink outline-none transition focus:border-accent"
          />
        </label>

        <label className="mt-4 block">
          <span className="text-xs uppercase tracking-[0.2em] text-muted">Краткое описание</span>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={3}
            className="mt-2 w-full resize-none border border-line bg-space px-4 py-3 text-ink outline-none transition focus:border-accent"
          />
        </label>

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            disabled={add.isPending || !title.trim()}
            className="bg-accent px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.25em] text-white transition hover:bg-[#ff8142] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {add.isPending ? 'Отправка…' : 'Опубликовать'}
          </button>
          <button
            type="button"
            onClick={() => { newsStore.reset(); qc.invalidateQueries({ queryKey: ['news'] }) }}
            className="border border-line px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] transition hover:border-accent hover:text-accent"
          >
            Сбросить к исходным
          </button>
        </div>
      </form>

      <section className="mt-16">
        <div className="flex items-end justify-between">
          <h2 className="font-mono text-xs uppercase tracking-[0.4em] text-muted">Текущие новости</h2>
          <span className="font-mono text-xs text-muted">Режим редактирования</span>
        </div>
        <div className="mt-6">
          <NewsList admin />
        </div>
      </section>
    </div>
  )
}