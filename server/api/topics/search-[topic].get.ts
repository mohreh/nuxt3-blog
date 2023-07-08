import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler((event) => {
  const topic = event.context.params?.topic;

  const topics = prisma.topic.findMany({
    where: {
      name: {
        contains: topic,
      },
    },
  });

  return topics;
});
