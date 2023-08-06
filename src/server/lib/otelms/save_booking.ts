import { Room } from "~/shared/data/rooms";
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
