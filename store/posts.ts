import { Post } from "@prisma/client";
import { defineStore } from "pinia";
import { CreatePost, PostInterface, ResponseData } from "~~/nuxt";
import { useAlertStore } from "./alert";

export const usePostStore = defineStore("post", {
  state: () => ({
    posts: [] as PostInterface[],
    fetched_posts: [] as PostInterface[],
  }),

  actions: {
    async fetchAll() {
      const { alert } = useAlertStore();

      const { ok, message, data } = await $fetch<
        ResponseData<PostInterface[]>
      >("/api/posts");

      const alertStore = useAlertStore();
      if (!ok) {
        alertStore.alert(ok, message ?? "");
      }

      if (data) {
        this.posts = data;
      }
    },

    async create(body: CreatePost) {
      const { alert } = useAlertStore();
      try {
        await $fetch<Post>("/api/posts", {
          method: "POST",
          body,
        });

        alert(true, "post create successfully.");

        await this.fetchAll();
      } catch (err) {
        let message = "Unknown Error";
        if (err instanceof Error) message = err.message;
        alert(false, message);
      }
    },

    async fetch_post(
      author: string,
      title: string,
    ): Promise<ResponseData<PostInterface>> {
      const post = this.fetched_posts.find((post) => {
        return post.title === title && post.authorId === author;
      });

      if (post) {
        return {
          ok: true,
          data: post,
        };
      }

      let { ok, message, data } = await $fetch<
        ResponseData<PostInterface>
      >(`/api/users/${author}/${title}`);

      const { alert } = useAlertStore();
      if (!ok) {
        message = message + "\n Returning to Home";
        alert(false, message, 5000);
        return {
          ok: false,
          message,
        };
      }

      this.fetched_posts.push(data as PostInterface);
      return {
        ok: true,
        data,
      };
    },
  },
});
