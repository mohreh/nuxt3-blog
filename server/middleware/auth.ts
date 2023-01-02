import { PrismaClient } from '@prisma/client';
import jwt from '../utils/jwt';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const accessToken = getCookie(event, 'access_token');

  if (accessToken) {
    const { sub } = jwt.verifyToken(accessToken);

    const user = await prisma.user.findUnique({
      where: {
        username: sub,
      },
    });

    event.context.auth = {
      username: user?.username,
      role: user?.role,
    };
  }
});
