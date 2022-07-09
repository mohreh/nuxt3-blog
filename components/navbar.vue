<template>
  <div id="navbar">
    <h1 class="text-3xl font-semibold dark:text-sky-100">NuxtBlog</h1>
    <div class="text-md flex flex-row dark:text-sky-100">
      <div
        class="border-l border-slate-900/10 dark:border-slate-50/10 my-1"
      ></div>

      <ClientOnly>
        <div v-if="userStore.$state.username" class="flex flex-row">
          <profile class="pl-3 py-1 w-5" />
          <div class="ml-3 pl-3 py-1">
            <LogoutIcon class="icon" @click="logout" />
          </div>
        </div>
        <p v-else class="pl-3 py-1">
          <nuxt-link to="/login-register">
            <LoginIcon class="icon" />
          </nuxt-link>
        </p>
      </ClientOnly>

      <dark-theme></dark-theme>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LoginIcon, LogoutIcon } from '@heroicons/vue/outline';
import { useUserStore } from '~~/store/user';

const userStore = useUserStore();
const logout = () => {
  const accessToken = useCookie('access_token');
  accessToken.value = null;
  userStore.$reset();
};
</script>

<style lang="postcss">
#navbar {
  @apply flex flex-row items-center justify-between z-10 sticky top-0 w-full py-3 px-8 border-b border-slate-900/10 dark:border-slate-50/[0.06] backdrop-blur-md bg-white/10 dark:bg-black/10;
}

.icon {
  @apply w-5 hover:cursor-pointer hover:text-sky-900 dark:text-sky-100 dark:hover:text-sky-300;
}
</style>
