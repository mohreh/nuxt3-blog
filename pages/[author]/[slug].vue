<template>
  <div v-if="!pending">
    <div v-html="post?.value.author.avatar"></div>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup lang="ts">
import { usePostStore } from "~~/store/posts";

const route = useRoute();
const { fetchPost } = usePostStore();
const { data: post, pending } = useAsyncData(
  async () =>
    await fetchPost(
      route.params.author as string,
      route.params.slug as string,
    ),
  {
    lazy: true,
  },
);
</script>
