import { load } from 'cheerio';
import { getLoginCookies } from '.';

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

  const data: { id: number, msId: number, name: string, roomId: number }[] = [];
  rows.each((i, elem) => {
    let td = $(elem).find('td');

    let obj = {
      id: parseInt(td.eq(0).text()),
      msId: parseInt(td.eq(1).text()),
      name: td.eq(3).text().replace(/\.|,/g, ''),
      roomId: parseInt(td.eq(4).text()),
    };
    
    if (obj.roomId) data.push(obj);
  });
  
  return data;
}