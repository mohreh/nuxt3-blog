import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  let { take: postCount, page } = getQuery(event) as {
    take: number;
    page: number;
  };

  if (!postCount) postCount = 7;
  if (!page) page = 1;

  const user = await prisma.user.findUnique({
    where: {
      username: event.context.params?.author,
    },
    select: {
      username: true,
      avatar: true,
      posts: {
        select: {
          title: true,
          createdAt: true,
          slug: true,
          tags: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: postCount * 1,
        skip: postCount * (page - 1),
      },
    },
  });

  if (!user) {
    throw createError({
      statusCode: 404,
      message: "user not found.",
    });
  }

  return user;
});
