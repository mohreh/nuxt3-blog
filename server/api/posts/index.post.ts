import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const user = await prisma.user.findUnique({
      where: {
        username: event.context.auth.username,
      },
    });

    if (!user) {
      return {
        ok: false,
        message: 'you must login first.',
      };
    }

    const post = await prisma.post.create({
      data: {
        ...body,
        authorId: user.id,
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
