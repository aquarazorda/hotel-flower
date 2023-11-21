import { mutation$ } from "@prpc/solid";
import { z } from "zod";
import { prisma } from "../db/prisma";
import { roomFullSchema } from "../db/zod";

export const roomInfoSchema = z.object({
  description: z.string().optional(),
  pictures: z.array(z.number()).optional(),
  persons: z.number().optional(),
  extraPerson: z.boolean().optional(),
});

export type RoomInfoForm = z.infer<typeof roomInfoSchema>;

export const saveRoomInfo = mutation$({
  schema: roomInfoSchema.extend({
    roomId: z.number(),
  }),
  key: "save-room-info",
  mutationFn: async ({ payload }) => {
    const { roomId, ...rest } = payload;
    const res = await prisma.roomInfo.upsert({
      where: {
        roomId,
      },
      update: rest,
      create: {
        roomId: roomId,
        ...rest,
      },
    });

    return res;
  },
});

export const saveRoomOrder = mutation$({
  key: "saveRoomOrder",
  mutationFn: async ({ payload }) => {
    return await prisma.$transaction(
      payload.map((room) =>
        prisma.room.update({
          where: { id: room.id },
          data: { order: room.order },
        }),
      ),
    );
  },
  schema: z.array(
    z.object({
      id: z.number(),
      order: z.number(),
    }),
  ),
});
