import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { newsStore } from '@/lib/news-store'
import { useOnScreen } from '@/hooks/use-on-screen'
import { usePageTitle } from '@/hooks/use-page-title'

export const Route = createFileRoute('/news/$id')({
  // Лоадер сработает ДО рендера: нет новости — сразу route-level 404
  loader: ({ params }) => {
    const item = newsStore.list().find((n) => n.id === params.id)
    if (!item) throw notFound()
    return item
  },
  component: NewsDetailPage,
  notFoundComponent: NewsNotFound,
})

function NewsNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-40 pb-24">
      <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent">404</p>
      <h1 className="mt-4 text-3xl font-bold uppercase md:text-4xl">Новость не найдена</h1>
      <p className="mt-4 text-muted">Возможно, она была удалена или ещё не опубликована.</p>
      <Link
        to="/all-news"
        className="mt-8 inline-block border border-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] text-accent transition hover:bg-accent hover:text-white"
      >
        ← Все новости
      </Link>
    </div>
  )
}

function NewsDetailPage() {
  const item = Route.useLoaderData()
  usePageTitle(item.title)
  const { ref, visible } = useOnScreen<HTMLElement>()

  const others = newsStore.list().filter((n) => n.id !== item.id).slice(0, 2)

  return (
    <article
      ref={ref}
      className={`mx-auto max-w-3xl px-6 pt-40 pb-24 transition-all duration-700 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <Link
        to="/all-news"
        className="font-mono text-xs uppercase tracking-[0.2em] text-muted transition hover:text-accent"
      >
        ← Все новости
      </Link>

      <time className="mt-10 block font-mono text-xs uppercase tracking-[0.2em] text-accent">
        {item.date}
      </time>
      <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">{item.title}</h1>

      {item.summary && (
        <p className="mt-6 border-l-2 border-accent pl-6 text-lg text-muted">{item.summary}</p>
      )}


      {others.length > 0 && (
        <aside className="mt-16 border-t border-line pt-8">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-muted">Другие новости</p>
          <ul className="mt-4 divide-y divide-line">
            {others.map((n) => (
              <li key={n.id}>
                <Link
                  to="/news/$id"
                  params={{ id: n.id }}
                  className="group flex items-baseline gap-6 py-4"
                >
                  <time className="shrink-0 font-mono text-xs text-muted">{n.date}</time>
                  <span className="font-medium transition group-hover:text-accent">{n.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </article>
  )
}