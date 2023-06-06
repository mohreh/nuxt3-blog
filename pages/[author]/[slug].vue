<template>
  <!-- <div v-if="post"> -->
  <div v-html="post.author.avatar"></div>
  <!-- </div> -->
</template>
<script setup lang="ts">
import { usePostStore } from "~~/store/posts";

const route = useRoute();
const { fetchPost } = usePostStore();

const post = await fetchPost(
  route.params.author as string,
  route.params.slug as string,
);
</script>
