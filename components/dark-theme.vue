<template>
  <ClientOnly>
    <button class="py-1 ml-3 max-h-full" @click="toggleDark()">
      <SunIcon v-if="darkTheme" class="icon" />
      <MoonIcon v-else class="icon" />
    </button>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline';
const darkTheme = useDark();
const toggleDark = useToggle(darkTheme);
</script>
