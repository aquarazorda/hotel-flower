import { getPrices } from '~/server/lib/otelms/prices';

export const GET = async () => {

  return new Response(JSON.stringify(await getPrices()));
}