<template>
  <div class="flex flex-col h-full">
    <div
      ref="nav"
      class="flex flex-row justify-between items-end py-4 pr-8 pl-8 w-2/3 h-fit text-slate-900 dark:text-sky-100"
    >
      <div class="flex flex-row items-end space-x-12">
        <h1 class="text-3xl font-semibold">NuxtBlog</h1>
        <h2 class="text-xl font-semibold dark:text-sky-100">Create New Post</h2>
      </div>
      <div>
        <button
          class="py-1 px-4 text-lg font-semibold text-indigo-50 rounded-lg bg-sky-600/80 hover:bg-sky-600/90"
          @click="publish"
        >
          Publish
        </button>
      </div>
    </div>

    <div class="flex flex-row py-2 px-8 mb-3 space-x-8 grow">
      <editor-tiptap
        v-model="body"
        mode="create"
        class="overflow-auto relative w-2/3"
        :style="`height: calc(100vh - ${height}px - 1.5rem);`"
      />
      <div class="w-1/3 text-white">{{ body.title }} {{ body.text }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'signed',
  layout: 'empt',
});

const body = ref({
  title: '',
  text: '<p>Start writing here...</p>',
});

const nav = ref();
const height = ref(0);

onMounted(() => {
  height.value = nav.value.clientHeight;
});

const publish = async () => {
  const { data, message } = await useFetch('/api/posts', {
    method: 'POST',
    body: body.value,
  });

  console.log(data.value, message);
};
</script>
