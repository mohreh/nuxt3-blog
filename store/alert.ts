import { defineStore } from 'pinia';

export const useAlertStore = defineStore('alert', {
  state: () => ({
    show: false,
    status: false,
    message: undefined as unknown as string,
  }),

  actions: {
    alert(show: boolean, status: boolean, message: string) {
      this.$patch({
        show,
        status,
        message,
      });
    },
  },
});
