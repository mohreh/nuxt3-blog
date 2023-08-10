<template>
  <div v-if="!pending" class="flex flex-row gap-5">
    <div class="basis-2/3">
      <h2 class="mt-4 border-none">
        Latest Posts of {{ author?.username }}
      </h2>
      <div>
        <posts
          :posts="author?.posts.map(post => ({ ...post, author })) as PostInterface[]"
        />
      </div>
    </div>
    <div v-if="!loadingTags" class="p-5 mt-5 basis-1/3 bordered h-fit">
      <h3>Tags {{ author?.username }} write about</h3>

      <div class="gap-3">
        <div v-for="tag in tags" :key="tag" class="inline-block">
          <nuxt-link
            :to="'/topics/' + tag"
            class="flex flex-row mx-1 gap-px-4"
          >
            <span class="text-slate-400 dark:text-slate-500">#</span>
            <p>{{ tag }}</p>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup lang="ts">
import { Author, PostInterface } from "nuxt";

const route = useRoute();

const { data: author, pending } = useLazyAsyncData(
  `/api/users/${route.params.author}`,
  async () =>
    await $fetch<Author>(`/api/users/${route.params.author}`, {
      query: {
        take: 7,
        page: 1,
      },
    }),
);

const { data: tags, pending: loadingTags } = useLazyAsyncData(
  `/api/users/${route.params.author}/tags`,
  async () =>
    await $fetch<string[]>(`/api/users/${route.params.author}/tags`),
);
</script>
