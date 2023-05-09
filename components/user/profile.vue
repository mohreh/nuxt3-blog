<template>
  <div>
    <div v-click-outside="hideDropdown" class="relative">
      <div @click="toggleDropdown">
        <!-- refactor these lines later  -->
        <Icon name="heroicons:user-circle" class="icon" />
        <div v-html="userStore.avatar" class="w-0 h-0"></div>
      </div>

      <transition enter-active-class="transition duration-100 ease-out" enter-from-class="opacity-0 transform scale-95"
        enter-to-class="opacity-100 transform scale-100" leave-active-class="transition duration-75 ease-in"
        leave-from-class="opacity-100 transform scale-100" leave-to-class="opacity-0 transform scale-95">
        <div id="dropdown" :class="hide ? 'transition hidden' : ''"
          class="absolute -right-4 mt-1 w-56 rounded-md border divide-y shadow-lg bg-slate-50/[0.06] border-slate-700/10 backdrop-blur-xl divide-slate-700/10 dark:bg-slate-600/[0.06] dark:border-slate-50/[0.06] dark:divide-slate-50/[0.06]">
          <div class="py-1">
            <div class="icon-group">
              <!-- <Icon name="heroicons:user-circle" class="w-5" /> -->
              <div v-html="userStore.avatar" class="my-1 w-6 h-6"></div>
              <div class="flex flex-row items-center space-x-1">
                <h4 class="text-lg">
                  {{ userStore.username }}
                </h4>
              </div>
            </div>
          </div>
          <div class="py-1">
            <nuxt-link class="icon-group" to="/posts/create">
              <Icon name="heroicons:pencil-square" class="w-4" />
              <p>Create new post</p>
            </nuxt-link>
          </div>
          <div class="py-1">
            <div class="icon-group">
              <Icon name="heroicons:user-group" class="w-4" />
              <p>Followers & Following</p>
            </div>
            <div class="icon-group">
              <Icon name="heroicons:bell" class="w-4" />
              <p>Notifications</p>
            </div>
          </div>
          <div class="py-1">
            <div class="py-2 px-4 icon-group hovered" @click="logout">
              <Icon name="heroicons:arrow-right-on-rectangle" class="icon" />
              <p>Sing out</p>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script lang="ts" setup>
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
  @apply cursor-pointer;

  &:hover {
    @apply text-sky-600 bg-black/5;
  }
}

.icon-group {
  @apply flex flex-row hovered px-4 py-2 space-x-4;
}

.dark {
  .hovered {
    &:hover {
      @apply bg-white/5 text-sky-300;
    }
  }
}
</style>
