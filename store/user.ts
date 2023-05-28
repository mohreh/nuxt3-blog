import { defineStore } from "pinia";
import { RegisterData, ResponseData, Role, UserInterface } from "~~/nuxt";
import { useAlertStore } from "./alert";

export const useUserStore = defineStore("user", {
  state: (): UserInterface => ({
    username: undefined as unknown as string,
    role: undefined as unknown as Role,
    avatar: undefined as unknown as string,
  }),

  actions: {
    async register(body: RegisterData) {
      const { ok, data, message } = await $fetch<
        ResponseData<UserInterface>
      >("/api/users/register", {
        method: "POST",
        body,
      });

      this.$patch({
        ...data,
      });

      const alertStore = useAlertStore();
      alertStore.alert(ok, message ?? "");

      return {
        message,
        ok,
      };
    },

    async login(body: RegisterData) {
      const { ok, data, message } = await $fetch<
        ResponseData<UserInterface>
      >("/api/users/login", {
        method: "POST",
        body,
      });

      this.$patch({
        ...data,
      });

      const alertStore = useAlertStore();
      alertStore.alert(ok, message ?? "");

      return {
        message,
        ok,
      };
    },
  },
});
