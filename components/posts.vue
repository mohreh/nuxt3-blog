<template>
  <div>
    <div
      v-for="post in posts"
      :key="post.id"
      class="flex flex-row gap-3 post bordered"
    >
      <div class="w-10 h-10" v-html="post.author.avatar" />
      <div>
        <div class="flex flex-col pb-2">
          <nuxt-link :to="'/user-' + post.author.username">
            <p class="text-blue-600 dark:text-blue-300 small">
              {{ post.author.username }}
            </p>
          </nuxt-link>
          <p class="text-slate-600 small dark:text-slate-500">
            {{ new Date(post.createdAt).toDateString() }}
          </p>
        </div>
        <nuxt-link
          :to="
            '/user-' +
            post.author.username +
            '/post-' +
            post.title.split(' ').join('_')
          "
        >
          <h3 class="post-title">{{ post.title }}</h3>
        </nuxt-link>
        <div>
          <div class="post-text" v-html="post.text"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePostStore } from "~~/store/posts";

const postStore = usePostStore();

const { posts } = storeToRefs(postStore);
</script>

<style lang="postcss">
.post-title {
  @apply text-xl font-bold border-none p-0 m-0 inline cursor-pointer;

  &:hover {
    @apply text-blue-600;
  }
}

.post {
  @apply my-3 p-3 border;
}

.small {
  @apply text-sm;
}

.post-text > *:not(:first-child) {
  @apply hidden;
}

.post-text > p:first-child:after {
  @apply text-slate-500;

  content: " click title to read more...";
}

.dark {
  .post-title {
    &:hover {
      @apply text-blue-300;
    }
  }

  .small {
    @apply text-sm;
  }

  .post {
    @apply border-slate-700;
  }

  .post-text > p:first-child:after {
    @apply text-slate-600;
  }
}
</style>
