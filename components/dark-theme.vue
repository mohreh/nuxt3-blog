<template>
  <ClientOnly>
    <button class="py-1" @click="toggleDark()">
      {{ darkTheme ? 'dark' : 'light' }}
    </button>
  </ClientOnly>
</template>

<script lang="ts" setup>
const darkTheme = useDark();
const toggleDark = useToggle(darkTheme);
</script>
