import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const post = await prisma.post.findMany({
    where: {
      authorId: event.context.params?.author as string,
    },
    include: {
      tags: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!post) {
    throw createError({
      statusCode: 404,
      statusMessage: `Post with title: ${event.context.params?.slug} and author: ${event.context.params?.author} doesn't exist.`,
    });
  }

  return post;
});
