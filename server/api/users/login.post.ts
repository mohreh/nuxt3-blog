import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { RegisterData } from "~~/nuxt";
import jwt from "~~/server/utils/jwt";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody<RegisterData>(event);

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    throw createError({
      statusCode: 404,
      message: "username doesn't exists",
    });
  }

  if (bcrypt.compareSync(password, user.password)) {
    const accessToken = jwt.signPayload({
      sub: user.username,
    });

    setCookie(event, "access_token", accessToken, {
      secure: true,
      sameSite: true,
    });

    // todo
    return {
      ok: true,
      data: user,
      message: `welcome back ${user.username}`,
    };
  }

  throw createError({
    statusCode: 400,
    message: "password is wrong",
  });
});
