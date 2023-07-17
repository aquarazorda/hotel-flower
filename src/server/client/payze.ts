import { ExpectedInput, FilterOutResponse, FlattenArray, IMiddleware, InferFinalMiddlware, mutation$ } from '@prpc/solid';
import { payWithPayze } from '../lib/payze';
import { userSchema } from '../lib/user';
import { z } from 'zod';
import { roomFullSchema } from '../db/zod';

const payInputSchema = z.object({
  user: userSchema,
  room: roomFullSchema,
  dates: z.array(z.string()),
})

export type PayzeInput = z.infer<typeof payInputSchema>;

export const payzeMutation = mutation$({
  key: "payWithPayze",
  schema: payInputSchema,
  mutationFn: ({ payload }) => {
    return payWithPayze(payload);
  },
})