import { saveBookings } from '~/db/db';
import { getBookedDates, getLoginCookies } from '~/lib/otelms';

export const GET = async () => {
  const dates = await getBookedDates();
  return await saveBookings(dates);
}