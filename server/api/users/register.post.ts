import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import jwt from '~~/server/utils/jwt';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const { username, password } = await useBody<RegisterData>(event);

    const hashedPassword = bcrypt.hashSync(
      password,
      parseInt(process.env.SALT_ROUNDS),
    );

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
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
