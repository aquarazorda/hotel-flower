import { load } from 'cheerio';
import { getLoginCookies } from '.';
import { RoomWithFullData } from '~/server/db/zod';

export const getRoomsList = async () => {
  const { MS_ROOMS_URL } = process.env;
  if (!MS_ROOMS_URL) throw new Error('MS_ROOMS_URL is not defined');

  const cookies = await getLoginCookies();

  const headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Cookie', cookies);

  const html = await fetch(MS_ROOMS_URL, {
    headers,
    method: 'GET',
  }).then((res) => res.text());

  const $ = load(html);
  const rows = $('table.table tr');

  const data: { id: number, name: string, roomId: number, type: string, order?: number }[] = [];
  
  rows.each((i, elem) => {
    let td = $(elem).find('td');
    const name = td.eq(2).text().replace(/\.|,/g, '');
    
    let obj = { 
      id: parseInt(td.eq(0).text()),
      name,
      roomId: parseInt(td.eq(1).text()),
      type: name.toLowerCase().includes('room') ? 'room' : 'suite',
    };
    
    if (obj.roomId && obj.name !== 'overbooking') data.push(obj);
  });
  
  return data.map((room, idx) => ({
    ...room,
    order: idx,
  }));
}

export const isRoomAvailable = (from: string, to: string, dates: {from: string, to: string}[]) => {
  // Convert input strings to Date objects
  const fromDate = new Date(from);
  const toDate = new Date(to);

  // Check each blocked range
  for (const range of dates) {
    const blockedFrom = new Date(range.from);
    const blockedTo = new Date(range.to);

    // If there's overlap, return false
    if ((fromDate <= blockedTo && toDate >= blockedFrom)) {
      return false;
    }
  }

  // If no overlap found, return true
  return true;
}