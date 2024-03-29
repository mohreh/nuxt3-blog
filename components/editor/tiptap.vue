<template>
  <div
    class="flex overflow-y-auto flex-col space-y-5 h-96 rounded-lg border border-slate-900/10 dark:border-slate-50/5"
  >
    <ClientOnly>
      <input
        type="text"
        class="flex-none px-12 pt-10 pb-5 w-full text-4xl font-bold outline-none bg-inherit text-slate-900 dark:text-sky-100/95"
        placeholder="Write Post Title Here..."
        :value="modelValue.title"
        @input="
          $emit('update:modelValue', {
            title: $event.target?.value,
            text: modelValue.text,
          })
        "
      />

      <editor-tag-picker @select="onTagSelect" />

      <editor-menu
        :editor="editor"
        class="sticky top-0 z-10 flex-none py-2 px-12 bg-purple-200/50 h-fit dark:bg-slate-900"
      />

      <editor-content
        :editor="editor"
        class="mx-12 outline-none grow"
        @click="editor?.view.focus()"
      />
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { Tag } from "@prisma/client";

type Usage = "create" | "update";

const props = defineProps<{
  modelValue: {
    title: string;
    text: string;
    coverImage: string | undefined;
    tags: Tag[];
  };

  mode: Usage;
}>();

const emit = defineEmits(["update:modelValue"]);

const editor = useEditor({
  content: props.modelValue.text,
  extensions: [StarterKit],
  onUpdate: () => {
    emit("update:modelValue", {
      title: props.modelValue.title,
      text: editor.value?.getHTML(),
      coverImage: props.modelValue.coverImage,
      tags: props.modelValue.tags,
    });
  },
});

const onTagSelect = (selectedTags: Tag[]) => {
  emit("update:modelValue", {
    title: props.modelValue.title,
    text: editor.value?.getHTML(),
    coverImage: props.modelValue.coverImage,
    tags: selectedTags,
  });
};
</script>
