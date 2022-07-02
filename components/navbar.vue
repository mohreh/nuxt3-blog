<template>
  <div
    id="navbar"
    class="flex flex-row items-center justify-between w-full py-2"
  >
    <h1 class="text-3xl font-semibold dark:text-sky-100">NuxtBlog</h1>
    <div class="text-md flex flex-row dark:text-sky-100">
      <p
        class="px-3 py-1 light:text-sky-700 hover:cursor-pointer hover:text-sky-900 dark:text-sky-100 dark:hover:text-sky-300"
      >
        <nuxt-link to=""> login </nuxt-link>
      </p>
      <p
        class="px-3 py-1 bg-sky-700 text-white rounded-lg hover:cursor-pointer hover:bg-sky-900 dark:bg-sky-700 dark:hover:bg-sky-800"
      >
        <nuxt-link to=""> sign up </nuxt-link>
      </p>

      <div
        class="border-l border-slate-300 mb-1 mt-2 mx-3 dark:border-slate-700"
      ></div>

      <dark-theme></dark-theme>
    </div>
  </div>
</template>

<style lang="postcss"></style>
