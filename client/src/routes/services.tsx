// src/routes/services.tsx
import { createFileRoute } from '@tanstack/react-router'
import { usePageTitle } from '@/hooks/use-page-title'

export const Route = createFileRoute('/services')({ component: ServicesPage })
function ServicesPage() {
  usePageTitle('Услуги')
  return (
    <div className="mx-auto max-w-5xl px-6 pt-40 pb-24">
      <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent">Услуги</p>
      <h1 className="mt-4 text-4xl font-bold uppercase md:text-5xl">Услуги</h1>
      <p className="mt-8 max-w-2xl text-lg text-muted">
        Технологический аудит, инженерные расчёты, лаборатория неразрушающего контроля,
        сертификация СМК, метрологическая экспертиза. Раздел в разработке.
      </p>
    </div>
  )
}