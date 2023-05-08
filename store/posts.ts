import { Post } from "@prisma/client";
import { defineStore } from "pinia";
import { CreatePost, PostInterface, ResponseData } from "~~/nuxt";
import { useAlertStore } from "./alert";

export const usePostStore = defineStore("post", {
  state: () => ({
    posts: [] as PostInterface[],
    fetched_posts: [] as Post[],
  }),

  actions: {
    async fetchAll() {
      const { ok, message, data } = await $fetch<ResponseData<PostInterface[]>>(
        "/api/posts",
      );

      const alertStore = useAlertStore();
      if (!ok) {
        alertStore.alert(ok, message);
      }

      if (data) {
        this.posts = data;
      }
    },

    async create(body: CreatePost) {
      const alertStore = useAlertStore();

      const { ok, message } = await $fetch<ResponseData<Post>>("/api/posts", {
        method: "POST",
        body,
      });

      alertStore.alert(ok, message ?? "");

      await this.fetchAll();
    },

    async fetch_post(
      author: string,
      title: string,
    ): Promise<ResponseData<Post>> {
      const post = this.fetched_posts.find((post) => {
        return post.title === title && post.authorId === author;
      });

      if (post) {
        return {
          ok: true,
          data: post,
        };
      }

      let { ok, message, data } = await $fetch<ResponseData<Post>>(
        `/api/users/${author}/${title}`,
      );

      const alertStore = useAlertStore();
      if (!ok) {
        message = message + "\n Returning to Home";
        alertStore.alert(false, message, 5000);
        return {
          ok: false,
          message,
        };
      }

      this.fetched_posts.push(data as Post);
      return {
        ok: true,
        data: data as Post,
      };
    },
  },
});
