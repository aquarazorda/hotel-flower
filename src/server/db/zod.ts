import { z } from "zod";

export type RoomWithFullData = z.infer<typeof roomFullSchema>;

export const roomFullSchema = z.object({
  id: z.number(),
  name: z.string(),
  roomId: z.number(),
  order: z.number(),
  type: z.union([z.literal('room'), z.literal('suite')]),
  prices: z.nullable(
    z.object({
      list: z.record(z.number()),
    })
  ),
  blockedDate: z.nullable(
    z.object({
      dates: z.array(
        z.object({
          from: z.string(),
          to: z.string(),
        })
      ),
    })
  ),
  info: z.nullable(
    z.object({
      description: z.string(),
      extraPerson: z.boolean(),
      persons: z.number(),
      pictures: z.array(z.number()),
    })
  ),
});
