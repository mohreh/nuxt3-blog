<template>
  <div class="flex flex-col h-full">
    <div
      ref="nav"
      class="flex flex-row justify-between items-end py-4 pr-8 pl-8 w-2/3 h-fit text-slate-900 dark:text-sky-100"
    >
      <div class="flex flex-row items-end space-x-12">
        <h1 class="text-3xl font-semibold">NuxtBlog</h1>
        <h2
          class="p-0 m-0 text-xl font-semibold border-none dark:text-sky-100"
        >
          Create New Post
        </h2>
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
      <div class="w-1/3 dark:text-white">
        <upload-cover-image />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { StorageSerializers } from "@vueuse/core";
import { useAlertStore } from "~~/store/alert";
import { usePostStore } from "~~/store/posts";

const router = useRouter();
const { createPost } = usePostStore();
const { alert } = useAlertStore();

definePageMeta({
  middleware: "signed",
  layout: "empt",
});

const body = ref({
  title: "",
  text: "<p>Start writing here...</p>",
});

const cached = useSessionStorage("create_post", null, {
  serializer: StorageSerializers.object,
});

if (cached.value) {
  body.value = cached.value;
}

const nav = ref();
const height = ref(0);

onMounted(() => {
  height.value = nav.value.clientHeight;
});

const publish = async () => {
  if (body.value.title.length == 0) {
    alert(false, "Make sure to add title to your post");
  } else {
    const success = await createPost(body.value);
    if (success)
      body.value = {
        title: "",
        text: "<p>Write your new post here...</p>",
      };

    router.push("/");
  }
};

watch(
  () => [body.value.title, body.value.text],
  () => (cached.value = body.value),
);
</script>
