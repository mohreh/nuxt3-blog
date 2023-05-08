import { personas } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { RegisterData } from "~~/nuxt";
import jwt from "~~/server/utils/jwt";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const { username, password } = await readBody<RegisterData>(event);

    const hashedPassword = bcrypt.hashSync(
      password,
      parseInt(process.env.SALT_ROUNDS as string),
    );

    const image = createAvatar(personas, {
      seed: username,
    });
    const avatar = image.toString();

    const user = await prisma.user.create({
      data: {
        username,
        avatar,
        password: hashedPassword,
      },
    });

    const accessToken = jwt.signPayload({
      sub: user.username,
    });

    setCookie(event, "access_token", accessToken, {
      secure: true,
      sameSite: true,
    });

    return {
      ok: true,
      data: user,
      message:
        `welcome ${user.username}, try writing your first post by clicking in your profile icon in the navbar`,
    };
  } catch (err) {
    let message = "Unknown Error";
    if (err instanceof Error) message = err.message;
    return {
      ok: false,
      message,
    };
  }
});
