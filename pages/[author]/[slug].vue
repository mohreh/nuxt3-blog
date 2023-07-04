<template>
  <div v-if="!pending">
    {{ post }}
  </div>
  <div v-else>Loading...</div>
</template>

<script setup lang="ts">
import { PostInterface } from "~/nuxt";

const route = useRoute();
const { data: post, pending } = useAsyncData(
  async () =>
    await $fetch<PostInterface>(
      `/api/users/${route.params.author}/${route.params.slug}`,
    ),
  {
    lazy: true,
  },
);
</script>
