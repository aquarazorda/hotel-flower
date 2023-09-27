import { getLoginCookies } from ".";
import { User } from "../user";
import server$ from "solid-start/server";
import { RoomWithFullData } from '~/server/db/zod';

type Props = {
  room: RoomWithFullData;
  from: string;
  to: string;
  user: User;
  price: number;
  type: "booking" | "reservation";
};

export const saveBooking = server$(
  async ({ from, to, user, price, type, room }: Props) => {
    const { MS_SAVE_URL } = process.env;

    if (!MS_SAVE_URL) {
      throw new Error("Missing env variables");
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("Cookie", await getLoginCookies());

    const body = new URLSearchParams();
    body.append("room_id", String(room.msId));
    body.append("datein", from);
    body.append("dateout", to);
    body.append("firstname", user.firstName);
    body.append("lastname", user.lastName);
    body.append("is_guest", "1");
    body.append("phone", user.phone);
    body.append("email", user.email);
    body.append("adults", "2");
    body.append("checkintime", "13:30");
    body.append("checkouttime", "12:00");
    body.append("price_type", "1");
    body.append("service_main_amount", price.toString());
    body.append("marker", "3");
    body.append("user", "28");
    body.append("hms_id", "0");
    body.append("insert_or_update_guest_id", "0");
    
    // "room_id=18&datein=2023-12-21&dateout=2023-12-26&hms_id=0&insert_or_update_guest_id=0&room_id=18&firstname=Givi&lastname=Gelashvili&middlename=&is_guest=1&phone=555435335&email=givi.gelashvili%40protonmail.ch&datein=2023-12-21&checkintime=13%3A30&duration=5&dateout=2023-12-26&checkouttime=12%3A00&adults=2&baby_places=0&babyplace2=0&addbedplace=0&service_main_amount_2=0&price_type=1&tourtax=0&percent_discount=0&discount=50&service_main_amount=1800&marker=3&intgroupid=&dealer=1&user=28&description=%E1%83%A0%E1%83%94%E1%83%96%E1%83%94%E1%83%A0%E1%83%95%E1%83%90%E1%83%AA%E1%83%98%E1%83%90+%E1%83%A1%E1%83%90%E1%83%98%E1%83%A2%E1%83%98%E1%83%93%E1%83%90%E1%83%9C&avoidtime_days=&avoidtime_hours=&avoidtime_minutes=&cardnumber=&exp_date=&cardholder=&cvc=",
    body.append(
      "description",
      type === "reservation"
        ? `დაჯავშნილია საიტიდან, გადასახდელია ${price} ლარი`
        : `საიტიდან გადახდილია ${price} ლარი`
    );

    console.log("body", body);

    return await fetch(
      "https://hotelflower.otelms.com/reservations/save_modal",
      {
        headers,
        body,
        method: "POST",
      }
    );
  }
);
