import { PrismaClient } from "@prisma/client";
import slugify from "@sindresorhus/slugify";

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
  body.slug = slugify(body.title);

  const existingPostWithSameSlug = await prisma.post.findFirst({
    where: {
      slug: body.slug,
      authorId: user.username,
    },
  });

  if (existingPostWithSameSlug) {
    throw createError({
      statusCode: 409,
      statusMessage:
        "you have already writed a post with this title, change it if you wish.",
    });
  }

  const post = await prisma.post.create({
    data: {
      ...body,

      tags: {
        connect: body.tags,
      },

      authorId: user.username,
    },
  });

  return post;
});
