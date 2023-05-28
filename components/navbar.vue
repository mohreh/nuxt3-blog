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
          <user-profile class="py-1 ml-3 w-6" @logout="logout" />
          <div class="pl-3 my-1">
            <Icon
              name="heroicons:arrow-right-on-rectangle"
              class="icon"
              @click="logout"
            />
          </div>
        </div>
        <p v-else class="pl-3 my-1">
          <nuxt-link to="/login-register">
            <Icon name="heroicons:arrow-left-on-rectangle" class="icon" />
          </nuxt-link>
        </p>
      </ClientOnly>

      <dark-theme></dark-theme>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAlertStore } from "~~/store/alert";
import { useUserStore } from "~~/store/user";

const userStore = useUserStore();
const alertStore = useAlertStore();

const logout = () => {
  const accessToken = useCookie("access_token");
  accessToken.value = null;
  userStore.$reset();
  alertStore.alert(true, "see you later.");
};
</script>

<style lang="postcss">
#navbar {
  @apply flex flex-row items-center justify-between z-10 sticky top-0 w-full py-3 px-8 border-b border-slate-900/10 backdrop-blur-md bg-white/10;
}

.icon {
  @apply w-6;

  &:hover {
    @apply cursor-pointer text-sky-900;
  }
}

.dark {
  #navbar {
    @apply border-slate-50/[0.06] bg-black/10;
  }

  .icon {
    @apply text-sky-100;

    &:hover {
      @apply text-sky-300;
    }
  }
}
</style>
