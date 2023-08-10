import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const user = await prisma.user.findUnique({
    where: {
      username: event.context.params?.author,
    },
    select: {
      posts: {
        select: {
          tags: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  const tags = user?.posts.flatMap((post) =>
    post.tags.map((tag) => tag.name),
  );

  if (!user) {
    throw createError({
      statusCode: 404,
      message: "user not found.",
    });
  }

  return tags;
});
