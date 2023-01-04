import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const post = await prisma.user.findUnique({
      where: {
        username: event.context.params.author,
      },
      select: {
        username: true,
        posts: true,
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
