<template>
  <div>
    <navbar />
    <div class="container z-0">
      <slot />
    </div>
    <LazyAlert />
  </div>
</template>

<style lang="postcss" scoped>
.container {
  @apply m-auto max-w-7xl relative flex flex-col py-2;
}
</style>
