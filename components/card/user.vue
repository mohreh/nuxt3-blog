<template>
  <div class="px-5 h-fit">
    <div class="flex gap-3 items-center flox-row">
      <div class="w-8 h-8" v-html="user.avatar" />
      <h3>{{ user.username }}</h3>
      <button class="flex-grow py-2 ml-5 bg-blue-500 rounded">
        Follow
      </button>
    </div>
    <div v-if="!pending" class="p-5 my-5 bordered">
      <h2>Latest Posts Of {{ user.username }}</h2>
      <div
        v-for="post in posts?.filter(
      (post) => post.slug !== props.currentPostSlug,
    ) as PostInterface[]"
        :key="post.id"
        class="my-5"
      >
        <p class="text-sm text-slate-600 dark:text-slate-500">
          {{ new Date(post.createdAt).toDateString() }}
        </p>
        <nuxt-link :to="post.slug">
          <h3>{{ post.title }}</h3>
        </nuxt-link>

        <div>
          <div class="flex flex-row gap-3">
            <div
              v-for="tag in post.tags"
              :key="tag.name"
              class="flex flex-row gap-px-4"
            >
              <span class="text-slate-400 dark:text-slate-500">#</span>
              <p>{{ tag.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PostInterface, Author } from "nuxt";

const props = defineProps<{
  user: Author;
  currentPostSlug: string;
}>();

const route = useRoute();

let { data: posts, pending } = await useAsyncData(
  `/api/users/${route.params.author}/posts`,
  async () => {
    return await $fetch<PostInterface[]>(
      `/api/users/${route.params.author}/posts`,
    );
  },
);

watch(
  pending,
  (_) => {
    posts.value = posts.value?.filter(
      (post) => post.slug !== props.currentPostSlug,
    ) as PostInterface[];
  },
  {
    immediate: true,
  },
);
</script>

<style lang="postcss" scoped>
h3 {
  @apply border-none pb-0 mb-0;
}
</style>
