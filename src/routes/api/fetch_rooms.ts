import { prisma } from "~/server/db/prisma";
import { getRoomsList } from "~/server/lib/otelms/rooms";

export const GET = async () => {
  const rooms = await getRoomsList();

  // await prisma.room.deleteMany({});
  // await prisma.room.createMany({
  //   data: rooms,
  // });
  rooms.forEach(async (room) => {
    const { id, ...rest } = room;
    await prisma.room.upsert({
      where: { id: room.id },
      update: rest,
      create: rest,
    });
  });


  return new Response(JSON.stringify(rooms));
};
