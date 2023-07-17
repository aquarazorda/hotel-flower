import { z } from 'zod';
import { prisma } from '../db/prisma';
import server$ from 'solid-start/server';

export type User = z.infer<typeof userSchema>;

export const userSchema = z.object({
  firstName: z
    .string()
    .nonempty("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: z
    .string()
    .nonempty("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: z
    .string()
    .nonempty("Email address is required")
    .email("Invalid email address"),
  phone: z
    .string()
    .nonempty("Phone number is required")
    .min(8, "Phone number must be at least 8 characters"),
});

export const createUser = server$(async (data: User) => {
  const res = await prisma.user.create({
    data
  });

  return res;
});

export const createTransaction = server$(async (userId: number, roomId: number, [dateFrom, dateEnd]: Date[], amount: number) => {
  const res = await prisma.transaction.create({
    data: {
      userId,
      status: "init",
      dateFrom,
      dateEnd,
      roomId,
      amount
    }
  });

  return res;
});

export const editTransaction = server$(async (id: number, data) => {
  const res = await prisma.transaction.update({
    where: {
      id: id
    },
    data
  });

  return res;
});