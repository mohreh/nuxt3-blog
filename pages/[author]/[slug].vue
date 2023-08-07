<template>
  <div v-if="!pending" class="flex gap-5 my-4">
    <div class="overflow-hidden basis-2/3 bordered h-fit">
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

        <!-- <div class="mt-4 ProseMirror" v-html="post?.text"></div> -->
        <client-only>
          <editor-content
            :editor="
              new Editor({
                editable: false,
                extensions: [StarterKit],
                content: post?.text,
              })
            "
          />
        </client-only>
      </div>
    </div>
    <lazy-card-user
      class="basis-1/3"
      :user="post?.author"
      :current-post-slug="$route.params.slug as string"
    />
  </div>
  <div v-else>Loading...</div>
</template>

<script setup lang="ts">
import { PostInterface } from "~/nuxt";
import { EditorContent, Editor } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";

const route = useRoute();

const { data: post, pending } = useLazyAsyncData(
  `/api/users/${route.params.author}/${route.params.slug}`,
  async () => {
    return await $fetch<PostInterface>(
      `/api/users/${route.params.author}/${route.params.slug}`,
    );
  },
);
</script>

<style lang="postcss" scoped>
h1 {
  @apply text-5xl mt-10 mb-6;
}
</style>
