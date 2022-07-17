import { useUserStore } from '~~/store/user';

export default defineNuxtRouteMiddleware((to) => {
  const user = useUserStore();

  if (!user.username) {
    return navigateTo('/login-register');
  }
});
