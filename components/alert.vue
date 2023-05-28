<template>
  <Transition>
    <div
      v-if="alertStore.show"
      :class="alertStore.status ? 'success alert' : 'danger alert'"
    >
      <Icon v-if="alertStore.status" name="heroicons:check" class="w-6" />
      <Icon v-else name="heroicons:exclamation-triangle" class="w-6" />
      <p>
        {{ alertStore.message }}
      </p>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useAlertStore } from "~~/store/alert";

const alertStore = useAlertStore();
</script>

<style lang="postcss" scoped>
.alert {
  @apply rounded-lg w-fit fixed bottom-5 right-10 px-5 py-3 backdrop-blur-2xl z-10 font-semibold text-black/70 flex flex-row gap-3 items-center;
}

.danger {
  @apply bg-red-700/30;
}

.success {
  @apply bg-green-700/30;
}

.dark {
  .alert {
    @apply text-white;
  }

  .danger {
    @apply bg-red-400/50;
  }

  .success {
    @apply bg-green-500/40;
  }
}
</style>
