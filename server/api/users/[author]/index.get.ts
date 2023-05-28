import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const user = await prisma.user.findUnique({
    where: {
      username: event.context.params?.author,
    },
    select: {
      username: true,
      posts: true,
    },
  });

  if (!user) {
    throw createError({
      statusCode: 404,
      message: "user not found.",
    });
  }

  // todo
  return {
    ok: true,
    data: user,
  };
});
