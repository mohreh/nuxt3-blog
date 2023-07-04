<template>
  <div v-if="!pending">
    {{ author }}
    {{ $route.params.author }}
  </div>
  <div v-else>Loading...</div>
</template>

<script setup lang="ts">
const route = useRoute();

const { data: author, pending } = useLazyAsyncData(
  async () => await $fetch(`/api/users/${route.params.author}`),
);
</script>
