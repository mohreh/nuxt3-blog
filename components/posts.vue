<template>
  <div>
    <div v-for="post in posts" :key="post.id" class="post bordered">
      <div class="flex flex-row gap-5 pb-2">
        <p class="text-slate-600 small dark:text-slate-500">
          {{ new Date(post.createdAt).toDateString() }}
        </p>
        <p class="text-blue-600 dark:text-blue-300 small">
          {{ post.author.username }}
        </p>
      </div>
      <h3 class="post-title">{{ post.title }}</h3>
      <div>
        <div class="post-text" v-html="post.text"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePostStore } from '~~/store/posts';

const postStore = usePostStore();

const { posts } = storeToRefs(postStore);
</script>

<style lang="postcss">
.post-title {
  @apply dark:text-white text-xl font-bold border-none p-0 m-0;
}

.post {
  @apply my-3 dark:border-slate-700 p-3;
}

.small {
  @apply text-xs;
}

.post-text > *:not(:first-child) {
  @apply hidden;
}

.post-text > p:first-child:after {
  @apply text-slate-500 dark:text-slate-600;
  content: ' click title to read more...';
}
</style>
