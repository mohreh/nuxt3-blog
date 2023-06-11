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
      <p v-if="pending">loading</p>
      <Posts v-else :posts="posts ?? []" />
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
import { PostInterface } from "~/nuxt";
import { useAlertStore } from "~/store/alert";
import { useUserStore } from "~~/store/user";

const { alert } = useAlertStore();
const userStore = useUserStore();

definePageMeta({
  layout: "default",
});

const {
  data: posts,
  error,
  pending,
} = useLazyFetch<PostInterface[]>("/api/posts");

if (error.value) alert(false, error.value.message);
</script>

<style lang="postcss">
section {
  @apply h-full;
}

h3 {
  @apply text-xl font-bold pb-1 mb-2 border-b border-slate-200;
}

h2 {
  @apply text-2xl font-bold pb-1 mb-2 border-b border-slate-200;
}

.bordered {
  @apply border border-slate-900/10 rounded-lg;
}

.dark {
  .bordered {
    @apply border-slate-50/[0.06];
  }

  h3,
  h2 {
    @apply border-slate-700;
  }

  p {
    @apply text-white text-base;
  }
}
</style>
