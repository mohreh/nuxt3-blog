<template>
  <div>
    {{ author }}
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const author = await $fetch(`/api/users/${route.params.author}`);
</script>
