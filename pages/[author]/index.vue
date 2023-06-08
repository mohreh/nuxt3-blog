<template>
  <div>
    {{ author }}
    {{ $route.params.author }}
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { data: author } = await useFetch(
  `/api/users/${route.params.author}`,
);
</script>
