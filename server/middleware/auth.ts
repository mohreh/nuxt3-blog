import { PrismaClient } from '@prisma/client';
import { objectPick } from '@vueuse/core';
import jwt from '../utils/jwt';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const accessToken = useCookie(event, 'access_token');

  if (accessToken) {
    const { sub } = jwt.verifyToken(accessToken);

    const user = await prisma.user.findUnique({
      where: {
        username: sub,
      },
    });

    event.context.auth = {
      ...objectPick(user, ['username', 'role']),
    };
  }
});
