// src/routes/products.tsx
import { createFileRoute } from '@tanstack/react-router'
import { usePageTitle } from '@/hooks/use-page-title'

export const Route = createFileRoute('/products')({ component: ProductsPage })
function ProductsPage() {
  usePageTitle('Продукция')
  return (
    <div className="mx-auto max-w-5xl px-6 pt-40 pb-24">
      <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent">Каталог</p>
      <h1 className="mt-4 text-4xl font-bold uppercase md:text-5xl">Продукция</h1>
      <p className="mt-8 max-w-2xl text-lg text-muted">
        Специальные станки, намоточное оборудование, установки для пайки и сварки,
        испытательные комплексы. Каталог в разработке.
      </p>
    </div>
  )
}