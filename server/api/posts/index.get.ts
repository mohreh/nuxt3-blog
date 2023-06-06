import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (_event) => {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      text: true,
      title: true,
      slug: true,
      createdAt: true,
      author: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return posts;
});
