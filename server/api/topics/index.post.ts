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

  const existingTopic = prisma.topic.findFirst({
    where: {
      name: body.name,
    },
  });

  if (existingTopic) {
    return existingTopic;
  }

  const topic = prisma.topic.create({
    data: {
      name: body.name,
    },
  });

  return topic;
});
