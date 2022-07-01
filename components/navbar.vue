<template>
  <div
    id="navbar"
    class="flex flex-row items-center justify-between w-full px-2"
  >
    <h1 class="text-3xl font-semibold">NuxtBlog</h1>
    <div class="text-md flex flex-row">
      <p class="px-3 py-1 text-sky-700 hover:cursor-pointer hover:text-sky-900">
        <nuxt-link to=""> login </nuxt-link>
      </p>
      <p
        class="px-3 py-1 bg-sky-700 text-white rounded-lg hover:cursor-pointer hover:bg-sky-900"
      >
        <nuxt-link to=""> sign up </nuxt-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts"></script>

<style lang="postcss">
#navbar {
  @apply py-2;
}
</style>
