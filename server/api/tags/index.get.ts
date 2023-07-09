import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  let { s } = getQuery(event);

  if (typeof s !== "string") s = "";

  const tags = await prisma.tag.findMany({
    where: {
      name: {
        contains: s,
      },
    },
  });

  return tags;
});
