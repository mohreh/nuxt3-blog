import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const post = await prisma.post.findUnique({
    where: {
      slug_authorId: {
        slug: event.context.params?.slug as string,
        authorId: event.context.params?.author as string,
      },
    },
    include: {
      author: {
        select: {
          username: true,
          avatar: true,
        },
      },
      tags: true,
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
