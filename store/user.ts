import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: (): UserInterface => ({
    username: undefined as unknown as string,
    role: undefined as unknown as Role,
  }),
});
