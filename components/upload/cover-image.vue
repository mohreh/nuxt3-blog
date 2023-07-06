<script lang="ts" setup>
const uploadImage = () => {
  console.log("hello world");
};
</script>

<template>
  <div class="bordered input-box">
    <label
      for="file"
      class="flex flex-row gap-4 justify-center items-center h-full"
    >
      <Icon name="heroicons:photo" size="48px" />
      <h3 class="p-0 m-0 border-none">Upload Cover Image</h3>
    </label>
    <input type="file" accept="image/*" @change="uploadImage" />
  </div>
</template>

<style scoped lang="postcss">
.input-box {
  @apply w-full h-48 rounded-lg border-2 border-dashed border-slate-900/10 relative items-center justify-center text-slate-600;
}

.input-box,
label,
input[type="file"] {
  @apply cursor-pointer;
}

.input-box:hover,
label:hover,
input[type="file"]:hover {
  @apply bg-slate-300 bg-opacity-50 text-slate-800;
}

input[type="file"] {
  @apply w-full h-full opacity-0 overflow-hidden absolute z-10 top-0 left-0;
}

input[type="file"]::file-selector-button {
  @apply invisible h-full w-full z-10;
}

.dark {
  .input-box {
    @apply border-slate-50/[0.06] text-slate-400;
  }

  .input-box:hover,
  label:hover,
  input[type="file"]:hover {
    @apply bg-slate-800 text-slate-200;
  }
}
</style>
