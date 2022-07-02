<template>
  <div class="container">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="postcss">
@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200;300;400;500;600;700;800&family=Gantari:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

* {
  @apply transition-all;
}

html {
  height: -webkit-fill-available;
}

body {
  @apply bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-200 dark:bg-gradient-to-br dark:from-slate-800 dark:via-slate-900 dark:to-black min-h-screen;
  direction: ltr;
  height: -webkit-fill-available;
  min-height: -webkit-fill-available;
  font-family: 'Gantari', ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans',
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';
}

.container {
  @apply m-auto max-w-full min-h-screen relative flex flex-col py-2 px-8;
}
</style>
