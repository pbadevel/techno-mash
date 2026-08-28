export type NewsItem = {
  id: string
  date: string
  title: string
  summary?: string
  body?: string
  createdAt: number
}

const KEY = 'tmnpo:news:v2' // ← bump версии при изменении формы данных

const SEED: NewsItem[] = [
  {
    id: 'n1',
    date: '05.02.2025',
    title: 'Открыто производство ЖРД для ракет-носителей «Ангара»',
    summary: 'Современная производственная площадка запущена на предприятии «Протон-ПМ» в Перми.',
    body: 'Госкорпорация «Роскосмос» запустила производственную площадку для выпуска жидкостных ракетных двигателей семейства РД-191.\nПлощадка оснащена специальным станочным оборудованием, разработанным при участии специалистов НПО «Техномаш».',
    createdAt: Date.now() - 86400000 * 30,
  },
  {
    id: 'n2',
    date: '30.10.2024',
    title: 'Второй радиолокационный спутник «Кондор-ФКА» выведен на орбиту',
    summary: 'Аппарат предназначен для дистанционного зондирования Земли.',
    body: 'С космодрома успешно выполнен пуск ракеты-носителя с радиолокационным спутником «Кондор-ФКА».\nАппарат обеспечит круглосуточное наблюдение поверхности Земли в любых метеоусловиях.',
    createdAt: Date.now() - 86400000 * 120,
  },
  {
    id: 'n3',
    date: '11.04.2024',
    title: 'С космодрома Восточный успешно стартовала «Ангара-А5»',
    createdAt: Date.now() - 86400000 * 200,
  },
]

// read / write / newsStore — без изменений (list, add, remove, reset)

function read(): NewsItem[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(SEED))
      return SEED
    }
    return JSON.parse(raw) as NewsItem[]
  } catch {
    return SEED
  }
}

function write(items: NewsItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items))
}

export const newsStore = {
  list: read,
  add: (title: string, summary = ''): NewsItem => {
    const items = read()
    const item: NewsItem = {
      id: `n${Date.now()}`,
      date: new Date().toLocaleDateString('ru-RU'),
      title,
      summary,
      createdAt: Date.now(),
    }
    write([item, ...items])
    return item
  },
  remove: (id: string) => {
    const items = read().filter((i) => i.id !== id)
    write(items)
  },
  reset: () => write(SEED),
}