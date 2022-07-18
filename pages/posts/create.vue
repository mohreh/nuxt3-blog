<template>
  <div class="h-full flex flex-col">
    <div ref="nav" class="flex flex-row items-end space-x-10 py-3 px-8 h-fit">
      <h1 class="text-3xl font-semibold dark:text-sky-100">NuxtBlog</h1>
      <h2 class="text-xl font-semibold dark:text-sky-100">Create New Post</h2>
    </div>
    <div class="py-2 px-8 flex flex-row space-x-4 grow mb-3">
      <editor-tiptap
        v-model="body"
        class="w-2/3 overflow-auto relative"
        :style="`height: calc(100vh - ${height}px - 1.5rem);`"
      />
      <div class="w-1/3 text-white">{{ body }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'signed',
  layout: 'empt',
});

const body = ref('<p>Start writing here...</p>');

const nav = ref();
const height = ref(0);

onMounted(() => {
  height.value = nav.value.clientHeight;
});
</script>
