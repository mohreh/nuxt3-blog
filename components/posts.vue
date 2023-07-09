<template>
  <div>
    <div
      v-for="post in posts"
      :key="post.id"
      class="flex overflow-hidden flex-col gap-3 my-4 rounded-lg bordered"
    >
      <img
        v-if="post.coverImage"
        :src="post.coverImage"
        class="object-cover h-80"
      />
      <div class="flex flex-row gap-4 p-3 post">
        <div class="w-10 h-10" v-html="post.author.avatar" />
        <div class="w-full">
          <div class="flex flex-col pb-2">
            <nuxt-link :to="post.author.username">
              <p class="text-blue-600 dark:text-blue-300 small">
                {{ post.author.username }}
              </p>
            </nuxt-link>
            <p class="text-slate-600 small dark:text-slate-500">
              {{ new Date(post.createdAt).toDateString() }}
            </p>
          </div>
          <nuxt-link :to="post.author.username + '/' + post.slug">
            <h2 class="post-title">{{ post.title }}</h2>
          </nuxt-link>
          <ClientOnly>
            <div>
              <div class="flex flex-row gap-3 mt-4">
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
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PostInterface } from "~/nuxt";
import { useAlertStore } from "~/store/alert";

const { alert } = useAlertStore();

const { data: posts, error } = await useFetch<PostInterface[]>(
  "/api/posts",
);

if (error.value) alert(false, error.value.message);
</script>

<style lang="postcss" scoped>
.post-title {
  @apply text-2xl font-bold border-none p-0 m-0 inline cursor-pointer;

  &:hover {
    @apply text-blue-600;
  }
}

.small {
  @apply text-sm;
}

/* .post-text > *:not(:first-child) {
  @apply hidden;
}

.post-text > p:first-child:after {
  @apply text-slate-500;

  content: " click title to read more...";
} 
*/

.dark {
  .post-title {
    &:hover {
      @apply text-blue-300;
    }
  }

  .small {
    @apply text-sm;
  }

  /*  .post-text > p:first-child:after {
    @apply text-slate-600;
  }
*/
}
</style>
