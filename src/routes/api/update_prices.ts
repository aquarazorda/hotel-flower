import { prisma } from '~/server/db/prisma';
import { getPrices } from '~/server/lib/otelms/prices';

export const GET = async () => {
  const data = await getPrices();
  
  await prisma.price.deleteMany();
  await prisma.price.createMany({
    data
  });

  return new Response("OK");
}