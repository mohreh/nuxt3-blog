<template>
  <ClientOnly>
    <button class="py-1 ml-3 max-h-full" @click="toggleDark()">
      <SunIcon v-if="darkTheme" class="w-5" />
      <MoonIcon v-else class="w-5" />
    </button>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { SunIcon, MoonIcon } from '@heroicons/vue/outline';
const darkTheme = useDark();
const toggleDark = useToggle(darkTheme);
</script>
