import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  meta: {
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { type: 'text/css', href: '/assests/css/tailwindcss.css' },
    ],
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@formkit/nuxt',
    '@pinia/nuxt',
    'nuxt-icons',
  ],
  build: {
    transpile: ['@heroicons/vue'],
  },
  vite: {
    optimizeDeps: {
      include: ['@heroicons/vue/solid', '@heroicons/vue/outline', 'vue'],
    },
  },
});
