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
    },
  });

  if (!post) {
    throw createError({
      statusCode: 404,
      message: `Post with title: ${event.context.params?.title} and author: ${event.context.params?.author} doesn't exist.`,
    });
  }

  // todo
  return {
    ok: true,
    data: post,
  };
});
