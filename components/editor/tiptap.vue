<template>
  <div
    class="flex flex-col border rounded-lg border-slate-900/10 dark:border-slate-50/5 space-y-5 h-96 overflow-y-auto"
  >
    <ClientOnly>
      <input
        type="text"
        class="w-full bg-inherit flex-none px-12 pt-10 pb-5 outline-none text-4xl font-bold dark:text-sky-100/95 text-slate-900"
        placeholder="Write Post Title Here..."
        :value="modelValue.title"
        @input="
          $emit('update:modelValue', {
            title: $event.target.value,
            text: modelValue.text,
          })
        "
      />

      <editor-menu
        :editor="editor"
        class="h-fit px-12 py-2 flex-none bg-purple-100 dark:bg-slate-900 sticky top-0 z-10"
      />

      <editor-content
        :editor="editor"
        class="grow mx-12"
        @click="editor.view.focus()"
      />
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';

type Usage = 'create' | 'update';

const prop = defineProps<{
  modelValue: {
    title: string;
    text: string;
  };

  mode: Usage;
}>();

const emit = defineEmits(['update:modelValue']);

const editor = useEditor({
  content: prop.modelValue.text,
  extensions: [StarterKit],
  onUpdate: () => {
    emit('update:modelValue', {
      title: prop.modelValue.title,
      text: editor.value.getHTML(),
    });
  },
});
</script>

<style lang="postcss">
.ProseMirror {
  @apply outline-none text-slate-900 dark:text-sky-100 text-xl tracking-wider font-medium leading-relaxed;

  h2 {
    @apply font-bold text-3xl;
  }

  h3 {
    @apply font-bold text-2xl;
  }

  h4 {
    @apply font-bold text-xl;
  }

  ul {
    @apply list-disc;
  }

  ol {
    @apply list-decimal;
  }

  ul,
  ol {
    @apply list-inside;
    li {
      p {
        @apply inline;
      }
    }
  }

  pre {
    @apply bg-slate-300/50 dark:bg-black/40 px-4 py-5 rounded-lg text-base;
    code {
      @apply bg-inherit p-0;
    }
  }

  blockquote {
    @apply px-4 mx-7 my-4 border-l-4 border-sky-100/20;
  }

  code {
    @apply bg-black/10 p-1 text-base rounded;
  }

  hr {
    @apply content-none m-7 border-t-0 border-b-2 border-slate-900/10 dark:border-sky-100/10;
  }
}
</style>
