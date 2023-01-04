import { useUserStore } from '~~/store/user';

export default defineNuxtRouteMiddleware((_to) => {
  const user = useUserStore();

  if (!user.username) {
    return navigateTo('/');
  }
});
