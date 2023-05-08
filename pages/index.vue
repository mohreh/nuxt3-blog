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

    <section class="p-2 grow">
      <h2 class="pb-0 border-none">Posts</h2>
      <Posts />
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
import { usePostStore } from '~~/store/posts';
import { useUserStore } from '~~/store/user';

definePageMeta({
  layout: 'default',
});

const userStore = useUserStore();
const postStore = usePostStore();
await postStore.fetchAll();
</script>

<style lang="postcss">
section {
  @apply h-full;
}

h3 {
  @apply text-xl font-bold pb-1 mb-2 border-b border-slate-200;

  &:dark {
    @apply border-slate-700;
  }
}

h2 {
  @apply text-2xl font-bold pb-1 mb-2 border-b border-slate-200;

  &:dark {
    @apply border-slate-700;
  }
}

.bordered {
  @apply border border-slate-900/10 rounded-lg;

  &:dark {
    @apply border-slate-50/[0.06];
  }
}

p {
  &:dark {
    @apply text-white text-base;
  }
}
</style>
