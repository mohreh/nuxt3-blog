<template>
  <ClientOnly>
    <button class="my-1 ml-3 max-h-full" @click="toggleDark()">
      <Icon v-if="darkTheme" name="heroicons:sun" class="icon" />
      <Icon v-else name="heroicons:moon" class="icon" />
    </button>
  </ClientOnly>
</template>

<script lang="ts" setup>
const darkTheme = useDark();
const toggleDark = useToggle(darkTheme);
</script>
