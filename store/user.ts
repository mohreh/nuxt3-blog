import { defineStore } from 'pinia';
import { RegisterData, ResponseData, Role, UserInterface } from '~~/nuxt';

export const useUserStore = defineStore('user', {
  state: (): UserInterface => ({
    username: undefined as unknown as string,
    role: undefined as unknown as Role,
  }),

  actions: {
    async register(body: RegisterData) {
      const { ok, data, message } = await $fetch<ResponseData<UserInterface>>(
        '/api/users/register',
        {
          method: 'POST',
          body,
        },
      );
      console.log(message);

      this.$patch({
        ...data,
      });

      return {
        message,
        ok,
      };
    },

    async login(body: RegisterData) {
      const { ok, data, message } = await $fetch<ResponseData<UserInterface>>(
        '/api/users/login',
        {
          method: 'POST',
          body,
        },
      );
      console.log(message);

      this.$patch({
        ...data,
      });

      return {
        message,
        ok,
      };
    },
  },
});
