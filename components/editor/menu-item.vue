<template>
  <button
    class="menu-item p-2 m-1"
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
      :name="'Editor' + iconName"
      class="text-2xl fill-slate-800 dark:fill-sky-100"
      fill
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

const iconName = props.icon.charAt(0).toUpperCase() + props.icon.slice(1);
</script>
