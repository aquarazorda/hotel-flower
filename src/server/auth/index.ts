// src/auth/lucia.ts
import { lucia } from "lucia";
import { web } from "lucia/middleware";
import { prisma as prismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "~/server/db/prisma";
import "lucia/polyfill/node";

export const auth = lucia({
  middleware: web(),
  env: import.meta.env.PROD ? "PROD" : "DEV",
  sessionCookie: {
    expires: false,
  },
  adapter: prismaAdapter(prisma),
});

export type Auth = typeof auth;
