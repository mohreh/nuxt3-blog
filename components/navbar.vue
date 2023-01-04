<template>
  <div id="navbar">
    <nuxt-link to="/">
      <h1 class="text-3xl font-semibold dark:text-sky-100">NuxtBlog</h1>
    </nuxt-link>
    <div class="flex flex-row text-md dark:text-sky-100">
      <div
        class="my-1 border-l border-slate-900/10 dark:border-slate-50/10"
      ></div>

      <ClientOnly>
        <div v-if="userStore.$state.username" class="flex flex-row">
          <user-profile class="py-1 pl-3 w-5" @logout="logout" />
          <div class="py-1 pl-3 ml-3">
            <ArrowRightOnRectangleIcon class="icon" @click="logout" />
          </div>
        </div>
        <p v-else class="py-1 pl-3">
          <nuxt-link to="/login-register">
            <ArrowLeftOnRectangleIcon class="icon" />
          </nuxt-link>
        </p>
      </ClientOnly>

      <dark-theme></dark-theme>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/vue/24/outline';
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
