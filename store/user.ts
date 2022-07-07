import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: (): UserInterface => ({
    username: undefined as string,
    role: undefined as Role,
  }),
});
