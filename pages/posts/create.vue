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
          :class="`flex flex-row gap-2 py-1 px-4 text-lg font-semibold rounded-lg ${
            publishing
              ? 'bg-sky-200 dark:bg-sky-800 text-slate-100 hover:bg-blue-900'
              : 'bg-sky-600/80 hover:bg-sky-600/90 text-indigo-50'
          }`"
          :disabled="publishing"
          @click="publish"
        >
          <Icon v-if="publishing" name="line-md:uploading-loop" />
          <p>Publish</p>
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
        <upload-cover-image
          :cover-image="body.coverImage"
          @cover-image-uploaded="(path) => (body.coverImage = path)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Tag } from "@prisma/client";
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
  tags: [] as Tag[],
  coverImage: undefined as string | undefined,
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

const publishing = ref(false);

const publish = async () => {
  if (body.value.title.length == 0) {
    alert(false, "Make sure to add title to your post");
  } else {
    publishing.value = true;
    const success = await createPost(body.value);
    if (success)
      body.value = {
        title: "",
        text: "<p>Write your new post here...</p>",
        tags: [],
        coverImage: undefined,
      };

    publishing.value = false;
    router.push("/");
  }
};

watch(
  () => [body.value.title, body.value.text, body.value.coverImage],
  () => {
    cached.value = body.value;
    console.log(body.value.coverImage);
  },
);
</script>
