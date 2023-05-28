<template>
  <div>
    {{ author }}
    {{ $route.params.author }}
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const author = await $fetch(`/api/users/${route.params.author}`);
</script>
