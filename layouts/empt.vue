<template>
  <div class="container">
    <alert></alert>
    <slot />
  </div>
</template>

<script lang="ts">
useDark();
</script>

<style lang="postcss" scoped>
.container {
  @apply min-w-full h-screen;
}
</style>
