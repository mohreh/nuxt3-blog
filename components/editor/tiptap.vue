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

      <editor-tag-picker />

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

type Usage = "create" | "update";

const props = defineProps<{
  modelValue: {
    title: string;
    text: string;
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
    });
  },
});
</script>

<style lang="postcss">
.ProseMirror {
  @apply outline-none text-slate-900 text-xl tracking-wider font-medium leading-relaxed border-none;

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
    @apply bg-slate-300/50 px-4 py-5 rounded-lg text-base;

    code {
      @apply bg-inherit p-0;
    }
  }

  blockquote {
    @apply px-4 mx-7 my-4 border-l-4 border-sky-800/10;
  }

  code {
    @apply bg-black/10 p-1 text-base rounded;
  }

  hr {
    @apply content-none m-7 border-t-0 border-b-2 border-slate-900/10;
  }
}

.dark {
  .ProseMirror {
    @apply text-sky-100;

    pre {
      @apply bg-black/40;
    }

    hr {
      @apply border-sky-100/10;
    }
  }
}
</style>
