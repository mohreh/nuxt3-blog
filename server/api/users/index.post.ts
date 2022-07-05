import { PrismaClient } from '@prisma/client';
import jwt from '~~/server/utils/jwt';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const { username, password } = await useBody<RegisterBody>(event);
    const user = await prisma.user.create({
      data: {
        username,
        password,
      },
    });

    const accessToken = jwt.signPayload({
      sub: user.username,
    });

    setCookie(event, 'access_token', accessToken, {
      secure: true,
      sameSite: true,
    });

    return {
      ok: true,
      data: user,
    };
  } catch (err) {
    return {
      ok: false,
      error: err.message,
    };
  }
});
