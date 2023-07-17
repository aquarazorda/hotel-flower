import server$ from "solid-start/server";
import {
  User,
  createTransaction,
  createUser,
  editTransaction,
  userSchema,
} from "./user";
import { getRoom } from "../db/rooms";
import { calculatePrices } from "./otelms/prices";
import { RoomWithFullData } from '../db/zod';
import { PayzeInput } from '../client/payze';

const getOptions = (
  room: RoomWithFullData,
  price: number,
  transactionId: number
) => ({
  method: "POST",
  headers: { accept: "application/json", "content-type": "application/json" },
  body: JSON.stringify({
    method: "justPay",
    apiKey: process.env.PAYZE_KEY,
    apiSecret: process.env.PAYZE_SECRET,
    data: {
      amount: price,
      currency: "GEL",
      callback: "https://flowertbilisi.com/payment/success",
      callbackError: "https://corp.com/fail_url", // TODO
      preauthorize: false,
      lang: "EN", // TODO
      // info: {
      //   description: room.description,
      //   image: "https://flowertbilisi.com/img/home/main.webp", // TODO
      //   name: room.name,
      // },
      hookRefund: false,
    },
  }),
});

export const payWithPayze = async (
  input: PayzeInput  
): Promise<
  | {
      success: false;
      error: string;
    }
  | {
      success: true;
      url: string;
    }
> => {
  const { room, user, dates } = input;

  if (!room || !dates || dates.length < 2) {
    return {
      success: false,
      error: "Incorrect input data",
    };
  }

  const isUserValid = userSchema.safeParse(user);
  if (!isUserValid.success) {
    return {
      success: false,
      error: isUserValid.error.format()._errors.join(", "),
    };
  }

  const room_ = await getRoom(room.roomId);
  if (!room_) {
    return {
      success: false,
      error: "Room not found",
    };
  }

  const price = calculatePrices(dates, room_);

  if (!price) {
    return {
      success: false,
      error: "Price not found",
    };
  }

  try {
    const { id } = await createUser(user);
    const transaction = await createTransaction(
      id,
      room.roomId,
      [new Date(dates[0]), new Date(dates[1])],
      price
    );

    const options = getOptions(room, price, transaction.id);

    const payzeResponse = (await fetch("https://payze.io/api/v1", options).then(
      (response) => response.json()
    )) as {
      response: {
        transactionUrl: string;
        transactionId: string;
      };
    };

    editTransaction(transaction.id, {
      transactionId: payzeResponse.response.transactionId,
      status: "pending",
    });

    return { success: true, url: payzeResponse.response.transactionUrl };
  } catch (e) {
    return { success: false, error: "Something went wrong" };
  }
};
