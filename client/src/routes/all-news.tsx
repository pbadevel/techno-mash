// src/routes/news.tsx
import { createFileRoute } from '@tanstack/react-router'
import { NewsList } from '@/components/features/news-list'
import { usePageTitle } from '@/hooks/use-page-title'

export const Route = createFileRoute('/all-news')({ component: NewsPage })
function NewsPage() {
  usePageTitle('Новости')
  return (
    <div className="mx-auto max-w-5xl px-6 pt-40 pb-24">
      <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent">Архив</p>
      <h1 className="mt-4 text-4xl font-bold uppercase md:text-5xl">Все новости</h1>
      <div className="mt-12"><NewsList /></div>
    </div>
  )
}