<template>
  <div>
    Hello world
    {{ post }}
  </div>
  <div v-if="`!ok`">
    goodbye
    <h1>{{ message }}</h1>
  </div>
</template>
<script setup lang="ts">
import { usePostStore } from '~~/store/posts';

const route = useRoute();
const router = useRouter();
const postStore = usePostStore();

const {
  ok,
  message,
  data: post,
} = await postStore.fetch_post(
  route.params.author as string,
  route.params.title as string,
);

if (!ok) {
  setTimeout(() => {
    router.push('/');
  }, 2000);
}
</script>
