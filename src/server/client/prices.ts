import { mutation$ } from '@prpc/solid';
import { z } from 'zod';
import { prisma } from '../db/prisma';

export const savePricePercent = mutation$({
  schema: z.object({
    roomId: z.number(),
    list: z.record(z.number()),
  }),
  key: "save-price-percent",
  mutationFn: async ({ payload }) => {
    const { roomId, list } = payload;
    const res = await prisma.priceAdjustment.upsert({
      where: {
        roomId
      },
      update: {
        list
      },
      create: {
        roomId,
        list
      }
    });

    return res;
  }
})