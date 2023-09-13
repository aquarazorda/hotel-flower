import { mutation$ } from '@prpc/solid';
import { z } from 'zod';
import { prisma } from '../db/prisma';

export const roomInfoSchema = z.object({
  description: z.string(),
  pictures: z.number(),
  persons: z.number(),
  extraPerson: z.boolean(),
});

export type RoomInfoForm = z.infer<typeof roomInfoSchema>;

export const saveRoomInfo = mutation$({
  schema: roomInfoSchema.extend({
    roomId: z.number()
  }),
  key: "save-room-info",
  mutationFn: async ({ payload }) => {
    const { roomId, ...rest } = payload;
    
    const res = await prisma.roomInfo.upsert({
      where: {
        roomId
      },
      update: rest,
      create: {
        roomId: roomId,
        ...rest,
      }
    });

    return res;
  }
})