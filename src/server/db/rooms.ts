import server$ from 'solid-start/server';
import { prisma } from './prisma';
import { getBookedDates } from '../lib/otelms';
import { query$ } from '@prpc/solid';

export const getRooms = query$(async () => {
  return await prisma.room.findMany();
}, "rooms-list");

export const getBookings = query$(async () => {
  const bookings = await prisma.blockedDate.findMany({
    select: {
      roomId: true,
      dates: true,
    }
  });
  
  return bookings;
}, "bookings-list");

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
