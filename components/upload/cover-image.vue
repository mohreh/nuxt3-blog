<script lang="ts" setup>
const container: Ref<HTMLElement | undefined> = ref();
const label: Ref<HTMLElement | undefined> = ref();
const labelTitle: Ref<HTMLElement | undefined> = ref();
const imageInput: Ref<HTMLInputElement | undefined> = ref();

const uploading = ref(false);

const uploadImage = () => {
  if (
    FileReader &&
    !!(
      container.value &&
      labelTitle.value &&
      label.value &&
      imageInput.value
    )
  ) {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (!!container.value) {
        container.value.style.backgroundImage = `url(${
          event.target?.result as string
        })`;
        container.value.classList.add("off-hover");
      }
    };

    uploading.value = true;
    labelTitle.value.innerText = "Uploading Image";

    const image = imageInput.value.files?.item(0);
    reader.readAsDataURL(image as File);
  }
};
</script>

<template>
  <div ref="container" class="bordered input-box">
    <label
      ref="label"
      for="file"
      class="flex flex-row gap-4 justify-center items-center h-full"
    >
      <Icon v-if="!uploading" name="heroicons:photo" size="48px" />
      <Icon v-else name="eos-icons:loading" size="48px" />

      <h3 ref="labelTitle" class="p-0 m-0 border-none">
        Upload Cover Image
      </h3>
    </label>
    <input
      v-if="!uploading"
      ref="imageInput"
      type="file"
      accept="image/*"
      @change="uploadImage"
    />
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

.off-hover {
  pointer-events: none;
}

.dark {
  .input-box {
    @apply border-slate-50/[0.06] text-slate-200;
  }

  .input-box:hover,
  label:hover,
  input[type="file"]:hover {
    @apply bg-slate-800 text-slate-100;
  }
}
</style>
