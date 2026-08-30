import { createFileRoute, Link } from '@tanstack/react-router'
import { NewsList } from '@/components/features/news-list'
import { useOnScreen } from '@/hooks/use-on-screen'
import { usePageTitle } from '@/hooks/use-page-title'
import { useEffect, useState } from 'react'
// import satelliteVideo from '@/assets/satellite.mp4'


const directions = [
  { num: '01', to: '/services', title: 'Аудит', text: 'Комплексный аудит предприятий РКП, в том числе зарубежных' },
  { num: '02', to: '/services', title: 'Проектирование', text: 'Инженерные расчёты, цифровые двойники изделий РКТ' },
  { num: '03', to: '/services', title: 'Поставка оборудования', text: 'Лаборатория НК, диагностика станков и механизмов' },
  { num: '04', to: '/products', title: 'Техническое обслуживание', text: 'Специальные станки и оборудование под задачи заказчика' },
  { num: '05', to: '/products', title: 'Аддитивные технологии', text: 'Перспективные технологии и оборудование РКП' },
]

const stats = [
  { value: '1938', label: 'год основания' },
  { value: '88', label: 'лет истории' },
  { value: '500+', label: 'технологий в каталоге' },
  { value: '2500+', label: 'Патентов и изобретений' },
]

export const Route = createFileRoute('/_app/')({ component: HomePage })

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useOnScreen<HTMLDivElement>()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'} ${className}`}
    >
      {children}
    </div>
  )
}

function HomePage() {
  const [reducedMotion, setReducedMotion] = useState(false)
  
  usePageTitle('Главная')
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <>
      <section className="hero-gradient relative overflow-hidden">
        {/* ── Фоновое видео ── */}
        <div className="absolute inset-0 z-0" aria-hidden>
          <video
            src="/satelline.webm"
            autoPlay={!reducedMotion}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* затемнение поверх видео для читаемости текста */}
          <div className="absolute inset-0 bg-space/70 dark:bg-space/50" />
          {/* лёгкий градиент снизу для «посадки» контента */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg to-transparent" />
        </div>

        {/* звёзды и свечение — тоже фон, но ниже видео */}
        <div className="stars absolute inset-0 z-[1]" aria-hidden />
        <div className="glow absolute inset-0 z-[1]" aria-hidden />

        {/* ── Контент поверх всего ── */}
        <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-6 pb-24 pt-36 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <FadeIn>
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent">
                С 1938 года · Роскосмос
              </p>
            </FadeIn>
            <FadeIn delay={100}>
              <h1 className="mt-8 text-4xl font-bold uppercase leading-[1.05] tracking-tight md:text-5xl xl:text-6xl">
                Мы придумали стандарт ракетно-космической отрасли
              </h1>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/90 dark:text-muted">
                АО «НПО «Техномаш» им. С. А. Афанасьева — разработка, производство
                и испытания высокотехнологичных изделий ракетно-космической техники.
              </p>
            </FadeIn>
            <FadeIn delay={300}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/services"
                  className="bg-accent px-7 py-3 font-mono text-xs font-bold uppercase tracking-[0.25em] text-white transition hover:bg-[#ff8142]"
                >
                  Наша деятельность
                </Link>
                <Link
                  to="/about"
                  className="border border-line px-7 py-3 font-mono text-xs uppercase tracking-[0.25em] text-ink transition hover:border-accent hover:text-accent dark:text-ink"
                >
                  О предприятии
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* правая колонка теперь пустая — спутник сам является визуальным якорем */}
          <div aria-hidden />
        </div>
      </section>

      <section className="border-y border-line bg-panel">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-line md:grid-cols-4">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 100}>
              <div className="px-6 py-8">
                <p className="font-mono text-3xl font-bold md:text-4xl">{s.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">{s.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section id="activity" className="mx-auto max-w-6xl px-6 py-24">
        <FadeIn>
          <div className="flex items-end justify-between">
            <h2 className="font-mono text-xs uppercase tracking-[0.4em] text-muted">Наша деятельность</h2>
            <span className="font-mono text-xs text-muted">01 / 05</span>
          </div>
        </FadeIn>

        <ul className="mt-10 border-t border-line">
          {directions.map((d, i) => (
            <li key={d.num}>
              <FadeIn delay={i * 80}>
                <Link
                  to={d.to}
                  className="group grid gap-3 border-b border-line py-8 transition hover:bg-panel md:grid-cols-[80px_1fr_auto] md:items-center"
                >
                  <span className="font-mono text-sm text-muted">{d.num}</span>
                  <span>
                    <span className="block text-2xl font-semibold uppercase tracking-tight transition group-hover:text-accent md:text-3xl">
                      {d.title}
                    </span>
                    <span className="mt-2 block text-sm text-muted">{d.text}</span>
                  </span>
                  <span className="hidden text-2xl text-muted transition group-hover:translate-x-2 group-hover:text-accent md:block">→</span>
                </Link>
              </FadeIn>
            </li>
          ))}
        </ul>
      </section>

      <section id="news" className="border-t border-line bg-panel/50">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <FadeIn>
            <div className="flex items-end justify-between">
              <h2 className="font-mono text-xs uppercase tracking-[0.4em] text-muted">Новости</h2>
              <Link to="/all-news" className="font-mono text-xs uppercase tracking-[0.2em] text-accent hover:underline">
                Больше новостей →
              </Link>
            </div>
          </FadeIn>
          <div className="mt-10">
            <NewsList />
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-6 py-24">
        <FadeIn>
          <div className="grid gap-10 md:grid-cols-[240px_1fr]">
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-muted">О предприятии</p>
            <div>
              <p className="max-w-3xl text-2xl font-semibold leading-snug md:text-3xl">
                Многопрофильное главное предприятие ракетно-космической отрасли — от получения
                заготовок до сборки и функциональных испытаний.
              </p>
              <p className="mt-6 max-w-2xl leading-relaxed text-muted">
                Мы разработали технологическую основу для «Энергии-Буран», ракет-носителей
                «Зенит», «Протон», «Союз», «Ангара» и космических аппаратов различного назначения.
              </p>
              <Link
                to="/about"
                className="mt-10 inline-block border border-accent px-7 py-3 font-mono text-xs uppercase tracking-[0.25em] text-accent transition hover:bg-accent hover:text-white"
              >
                Узнать больше
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  )
}