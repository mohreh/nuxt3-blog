import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        title_authorId: {
          title: event.context.params.title,
          authorId: event.context.params.author,
        },
      },
    });

    return {
      ok: true,
      data: post,
    };
  } catch (err) {
    let message = 'Unknown Error';
    if (err instanceof Error) message = err.message;

    return {
      ok: false,
      message,
    };
  }
});
