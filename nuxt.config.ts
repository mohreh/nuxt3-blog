export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@formkit/nuxt",
    "@pinia/nuxt",
    "nuxt-icon",
    "nuxt-icons",
  ],

  build: {
    transpile: [],
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
    exposeConfig: false,
    // config: {},
    injectPosition: 0,
    viewer: true,
  },
  vite: {
    optimizeDeps: {
      include: ["vue"],
    },
  },
});
