import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
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
        error: 'no user registered in with this username!',
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
      };
    }

    return {
      ok: false,
      error: 'password is wrong.',
    };
  } catch (err) {
    return {
      ok: false,
      error: err.message,
    };
  }
});
