<template>
  <div class="flex flex-row justify-between items-center">
    <ClientOnly>
      <div v-for="(item, index) in items" :key="index">
        <div v-if="item.type === 'divider'" class="divider" />
        <editor-menu-item v-else v-bind="item as Item" />
      </div>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3';

const props = defineProps({
  editor: Editor,
});

interface Item {
  type?: string;
  icon: string;
  title: string;
  action: () => void;
  isActive?: () => boolean;
}

const items: (Item | { type: string })[] = [
  {
    icon: 'bold',
    title: 'Bold',
    action: () => props.editor?.chain().focus().toggleBold().run(),
    isActive: () => props.editor?.isActive('bold') ?? false,
  },
  {
    icon: 'italic',
    title: 'Italic',
    action: () => props.editor?.chain().focus().toggleItalic().run(),
    isActive: () => props.editor?.isActive('italic') ?? false,
  },
  {
    icon: 'strikethrough',
    title: 'Strike',
    action: () => props.editor?.chain().focus().toggleStrike().run(),
    isActive: () => props.editor?.isActive('strike') ?? false,
  },
  {
    icon: 'code-view',
    title: 'Code',
    action: () => props.editor?.chain().focus().toggleCode().run(),
    isActive: () => props.editor?.isActive('code') ?? false,
  },
  {
    type: 'divider',
  },
  {
    icon: 'h-2',
    title: 'Heading 2',
    action: () =>
      props.editor?.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: () => props.editor?.isActive('heading', { level: 2 }) ?? false,
  },
  {
    icon: 'h-3',
    title: 'Heading 3',
    action: () =>
      props.editor?.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: () => props.editor?.isActive('heading', { level: 3 }) ?? false,
  },
  {
    icon: 'h-4',
    title: 'Heading 4',
    action: () =>
      props.editor?.chain().focus().toggleHeading({ level: 4 }).run(),
    isActive: () => props.editor?.isActive('heading', { level: 4 }) ?? false,
  },
  {
    icon: 'paragraph',
    title: 'Paragraph',
    action: () => props.editor?.chain().focus().setParagraph().run(),
    isActive: () => props.editor?.isActive('paragraph') ?? false,
  },
  {
    icon: 'list-unordered',
    title: 'Bullet List',
    action: () => props.editor?.chain().focus().toggleBulletList().run(),
    isActive: () => props.editor?.isActive('bulletList') ?? false,
  },
  {
    icon: 'list-ordered',
    title: 'Ordered List',
    action: () => props.editor?.chain().focus().toggleOrderedList().run(),
    isActive: () => props.editor?.isActive('orderedList') ?? false,
  },
  {
    icon: 'code-box-line',
    title: 'Code Block',
    action: () => props.editor?.chain().focus().toggleCodeBlock().run(),
    isActive: () => props.editor?.isActive('codeBlock') ?? false,
  },
  {
    type: 'divider',
  },
  {
    icon: 'double-quotes-l',
    title: 'Blockquote',
    action: () => props.editor?.chain().focus().toggleBlockquote().run(),
    isActive: () => props.editor?.isActive('blockquote') ?? false,
  },
  {
    icon: 'separator',
    title: 'Horizontal Rule',
    action: () => props.editor?.chain().focus().setHorizontalRule().run(),
  },
  {
    type: 'divider',
  },
  {
    icon: 'text-wrap',
    title: 'Hard Break',
    action: () => props.editor?.chain().focus().setHardBreak().run(),
  },
  {
    icon: 'format-clear',
    title: 'Clear Format',
    action: () =>
      props.editor?.chain().focus().clearNodes().unsetAllMarks().run(),
  },
  {
    type: 'divider',
  },
  {
    icon: 'arrow-go-back-line',
    title: 'Undo',
    action: () => props.editor?.chain().focus().undo().run(),
  },
  {
    icon: 'arrow-go-forward-line',
    title: 'Redo',
    action: () => props.editor?.chain().focus().redo().run(),
  },
];
</script>

<style lang="postcss" scoped>
.divider {
  @apply border-l border-slate-900/10 h-5;
}

.dark {
  .divider {
    @apply border-slate-50/10;
  }
}
</style>
