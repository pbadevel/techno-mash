import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { newsStore, type NewsItem } from '@/lib/news-store'
import { auth } from '@/lib/auth'

export function NewsList({ admin = false }: { admin?: boolean }) {
  const qc = useQueryClient()
  const { data, isLoading } = useQuery<NewsItem[]>({
    queryKey: ['news'],
    queryFn: () => newsStore.list(),
  })

  const remove = useMutation({
    mutationFn: async (id: string) => newsStore.remove(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ['news'] })
      const prev = qc.getQueryData<NewsItem[]>(['news']) ?? []
      qc.setQueryData(['news'], prev.filter((i) => i.id !== id))
      return { prev }
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.prev) qc.setQueryData(['news'], ctx.prev)
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['news'] }),
  })

  if (isLoading) return <p className="font-mono text-sm text-muted">Загрузка новостей…</p>

  return (
    <ul className="divide-y divide-line border-y border-line">
      {data?.map((n) => (
        <li key={n.id}>
          <div className="group grid gap-2 py-6 md:grid-cols-[160px_1fr_auto] md:items-baseline">
            <time className="font-mono text-xs uppercase tracking-[0.15em] text-muted">{n.date}</time>
            <Link to="/news" className="text-lg font-medium transition group-hover:text-accent">
              {n.title}
            </Link>
            {admin && (
              <button
                onClick={() => remove.mutate(n.id)}
                disabled={remove.isPending}
                className="font-mono text-xs uppercase tracking-[0.15em] text-muted transition hover:text-accent disabled:opacity-50"
              >
                Удалить
              </button>
            )}
          </div>
        </li>
      ))}
      {data?.length === 0 && (
        <li className="py-12 text-center font-mono text-sm text-muted">Новостей пока нет</li>
      )}
    </ul>
  )
}