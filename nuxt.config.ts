// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: './stick.png' },
      ],
      title: 'IMG2Stick', // Default title
    }
  }
})