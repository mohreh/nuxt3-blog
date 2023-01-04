import { Post } from '@prisma/client';
import { defineStore } from 'pinia';
import { CreatePost, PostInterface, ResponseData } from '~~/nuxt';
import { useAlertStore } from './alert';

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [] as PostInterface[],
  }),

  actions: {
    async fetchAll() {
      const { ok, message, data } = await $fetch<ResponseData<PostInterface[]>>(
        '/api/posts',
      );

      const alertStore = useAlertStore();
      if (!ok) {
        alertStore.alert(true, ok, message);
      }

      if (data) {
        this.posts = data;
      }
    },

    async create(body: CreatePost) {
      const alertStore = useAlertStore();

      const { ok, message } = await $fetch<ResponseData<Post>>('/api/posts', {
        method: 'POST',
        body,
      });

      alertStore.alert(true, ok, message ?? '');

      await this.fetchAll();
    },
  },
});
