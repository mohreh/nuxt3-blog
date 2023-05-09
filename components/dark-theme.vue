<template>
  <ClientOnly>
    <button class="my-1 ml-3 max-h-full" @click="toggleDark()">
      <Icon name="heroicons:sun" v-if="darkTheme" class="icon" />
      <Icon name="heroicons:moon" v-else class="icon" />
    </button>
  </ClientOnly>
</template>

<script lang="ts" setup>
const darkTheme = useDark();
const toggleDark = useToggle(darkTheme);
</script>
