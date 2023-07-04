<template>
  <Suspense>
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
    <template #fallback> Loading... </template>
  </Suspense>
</template>

<script lang="ts" setup>
import { useUserStore } from "~/store/user";

const userStore = useUserStore();

definePageMeta({
  layout: "default",
});
</script>

<style lang="postcss" scoped>
section {
  @apply h-full;
}
</style>
