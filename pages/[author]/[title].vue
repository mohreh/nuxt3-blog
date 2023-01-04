<template>
  <div>
    Hello world
    {{ post }}
    {{ message }}
  </div>
</template>
<script setup lang="ts">
const route = useRoute();
const { message, data: post } = await $fetch(
  `/api/users/${route.params.author}/${route.params.title}`,
);
</script>
