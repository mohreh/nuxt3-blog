<template>
  <div class="px-5 h-fit">
    <div class="flex gap-3 items-center flox-row">
      <div class="w-8 h-8" v-html="author?.avatar" />

      <nuxt-link :to="'/' + author?.username">
        <h3>{{ author?.username }}</h3>
      </nuxt-link>
      <button
        class="flex-grow py-2 ml-8 bg-blue-500 rounded"
        @click="followAuthor"
      >
        Follow
      </button>
    </div>
    <div v-if="!pending" class="flex flex-col gap-6 p-5 my-5 bordered">
      <h2 class="m-0">Latest Posts Of {{ author?.username }}</h2>
      <div
        v-for="post in author?.posts.filter(
      (post) => post.slug !== route.params.slug,
    ) as PostInterface[]"
        :key="post.id"
        class=""
      >
        <p class="text-sm text-slate-600 dark:text-slate-500">
          {{ new Date(post.createdAt).toDateString() }}
        </p>
        <nuxt-link :to="post.slug">
          <h3>{{ post.title }}</h3>
        </nuxt-link>

        <div>
          <div class="flex flex-row gap-3">
            <div v-for="tag in post.tags" :key="tag.name">
              <nuxt-link
                :to="'/topics/' + tag.name"
                class="flex flex-row gap-px-4"
              >
                <span class="text-slate-400 dark:text-slate-500">#</span>
                <p>{{ tag.name }}</p>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PostInterface, Author } from "nuxt";

const route = useRoute();

const { data: author, pending } = await useAsyncData(
  `/api/users/${route.params.author}`,
  async () => {
    return await $fetch<Author>(`/api/users/${route.params.author}`, {
      query: {
        take: 8,
      },
    });
  },
);

const followAuthor = () => {
  console.log("follow");
};
</script>

<style lang="postcss" scoped>
h3 {
  @apply border-none pb-0 mb-0;
}
</style>
