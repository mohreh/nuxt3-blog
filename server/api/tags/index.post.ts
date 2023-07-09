import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

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

  const existingTag = prisma.tag.findFirst({
    where: {
      name: body.name,
    },
  });

  if (existingTag) {
    return existingTag;
  }

  const tag = prisma.tag.create({
    data: {
      name: body.name,
    },
  });

  return tag;
});
