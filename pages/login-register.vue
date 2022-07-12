<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <div
      class="max-h-fit max-w-lg w-full border rounded-lg p-3 shadow-lg dark:shadow-2xl border-slate-800/10 dark:border-slate-50/[0.06]"
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
  layout: 'empt',
});

const forRegister = ref(true);
const toggleStatus = () => {
  forRegister.value = !forRegister.value;
};
</script>

<style lang="postcss" scoped>
.titles {
  @apply flex flex-row my-5 justify-between text-3xl font-semibold dark:text-sky-100;
}

h1 {
  @apply cursor-pointer;
}

.bold {
  @apply text-slate-900 dark:text-slate-300;
}

.light {
  @apply text-slate-400 dark:text-slate-600 hover:text-sky-700 dark:hover:text-sky-300;
}
</style>
