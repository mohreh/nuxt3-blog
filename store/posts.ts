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
    } else alert(true, "post created successfully.");

    return error.value ? false : true;
  };

  return { posts, createPost };
});
