<template>
  <div
    class="flex flex-col border rounded border-slate-800 space-y-3 h-96 overflow-auto"
  >
    <ClientOnly>
      <input
        type="text"
        class="w-full bg-inherit flex-none px-5 py-5 outline-none text-4xl"
        placeholder="Write Post Title Here..."
      />
      <editor-menu
        :editor="editor"
        class="h-fit px-5 py-2 flex-none dark:bg-slate-900"
      />
      <editor-content :editor="editor" class="grow mx-5" @click="focus" />
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';

const editor = useEditor({
  content: '<p>start writing here...</p>',
  extensions: [StarterKit],
});

const focus = () => editor.value.view.focus();
</script>

<style lang="postcss">
.ProseMirror {
  @apply outline-none;
}
</style>
