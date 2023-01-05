<template>
  <div>
    <navbar />
    <div class="container z-0">
      <slot />
    </div>
    <alert></alert>
  </div>
</template>

<style lang="postcss" scoped>
.container {
  @apply m-auto max-w-full relative flex flex-col py-2 px-8;
}
</style>
