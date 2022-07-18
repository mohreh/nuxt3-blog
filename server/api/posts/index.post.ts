import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await useBody(event);

    const user = await prisma.user.findUnique({
      where: {
        username: event.context.auth.username,
      },
    });

    if (!user) {
      return {
        ok: false,
        error: 'you must login first.',
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
    console.log(err);
    return {
      ok: false,
      error: err.message,
    };
  }
});
