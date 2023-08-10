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

        <div>
          <a
            href="https://www.github.com/mohreh/nuxt3-blog"
            class="flex gap-2 items-end"
          >
            <Icon name="codicon:github-inverted" />
            <b>Link To Source Code</b>
          </a>
        </div>
      </section>

      <section class="p-2 grow">
        <h2 class="pb-0 border-none">Posts</h2>
        <Posts :posts="posts" />
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
import { PostInterface } from "nuxt";
import { useAlertStore } from "~/store/alert";
import { useUserStore } from "~/store/user";

const userStore = useUserStore();
const { alert } = useAlertStore();

definePageMeta({
  layout: "default",
});

const { data: posts, error } = useLazyAsyncData("/api/posts", () =>
  $fetch<PostInterface[]>("/api/posts"),
);

if (error.value) alert(false, error.value.message);
</script>

<style lang="postcss" scoped>
section {
  @apply h-full;
}
</style>
