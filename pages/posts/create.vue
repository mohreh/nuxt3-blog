<template>
  <div class="h-full flex flex-col">
    <div
      ref="nav"
      class="flex flex-row items-end justify-between py-4 pl-8 pr-8 h-fit w-2/3 text-slate-900 dark:text-sky-100"
    >
      <div class="flex flex-row items-end space-x-12">
        <h1 class="text-3xl font-semibold">NuxtBlog</h1>
        <h2 class="text-xl font-semibold dark:text-sky-100">Create New Post</h2>
      </div>
      <div>
        <button
          class="text-lg font-semibold py-1 px-4 bg-sky-600/80 text-indigo-50 hover:bg-sky-600/90 rounded-lg"
          @click="publish"
        >
          Publish
        </button>
      </div>
    </div>

    <div class="py-2 px-8 flex flex-row space-x-8 grow mb-3">
      <editor-tiptap
        v-model="body"
        mode="create"
        class="w-2/3 overflow-auto relative"
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
  const { data, error } = await useFetch('/api/posts', {
    method: 'POST',
    body: body.value,
  });

  console.log(data.value, error);
};
</script>
