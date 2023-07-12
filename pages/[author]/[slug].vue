<template>
  <div v-if="!pending" class="grid grid-cols-3 my-4">
    <div class="overflow-hidden col-start-1 col-end-3 bordered">
      <img
        v-if="post?.coverImage"
        :src="post?.coverImage"
        class="object-cover w-full h-96"
      />
      <div class="flex flex-col py-8 px-12">
        <div class="flex flex-row gap-4 items-center">
          <div class="w-10 h-10" v-html="post?.author.avatar"></div>
          <div class="flex flex-col">
            <span class="font-bold">{{ post?.author.username }}</span>
            <span class="text-sm text-gray-600 dark:text-gray-300">
              {{ new Date(post?.createdAt as string).toDateString() }}
            </span>
          </div>
        </div>

        <h1>{{ post?.title }}</h1>

        <div class="flex flex-row gap-2">
          <div
            v-for="tag in post?.tags"
            :key="tag.name"
            class="flex flex-row my-2"
          >
            <span class="text-gray-400 dark:text-gray-600">#</span>
            <span>{{ tag.name }}</span>
          </div>
        </div>

        <div class="mt-4 prose" v-html="post?.text"></div>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup lang="ts">
import { PostInterface } from "~/nuxt";

const route = useRoute();
const { data: post, pending } = useLazyAsyncData(
  `/api/users/${route.params.author}/${route.params.slug}`,
  async () =>
    await $fetch<PostInterface>(
      `/api/users/${route.params.author}/${route.params.slug}`,
    ),
);
</script>

<style lang="postcss" scoped>
h1 {
  @apply text-5xl mt-10 mb-6;
}

.prose {
  @apply outline-none text-slate-900 text-lg tracking-wider font-medium leading-relaxed border-none;

  p {
    @apply text-lg;
  }

  h2 {
    @apply font-bold text-4xl;
  }

  h3 {
    @apply font-bold text-3xl;
  }

  h4 {
    @apply font-bold text-2xl;
  }

  ul {
    @apply list-disc;
  }

  ol {
    @apply list-decimal;
  }

  ul,
  ol {
    @apply list-inside;

    li {
      p {
        @apply inline;
      }
    }
  }

  pre {
    @apply bg-slate-300/50 px-4 py-5 rounded-lg text-base;

    code {
      @apply bg-inherit p-0;
    }
  }

  blockquote {
    @apply px-4 mx-7 my-4 border-l-4 border-sky-800/10;
  }

  code {
    @apply bg-black/10 p-1 text-base rounded;
  }

  hr {
    @apply content-none m-7 border-t-0 border-b-2 border-slate-900/10;
  }
}

.dark {
  .prose {
    @apply text-sky-100;

    pre {
      @apply bg-black/40;
    }

    hr {
      @apply border-sky-100/10;
    }
  }
}
</style>
