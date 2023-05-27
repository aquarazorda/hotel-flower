import { PrismaClient } from "@prisma/client";
import server$ from "solid-start/server";
import { getBookedDates } from "~/server/lib/otelms";

const prisma = new PrismaClient();

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

export const getRooms = server$(async () => {
  return await prisma.room.findMany();
});

export const getBookings = server$(async () => {
  const bookings = await prisma.blockedDate.findMany();

  return bookings;
});

export const getBooking = server$(async (roomId: number) => {
  const booking = await prisma.blockedDate.findUnique({
    where: {
      roomId
    },
  });

  return booking;
});

export const saveBookings = server$(async () => {
  const data = await getBookedDates();

  const q = await prisma.blockedDate.deleteMany({})
    .then(() => prisma.blockedDate.createMany({
      data,
    }))

  return new Response(JSON.stringify(q));
});
