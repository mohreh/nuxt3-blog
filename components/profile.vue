<template>
  <div>
    <div v-click-outside="hideDropdown" class="relative">
      <div @click="toggleDropdown">
        <UserCircleIcon class="icon" />
      </div>

      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          id="dropdown"
          :class="hide ? 'transition hidden' : ''"
          class="absolute -right-4 mt-1 w-56 rounded-md shadow-lg bg-slate-50/[0.06] dark:bg-slate-600/[0.06] border border-slate-700/10 dark:border-slate-50/[0.06] backdrop-blur-xl divide-y divide-slate-700/10 dark:divide-slate-50/[0.06]"
        >
          <div class="py-1">
            <div class="icon-group">
              <UserCircleIcon class="w-4" />
              <div class="flex flex-row items-center space-x-1">
                <p>username:</p>
                <h4 class="text-lg font-semibold">
                  {{ userStore.username }}
                </h4>
              </div>
            </div>
          </div>
          <div class="py-1">
            <nuxt-link class="icon-group" to="/posts/create">
              <PencilIcon class="w-4" />
              <p>Create new post</p>
            </nuxt-link>
          </div>
          <div class="py-1">
            <div class="icon-group">
              <UserGroupIcon class="w-4" />
              <p>Followers & Followings</p>
            </div>
            <div class="icon-group">
              <BellIcon class="w-4" />
              <p>Notifications</p>
            </div>
          </div>
          <div class="py-1">
            <div class="px-4 py-2 hovered icon-group" @click="logout">
              <LogoutIcon class="w-4" />
              <p>Sing out</p>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  UserCircleIcon,
  PencilIcon,
  LogoutIcon,
  BellIcon,
  UserGroupIcon,
} from '@heroicons/vue/outline';
import { useUserStore } from '~~/store/user';

const userStore = useUserStore();

const emit = defineEmits(['logout']);

const hide = ref(true);
const toggleDropdown = () => {
  hide.value = !hide.value;
};
const hideDropdown = () => (hide.value = true);

const logout = () => emit('logout');
</script>

<style lang="postcss" scoped>
.hovered {
  @apply cursor-pointer hover:text-sky-600 hover:dark:text-sky-300 hover:bg-black/5 hover:dark:bg-white/5;
}

.icon-group {
  @apply flex flex-row hovered px-4 py-2 space-x-4;
}
</style>
