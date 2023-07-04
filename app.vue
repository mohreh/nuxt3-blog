<template>
  <NuxtLayout>
    <NuxtLoadingIndicator :height="5" />
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

  p {
    @apply text-white text-base;
  }
}
</style>
