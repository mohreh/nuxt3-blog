<template>
  <div class="text-slate-700 dark:text-slate-300/90">
    <h3 class="text-xl font-bold">Weolcom to nuxtblog!</h3>
    <p>start writing about your favorate topics and share ideas.</p>
    <nuxt-link to="/login-register" class="group link max-w-fit">
      <p class="font-semibold">create account</p>
      <ChevronRightIcon class="w-4 mt-1 group-hover:ml-1" />
    </nuxt-link>
  </div>
</template>

<script lang="ts" setup>
import { ChevronRightIcon } from '@heroicons/vue/outline';
</script>

<style lang="postcss" scoped>
.link {
  @apply flex flex-row items-center hover:text-slate-900 hover:dark:text-slate-200;
}
</style>
