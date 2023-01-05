<template>
  <Transition>
    <div
      v-if="alertStore.show"
      :class="alertStore.status ?'success alert' : 'danger alert'"
    >
      <CheckIcon class="w-6" v-if="alertStore.status" />
      <ExclamationTriangleIcon class="w-6" v-else />
      <p>
        {{ alertStore.message }}
      </p>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline';

import { useAlertStore } from '~~/store/alert';

const alertStore = useAlertStore();
</script>

<style lang="postcss" scoped>
.alert {
  @apply rounded-lg w-fit fixed bottom-5 right-10 px-5 py-3 backdrop-blur-2xl z-10 font-semibold text-black/70 dark:text-white flex flex-row gap-2;
}

.danger {
  @apply bg-red-700/30 dark:bg-red-400/50;
}

.success {
  @apply bg-green-700/30 dark:bg-green-500/40;
}
</style>
