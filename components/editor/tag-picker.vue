<script lang="ts" setup>
import { Tag } from "@prisma/client";
import { useAlertStore } from "~/store/alert";

const alertStore = useAlertStore();

const emit = defineEmits<{
  (e: "select", value: Tag[]): void;
}>();

const tagName = ref("");
const selectedTags: Ref<Tag[]> = ref([]);
const tags: Ref<Tag[]> = ref([]);
const pending = ref(false);
const input: Ref<HTMLInputElement | undefined> = ref();

watch(tagName, async (newTagName, _) => {
  if (tagName.value.length) {
    tagName.value.trim();

    pending.value = true;
    const { data, error } = await useFetch<Tag[]>(`/api/tags`, {
      query: {
        s: newTagName,
      },
    });

    if (error.value) {
      alertStore.alert(false, error.value.message);
    }

    if (data.value) {
      console.log(selectedTags.value);
      tags.value = data.value.filter(
        (tag) =>
          !selectedTags.value.some(
            (selectedTag) => selectedTag.name === tag.name,
          ),
      );
    }

    pending.value = false;
  }
});

const selectTag = (tag: Tag) => {
  selectedTags.value.push(tag);
  tagName.value = "";
  if (!!input.value) input.value.focus();

  emit("select", selectedTags.value);
};

const createTag = async () => {
  if (!!input.value) {
    input.value.setAttribute("disabled", "true");

    const { data, error } = await useFetch<Tag>(`/api/tags`, {
      method: "POST",
      body: {
        name: tagName.value,
      },
    });
    console.log(data.value, error.value);

    if (error.value) {
      alertStore.alert(false, error.value.message);
    }

    if (data.value) {
      selectTag(data.value);
    }

    input.value.removeAttribute("disabled");
  }
};

const onDelete = () => {
  if (!tagName.value.length)
    tagName.value = selectedTags.value.pop()?.name ?? "";
};
</script>

<template>
  <div class="flex relative flex-row justify-center items-center px-12">
    <ul class="flex flex-row gap-2">
      <li
        v-for="tag in selectedTags"
        :key="tag.name"
        class="flex flex-row"
      >
        <span>#</span>
        <p>{{ tag.name }}</p>
      </li>
    </ul>
    <div class="flex flex-row items-center mx-2 w-full">
      <span v-if="tagName.length">#</span>
      <input
        ref="input"
        v-model="tagName"
        class="my-2 w-full outline-none bg-inherit"
        placeholder="Add how many tags you want"
        type="text"
        @keydown.delete="onDelete"
        @keydown.space="tagName = tagName.trim()"
        @keyup.space="tagName = tagName.trim()"
      />
    </div>

    <div
      v-if="tagName.length"
      class="absolute right-12 left-12 top-full z-50 py-2 rounded-sm bg-slate-300 dark:bg-slate-700"
    >
      <span v-if="pending" class="px-4 my-2">Loading...</span>
      <ul v-else class="preview-tags">
        <li v-for="tag in tags" :key="tag.name" @click="selectTag(tag)">
          <p>
            <span>#</span>
            {{ tag.name }}
          </p>
        </li>
        <li
          v-if="!tags.some((tag) => tag.name === tagName)"
          class="flex flex-row justify-between"
          @click="createTag"
        >
          <p>
            <span>#</span>
            {{ tagName }}
          </p>
          <span>Create Tag</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.preview-tags li {
  @apply py-1 px-4;
}

.preview-tags li:hover {
  @apply bg-slate-400;
}

span {
  @apply text-gray-600;
}

.dark {
  .preview-tags li:hover {
    @apply bg-slate-800;
  }

  span {
    @apply text-gray-400;
  }
}
</style>
