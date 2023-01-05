import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { RegisterData } from '~~/nuxt';
import jwt from '~~/server/utils/jwt';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const { username, password } = await readBody<RegisterData>(event);

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return {
        ok: false,
        message: 'no user registered in with this username!',
      };
    }

    if (bcrypt.compareSync(password, user.password)) {
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
        message: `welcome back ${user.username}`,
      };
    }

    return {
      ok: false,
      message: 'password is wrong.',
    };
  } catch (err) {
    let message = 'Unknown Error';
    if (err instanceof Error) message = err.message;
    return {
      ok: false,
      message,
    };
  }
});
