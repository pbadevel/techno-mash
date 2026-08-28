import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { Layout } from '@/components/layout/layout'
import { NotFound } from '@/components/not-found/not-found'
import { seo } from '@/lib/seo'
import appCss from '@/styles/index.css?url'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      // WCAG 1.4.4: убираем user-scalable=no — блокировка зума запрещает пользователям масштабировать текст
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      ...seo({ title: 'Роскосмос', description: 'Роскосмос' }),
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
})

function RootComponent() {
  return (
    <RootDocument>
      <Layout>
        <Outlet />
      </Layout>
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru">
      <head>
        <HeadContent />
      </head>
      <body id="root">
        {children}
        <Scripts />
      </body>
    </html>
  )
}