<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="postcss">
h3 {
  @apply text-xl font-bold pb-1 mb-2 border-b border-slate-200;
}

h2 {
  @apply text-2xl font-bold pb-1 mb-2 border-b border-slate-200;
}

h1 {
  @apply text-3xl font-bold pb-1 mb-2;
}

.bordered {
  @apply border border-slate-900/10 rounded-lg;
}

.dark {
  .bordered {
    @apply border-slate-50/[0.06];
  }

  h3,
  h2 {
    @apply border-slate-700;
  }
}
</style>
