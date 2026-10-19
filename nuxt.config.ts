export default defineNuxtConfig({
  compatibilityDate: '2026-10-18',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  nitro: {
    prerender: { routes: ['/'] },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      title: 'Радион — дизайнер интерфейсов',
      meta: [
        { name: 'description', content: 'Проектирую интерфейсы с 2019 года. Портфолио Радиона: финтех, цифровые сервисы и продуманный пользовательский опыт.' },
        { name: 'theme-color', content: '#fbfbfb' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preload', href: '/fonts/caveat.ttf', as: 'font', type: 'font/ttf', crossorigin: 'anonymous' },
      ],
    },
  },
})
