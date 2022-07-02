<template>
  <div
    id="navbar"
    class="flex flex-row items-center justify-between w-full py-2"
  >
    <h1 class="text-3xl font-semibold dark:text-sky-100">NuxtBlog</h1>
    <div class="text-md flex flex-row dark:text-sky-100">
      <div class="border-l border-slate-300 my-1 dark:border-slate-700"></div>

      <p
        class="pl-3 py-1 light:text-sky-700 hover:cursor-pointer hover:text-sky-900 dark:text-sky-100 dark:hover:text-sky-300"
      >
        <nuxt-link to="/login"> <LoginIcon class="w-5" /> </nuxt-link>
      </p>

      <dark-theme></dark-theme>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LoginIcon } from '@heroicons/vue/outline';
</script>

<style lang="postcss"></style>
