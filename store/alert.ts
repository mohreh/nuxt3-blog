import { defineStore } from "pinia";

export const useAlertStore = defineStore("alert", {
  state: () => ({
    show: false,
    status: false,
    message: undefined as unknown as string,
  }),

  actions: {
    alert(status: boolean, message: string, timeout: number = 3000) {
      this.$patch({
        show: true,
        status,
        message,
      });

      setTimeout(() => {
        this.show = false;
      }, timeout);
    },
  },
});
