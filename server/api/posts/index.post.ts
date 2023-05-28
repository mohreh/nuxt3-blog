import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const user = await prisma.user.findUnique({
    where: {
      username: event.context.auth.username,
    },
  });

  if (!user) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized.",
    });
  }

  const body = await readBody(event);

  const post = await prisma.post.create({
    data: {
      ...body,
      slug: (body.title as string)
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, ""),
      authorId: user.username,
    },
  });

  // todo
  return {
    ok: true,
    message: "created successfully",
    data: post,
  };
});
