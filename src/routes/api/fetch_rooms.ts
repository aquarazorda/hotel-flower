import { prisma } from "~/server/db/prisma";
import { getRoomsList } from "~/server/lib/otelms/rooms";

export const GET = async () => {
  const rooms = await getRoomsList();

  await prisma.room.createMany({
    data: rooms,
  });

  return new Response(JSON.stringify(rooms));
};
