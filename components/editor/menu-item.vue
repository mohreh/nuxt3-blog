<template>
  <button
    class="p-2 m-1 menu-item"
    :class="
      isActive
        ? isActive()
          ? 'bg-slate-900/10 dark:bg-sky-100/5 rounded-lg'
          : null
        : null
    "
    :title="title"
    @click="action"
  >
    <nuxt-icon
      :name="iconName"
      class="text-2xl fill-slate-800 dark:fill-sky-100"
      filled
    />
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{
  icon: string;
  title: string;
  action: () => void;
  isActive?: () => boolean;
}>();

const iconName = 'editor/' + props.icon;
</script>
