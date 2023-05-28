import { defineStore } from "pinia";

export const useAlertStore = defineStore("alert", () => {
  const show = ref(false);
  const status = ref(false);
  const message = ref("");

  const alert = (
    alertStatus: boolean,
    alertMessage: string,
    alertTimeoute = 3000,
  ) => {
    show.value = true;
    status.value = alertStatus;
    message.value = alertMessage;

    setTimeout(() => {
      show.value = false;
    }, alertTimeoute);
  };

  return {
    show,
    status,
    message,
    alert,
  };
});
