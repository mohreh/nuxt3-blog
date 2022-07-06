<script setup>
import { useUserStore } from '@/store/user';

definePageMeta({
  layout: 'welcome',
});

const userStore = useUserStore();

const body = ref({});
const pending = ref(false);
const errors = ref('');
const router = useRouter();

// Classes
const textClasses = {
  outer: 'my-5',
  wrapper: 'text-gray-900 dark:text-gray-300',
  label: 'text-base',
  inner:
    'w-full mt-1 bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg mb-1 overflow-hidden focus-within:border-blue-300',
  input:
    'w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400 dark:bg-slate-800 dark:placeholder-gray-600 dark:text-gray-300',
  help: 'text-xs text-gray-500',
  message: 'text-xs text-red-500',
};

const submitHandler = async () => {
  pending.value = true;
  const { data, error } = await useFetch('/api/users', {
    method: 'POST',
    body: body.value,
  });

  if (!data.value.ok) {
    errors.value = data.value.message
      ? 'Internal server Error:' + data.value.message
      : 'Client Error: ' + error.value;
  } else {
    userStore.$patch({
      ...data.value.data,
    });
    router.push('/');
  }
};
</script>

<template>
  <p v-if="errors" class="text-red-600 dark:text-red-400 text-lg py-2">
    {{ errors }}
  </p>
  <div v-else>
    <FormKit
      v-model="body"
      type="form"
      submit-label="Login"
      :classes="{
        actions: `text-center text-lg rounded-xl transition cursor-pointer ${
          pending
            ? 'bg-slate-200 dark:bg-slate-900 text-slate-800 dark:text-slate-400'
            : 'bg-blue-800 dark:bg-blue-800 text-slate-100 hover:bg-blue-900'
        } `,
        message: 'text-lg text-red-500 pb-2',
        label: 'my-2',
      }"
      incomplete-message="please fill all fields correctly."
      :config="{ validationVisibility: 'submit' }"
      @submit="submitHandler"
    >
      <FormKit
        type="text"
        name="username"
        class="my-5"
        label="Your username:"
        placeholder="username"
        :classes="textClasses"
        validation-visibility="submit"
        validation="required|matches:/^\S*$/"
        :validation-messages="{
          required: 'name is required.',
        }"
      />

      <FormKit
        type="password"
        name="password"
        label="Your password:"
        placeholder="Password"
        validation="required|length:6|matches:/[^a-zA-Z]/"
        :validation-messages="{
          required: 'password is required.',
          length: 'password at least must contain 6 characters.',
          matches: 'Please include at least one symbol.',
        }"
        :classes="textClasses"
        validation-visibility="submit"
      />

      <FormKit
        type="password"
        name="password_confirm"
        label="Confirm password:"
        placeholder="Confirm password"
        validation="required|confirm|length:6"
        :classes="textClasses"
        validation-visibility="submit"
      />
    </FormKit>
  </div>
</template>

<style lang="postcss">
.formkit-wrapper button {
  @apply w-full py-2;
}
</style>
