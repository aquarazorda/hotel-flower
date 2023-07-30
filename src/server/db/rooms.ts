import server$ from 'solid-start/server';
import { prisma } from './prisma';
import { getBookedDates } from '../lib/otelms';
import { query$ } from '@prpc/solid';
import { RoomWithFullData } from './zod';

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

export const getRoom = server$(async (roomId: number) => {
  const room = await prisma.room.findUnique({
    where: {
      roomId
    },
    select: {
      id: true,
      name: true,
      roomId: true,
      msId: true,
      prices: {
        select: {
          list: true
        }
      },
      blockedDate: {
        select: {
          dates: true
        }
      },
      info: {
        select: {
          description: true,
          extraPerson: true,
          persons: true,
          pictures: true,
        }
      }
    }
  });

  return room as RoomWithFullData | null;
});

export const saveBookings = server$(async () => {
  const data = await getBookedDates();

  await prisma.blockedDate.deleteMany({})
  const q = await prisma.blockedDate.createMany({
    data,
  });

  return new Response(JSON.stringify(q));
});
