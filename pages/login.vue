<template>
  <div>
    <button @click="test">test</button>
  </div>
</template>

<script lang="ts" setup>
const test = async () => {
  const res = await $fetch('/api/users', {
    method: 'POST',
    body: {
      hi: 'hiii',
    },
  });
  console.log(res);
};
</script>
