import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (_event) => {
  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        text: true,
        title: true,
        createdAt: true,
        author: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      ok: true,
      data: posts,
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
