<template>
  <button
    class="menu-item py-2"
    :class="{ 'is-active': isActive ? isActive() : null }"
    :title="title"
    @click="action"
  >
    <nuxt-icon :name="'Editor' + iconName" class="text-2xl fill-sky-100" fill />
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
