<template>
  <div class="flex flex-row mt-5 space-x-4 h-full">
    <section class="flex-none space-y-4 w-64">
      <ClientOnly>
        <user-welcome v-if="!userStore.username" />
      </ClientOnly>

      <div class="p-2 bordered">
        <h3>Famous Topics</h3>
      </div>

      <div class="p-2 bordered">
        <h3>Footer stuff</h3>
      </div>
    </section>

    <section class="bordered grow">
      <h3>Posts</h3>
    </section>

    <section class="flex-none space-y-4 w-64">
      <div class="p-2 bordered">
        <h3>Top writers</h3>
      </div>

      <div class="p-2 bordered">
        <h3>Trends</h3>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '~~/store/user';

definePageMeta({
  layout: 'default',
});

const userStore = useUserStore();
</script>

<style lang="postcss">
section {
  @apply h-full;
}

h3 {
  @apply dark:text-white text-xl font-bold;
}

.bordered {
  @apply border border-slate-900/10 dark:border-slate-50/[0.06] rounded-lg;
}
</style>
