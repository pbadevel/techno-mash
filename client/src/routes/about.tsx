// src/routes/about.tsx
import { createFileRoute } from '@tanstack/react-router'
import { usePageTitle } from '@/hooks/use-page-title'

export const Route = createFileRoute('/about')({ component: AboutPage })
function AboutPage() {
  usePageTitle('О предприятии')
  return (
    <div className="mx-auto max-w-5xl px-6 pt-40 pb-24">
      <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent">О предприятии</p>
      <h1 className="mt-4 text-4xl font-bold uppercase md:text-5xl">АО «НПО «Техномаш» им. С. А. Афанасьева</h1>
      <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted">
        Главное научно-исследовательское предприятие Госкорпорации «Роскосмос» по
        технологическому обеспечению создания ракетно-космической техники. Основано в 1938 году.
      </p>
    </div>
  )
}