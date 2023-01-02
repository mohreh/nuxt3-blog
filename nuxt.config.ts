export default defineNuxtConfig({
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
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: false,
    // config: {},
    injectPosition: 0,
    viewer: true,
  },
  vite: {
    optimizeDeps: {
      include: ['@heroicons/vue/solid', '@heroicons/vue/outline', 'vue'],
    },
  },
});
