import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const tag = event.context.params?.tag;

  const tags = await prisma.tag.findMany({
    where: {
      name: {
        contains: tag,
      },
    },
  });

  return tags;
});
