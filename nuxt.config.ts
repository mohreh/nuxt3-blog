export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@formkit/nuxt",
    "@pinia/nuxt",
    "nuxt-icon",
    "nuxt-icons",
    "@nuxtjs/supabase",
    "nuxt-lazy-load",
  ],

  build: {
    transpile: [],
  },

  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },

  vite: {
    optimizeDeps: {
      include: ["vue"],
    },
  },
});
