<template>
  <div class="container">
    <navbar></navbar>
    <slot />
  </div>
</template>

<style lang="postcss" scoped>
.container {
  @apply max-w-lg border rounded-lg p-3 mt-32 max-h-min m-auto shadow-lg dark:shadow-2xl border-slate-300 dark:border-slate-800;
}
</style>
