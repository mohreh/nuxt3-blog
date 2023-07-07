<script lang="ts" setup>
import { useAlertStore } from "~/store/alert";
import { useUserStore } from "~/store/user";

const container: Ref<HTMLElement | undefined> = ref();
const label: Ref<HTMLElement | undefined> = ref();
const labelTitle: Ref<HTMLElement | undefined> = ref();
const imageInput: Ref<HTMLInputElement | undefined> = ref();

const supabase = useSupabaseClient();
const user = useUserStore();
const alertStore = useAlertStore();

const emit = defineEmits<{
  (e: "coverImageUploaded", value: string): void;
}>();

const uploading = ref(false);

const uploadImage = async () => {
  if (
    FileReader &&
    !!(
      container.value &&
      labelTitle.value &&
      label.value &&
      imageInput.value
    )
  ) {
    uploading.value = true;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (!!container.value) {
        container.value.style.backgroundImage = `url(${
          event.target?.result as string
        })`;
      }
    };

    try {
      const coverImage = imageInput.value.files?.item(0) as File;

      reader.readAsDataURL(coverImage);

      const { data, error } = await supabase.storage
        .from("public/coverImages")
        .upload(
          `${user.username}-${Math.random()
            .toString(36)
            .substring(2, 10)}`, // random name for image
          coverImage,
        );

      if (error) {
        alertStore.alert(false, error.message, 10000);
        container.value.style.backgroundImage = "none";
      } else {
        alertStore.alert(true, "Cover Image Uploaded Successfully");
        uploading.value = false;
        emit("coverImageUploaded", data?.path);
      }
    } catch (error) {
      alertStore.alert(false, (error as Error).message, 10000);
      container.value.style.backgroundImage = "none";
    }
  }
};
</script>

<template>
  <div class="bordered main">
    <div
      ref="container"
      :class="uploading ? 'input-box off-hover' : 'input-box'"
    >
      <label
        ref="label"
        for="file"
        :class="uploading ? 'darken-background' : ''"
      >
        <Icon v-if="!uploading" name="heroicons:photo" size="48px" />
        <Icon v-else name="eos-icons:loading" size="48px" />

        <h3 ref="labelTitle" class="p-0 m-0 border-none">
          {{ uploading ? "Uploading Image" : "Upload Cover Image" }}
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
  </div>
</template>

<style scoped lang="postcss">
.main {
  @apply rounded-lg border-2 border-dashed border-slate-900/10 overflow-hidden;
}

.input-box {
  @apply w-full h-48 relative justify-center items-center text-slate-600 rounded-lg bg-no-repeat bg-cover;
}

label {
  @apply flex flex-row gap-4 justify-center items-center h-full;
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

.darken-background {
  @apply bg-gray-700/50 backdrop-blur-sm;
}

.dark {
  .main {
    @apply border-slate-50/[0.06];
  }

  .input-box {
    @apply text-slate-200;
  }

  .input-box:hover,
  label:hover,
  input[type="file"]:hover {
    @apply bg-slate-800 text-slate-100;
  }
}
</style>
