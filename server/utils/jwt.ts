import jwt from 'jsonwebtoken';
import { JwtPayload } from '~~/nuxt';

export default {
  signPayload: (payload: Record<string, unknown>) => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXP,
    });
  },
  verifyToken: (token: string): JwtPayload => {
    return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
  },
};
