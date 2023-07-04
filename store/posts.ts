import { Post } from "@prisma/client";
import { defineStore } from "pinia";
import { CreatePost, PostInterface } from "~~/nuxt";
import { useAlertStore } from "./alert";

export const usePostStore = defineStore("post", () => {
  const { alert } = useAlertStore();
  const posts = ref<PostInterface[]>([]);

  const createPost = async (body: CreatePost) => {
    const { error } = await useFetch<Post>("/api/posts", {
      method: "POST",
      body,
    });

    console.log(error.value);

    if (error.value) {
      alert(false, error.value.message);
    } else alert(true, "post create successfully.");
  };

  const fetchPost = async (author: string, titleSlug: string) => {
    const post = await useFetchWithCache<PostInterface>(
      `/api/users/${author}/${titleSlug}`,
      // (error) => {
      //   alert(false, error.message, 5000);
      //   setTimeout(() => router.push("/"), 2000);
      // },
    );

    return post;
  };

  return { posts, createPost, fetchPost };
});
