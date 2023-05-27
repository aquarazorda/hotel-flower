import { Room } from '~/shared/data/rooms';
import { getLoginCookies } from '.';
import { User } from '../user';
import server$ from 'solid-start/server';

type Props = {
  room: Room,
  from: string,
  to: string,
  user: User,
  price: number
}

export const saveBooking = server$(async ({
  from,
  to,
  user,
  price
}: Props) => {
  const { MS_SAVE_URL } = process.env;

  if (!MS_SAVE_URL) {
    throw new Error("Missing env variables");
  }

  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  headers.append("Cookie", await getLoginCookies());

  const body = new URLSearchParams();
  body.append("room_id", "1");
  body.append("datein", from);
  body.append("dateout", to);
  body.append("firstname", user.firstName);
  body.append("lastname", user.lastName);
  body.append('is_guest', '1');
  body.append('phone', user.phone);
  body.append('email', user.email);
  body.append('adults', '2');
  body.append('checkintime', '13:30');
  body.append('checkouttime', '12:00');
  body.append('price_type', '1');
  body.append('service_main_amount', price.toString());
  body.append('description', `საიტიდან გადახდილია ${price} ლარი`);


  return await fetch("https://hotelflower.otelms.com/reservations/save_modal", {
    headers,
    body,
    // body: "room_id=20&datein=2023-12-04&dateout=2023-12-07&hms_id=0&insert_or_update_guest_id=0&room_id=20&firstname=Firstname&lastname=Lastname&middlename=&is_guest=1&phone=%2B99555443345453&email=thisisemail%40testingflowerhotel.ge&datein=2023-12-04&checkintime=13%3A30&duration=3&dateout=2023-12-07&checkouttime=12%3A00&adults=2&baby_places=0&babyplace2=0&addbedplace=0&service_main_amount_2=0&price_type=1&tourtax=0&percent_discount=0&discount=0&service_main_amount=1080&marker=0&intgroupid=&dealer=1&description=%E1%83%92%E1%83%90%E1%83%93%E1%83%90%E1%83%AE%E1%83%93%E1%83%98%E1%83%9A%E1%83%98%E1%83%90",
    method: "POST",
  });
});