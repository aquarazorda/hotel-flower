import server$ from "solid-start/server";
import { prisma } from "./prisma";
import { getBookedDates } from "../lib/otelms";
import { query$ } from "@prpc/solid";
import { RoomWithFullData } from "./zod";
import { z } from "zod";

const blockedDateSchema = z.array(
  z.object({
    from: z.string(),
    to: z.string(),
  })
);

export const getRooms = query$({
  schema: z.object({
    type: z.union([z.literal('suite'), z.literal('room')]).optional(),
  }),
  queryFn: async ({ payload }) => {
    const rooms = await prisma.room.findMany({
      select: {
        id: true,
        type: true,
        blockedDate: true,
        info: true,
        name: true,
        prices: true,
        roomId: true,
        order: true
      },
      orderBy: {
        order: "asc",
      },
      where: {
        type: {
          equals: payload?.type,
        }
      }
    });
  
    return rooms as RoomWithFullData[]; 
  },
  key: "rooms-list",
});

export const getBookings = query$(async () => {
  const bookings = await prisma.blockedDate.findMany({
    select: {
      roomId: true,
      dates: true,
    },
  });

  return bookings;
}, "bookings-list");

export const getBooking = server$(async (roomId: number) => {
  const booking = await prisma.blockedDate.findUnique({
    where: {
      roomId,
    },
  });

  const datesParsed = blockedDateSchema.safeParse(booking?.dates);

  return {
    ...booking,
    dates: datesParsed.success ? datesParsed.data : [],
  };
});

export const getRoom = server$(async (roomId: number) => {
  const room = await prisma.room.findUnique({
    where: {
      roomId,
    },
    select: {
      id: true,
      name: true,
      roomId: true,
      prices: {
        select: {
          list: true,
        },
      },
      blockedDate: {
        select: {
          dates: true,
        },
      },
      info: {
        select: {
          description: true,
          extraPerson: true,
          persons: true,
          pictures: true,
        },
      },
    },
  });

  return room as RoomWithFullData | null;
});

export const saveBookings = server$(async () => {
  const data = await getBookedDates();

  await prisma.blockedDate.deleteMany({});
  const q = await prisma.blockedDate.createMany({
    data,
  });

  return new Response(JSON.stringify(data));
});
