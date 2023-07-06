<template>
  <div class="flex justify-center items-center w-screen h-screen">
    <div
      class="p-3 w-full max-w-lg rounded-lg border shadow-lg dark:shadow-2xl max-h-fit border-slate-800/10 dark:border-slate-50/[0.06]"
    >
      <div class="titles">
        <h1 :class="forRegister ? 'bold' : 'light'" @click="toggleStatus">
          Register
        </h1>
        <h1 :class="forRegister ? 'light' : 'bold'" @click="toggleStatus">
          Login
        </h1>
      </div>

      <user-register v-if="forRegister" />
      <user-login v-else />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "empt",
});

const forRegister = ref(true);
const toggleStatus = () => {
  forRegister.value = !forRegister.value;
};
</script>

<style lang="postcss" scoped>
.titles {
  @apply flex flex-row my-5 justify-between text-3xl font-semibold;
}

h1 {
  @apply cursor-pointer;
}

.bold {
  @apply text-slate-900;
}

.light {
  @apply text-slate-400;

  &:hover {
    @apply text-sky-700;
  }
}

.dark {
  .titles {
    @apply text-sky-100;
  }

  .bold {
    @apply text-slate-300;
  }

  .light {
    @apply text-slate-600;

    &:hover {
      @apply text-sky-300;
    }
  }
}
</style>
