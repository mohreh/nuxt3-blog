import { Post, Tag } from "@prisma/client";

declare global {
  namespace nitro {
    interface H3EventContext {
      auth: {
        username: string;
        role: Role;
      };
    }
  }
}

interface RegisterData {
  username: string;
  password: string;
}

interface JwtPayload {
  sub: string;
}

interface ResponseData<T> {
  ok: boolean;
  message?: string;
  data?: T;
}

interface UserInterface {
  username: string;
  role: Role;
  avatar: string;
}

interface PostInterface extends Post {
  createdAt: string;
  author: Author;
  tags: Tag[];
}

interface Author {
  username: string;
  avatar: string;
  posts: PostInterface[];
}

enum Role {
  User = "User",
  Admin = "Admin",
}

interface CreatePost {
  title: string;
  text: string;
}
