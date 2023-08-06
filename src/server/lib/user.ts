import { z } from "zod";
import { prisma } from "../db/prisma";
import server$ from "solid-start/server";
import { mutation$ } from "@prpc/solid";
import { RoomWithFullData, roomFullSchema } from "../db/zod";
import { getBooking, getBookings, getRoom } from "../db/rooms";
import { isRoomAvailable } from "./otelms/rooms";
import { calculatePrices } from "./otelms/prices";
import { saveBooking } from "./otelms/save_booking";

export type User = z.infer<typeof userSchema>;

export const userSchema = z.object({
  firstName: z
    .string()
    .nonempty("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: z
    .string()
    .nonempty("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: z
    .string()
    .nonempty("Email address is required")
    .email("Invalid email address"),
  phone: z
    .string()
    .nonempty("Phone number is required")
    .min(8, "Phone number must be at least 8 characters"),
});

export const createUser = server$(async (data: User) => {
  const res = await prisma.user.create({
    data,
  });

  return res;
});

export const createTransaction = server$(
  async (
    userId: number,
    roomId: number,
    [dateFrom, dateEnd]: Date[],
    amount: number
  ) => {
    const res = await prisma.transaction.create({
      data: {
        userId,
        status: "init",
        dateFrom,
        dateEnd,
        roomId,
        amount,
      },
    });

    return res;
  }
);

export const editTransaction = server$(async (id: number, data) => {
  const res = await prisma.transaction.update({
    where: {
      id: id,
    },
    data,
  });

  return res;
});

const reservationSchema = z.object({
  room: roomFullSchema,
  dates: z.array(z.string()),
  user: userSchema,
});

export const validateReservation = async ({
  room,
  dates,
  user,
}: z.infer<typeof reservationSchema>): Promise<{
  success: false;
  message: string;
} | {
  success: true;
  data: {
    price: number;
    room: RoomWithFullData;
    userId: number;
  }
}> => {
  const isUserValid = userSchema.safeParse(user);
  if (!isUserValid.success) {
    return {
      success: false,
      message: "Incorrect user info, please check your data",
    };
  }

  const curRoomData = await getRoom(room.roomId);
  if (!curRoomData || !curRoomData.blockedDate?.dates) {
    return {
      success: false,
      message: "Room is not available, please select another dates",
    };
  }

  const available = isRoomAvailable(dates[0], dates[1], curRoomData.blockedDate?.dates);
  if (!available) {
    return {
      success: false,
      message: "Room is not available, please select another dates",
    };
  }

  const price = calculatePrices(dates, curRoomData);
  if (!price) {
    return {
      success: false,
      message: "Room is not available, please select another dates",
    };
  }

  const { id } = await createUser(user);

  return {
    success: true,
    data: {
      price,
      room: curRoomData,
      userId: id,
    },
  };
};

export const createReservation = mutation$({
  schema: reservationSchema,
  key: "createReservation",
  mutationFn: async ({ payload }) => {
    const data = await validateReservation(payload);

    if (!data.success || !data.data) {
      return data;
    }

    const { price, room, userId } = data.data;

    try {
      const res = await saveBooking({
        from: payload.dates[0],
        to: payload.dates[1],
        room,
        user: payload.user,
        type: "reservation",
        price,
      });

      return {
        success: true,
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        message: "Something went wrong, please try again later",
      };
    }
  },
});
