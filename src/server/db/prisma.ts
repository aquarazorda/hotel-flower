import { PrismaClient } from "@prisma/client";
import server$ from "solid-start/server";

export const prisma = new PrismaClient();

export const authenticate = server$(
  async ({ username, password }: { username: string; password: string }) => {
    const user = await prisma.user.findFirst({
      where: {
        username,
        password,
      },
    });

    return Boolean(user);
  }
);