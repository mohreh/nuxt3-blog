import { defineStore } from 'pinia';

export const useAlertStore = defineStore('alert', {
  state: () => ({
    show: false,
    status: false,
    message: undefined as unknown as string,
  }),

  actions: {
    alert(status: boolean, message: string) {
      this.$patch({
        show: true,
        status,
        message,
      });

      setTimeout(() => {
        this.show = false;
      }, 3000);
    },
  },
});
