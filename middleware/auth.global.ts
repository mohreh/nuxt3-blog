import { useUserStore } from '~~/store/user';

export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUserStore();

  const res = await $fetch<ResponseData<UserInterface>>('/api/users/me');

  if (res.ok) {
    userStore.$patch({
      ...res.data,
    });
  }
});
