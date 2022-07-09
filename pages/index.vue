<template>
  <div class="flex flex-row space-x-4 h-full mt-5">
    <section class="flex-none w-64 space-y-4">
      <welcome v-if="!userStore.username" />

      <div class="bordered p-2">
        <h3>Famous Communities</h3>
      </div>

      <div class="bordered p-2">
        <h3>Footer stuff</h3>
      </div>
    </section>

    <section class="bordered grow">
      <h3>Posts</h3>
    </section>

    <section class="flex-none w-64 space-y-4">
      <div class="bordered p-2">
        <h3>Top writers</h3>
      </div>

      <div class="bordered p-2">
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
