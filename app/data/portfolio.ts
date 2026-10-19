/** Replace null with the final URL when the contact details are ready. */
export const contacts: { label: string; href: string | null }[] = [
  { label: 'telegram', href: null },
  { label: 'linkedin', href: null },
  { label: 'email', href: null },
  { label: 'dribbble', href: null },
  { label: 'instagram', href: null },
  { label: 'hh', href: null },
]

export const resumeUrl: string | null = null

export interface PortfolioCompany {
  name: string
  href: string
  logo: string
  description: string[]
  role: string
}

export const eurasianBank: PortfolioCompany = {
  name: 'Eurasian bank',
  href: 'https://eubank.kz/ru',
  logo: '/images/859-6987-imgImg.svg',
  description: [
    'Раздел «Госуслуги» и «Мои документы» в новом приложении Евразийского банка, разработанные с нуля.',
    'Сервисы: Оплаты штрафа и налога / регистрация брака / покупка госномера / регистрация ип / информация об осмс и другие.',
  ],
  role: 'Спроектировал ключевые сценарии работы продукта и с нуля разработал интерфейс.',
}

export const upcomingCases = [
  { title: 'Мои документы', artwork: 'documents' },
  { title: 'Покупка госномера', artwork: 'plates' },
  { title: 'Регистрация брака', artwork: 'marriage' },
  { title: 'Регистрация ип', artwork: 'business' },
] as const
