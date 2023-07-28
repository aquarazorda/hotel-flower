export type Room = {
  type: "room" | "suite";
  id: number;
  secondary?: number;
  name: string;
  pictures: number;
  persons: number;
  extraPerson?: boolean;
}

export const roomsData = [
  {
    type: "room",
    id: 907,
    name: "Double or Twin Room with Mountain View",
    pictures: 5,
    persons: 2,
    extraPerson: true
  },
  {
    type: "room",
    id: 907,
    name: "Double or Twin Room with Mountain View",
    pictures: 5,
    persons: 2,
    extraPerson: true
  },
  // {
  //   type: "room",
  //   id: 906,
  //   name: "Double Room with Mountain View",
  //   pictures: 6,
  //   persons: 3
  // },
  {
    type: "suite",
    id: 803,
    name: "Suite with City View",
    pictures: 6,
    persons: 2
  },
  {
    type: "room",
    id: 904,
    secondary: 905,
    name: "Deluxe Double Room with Balcony",
    pictures: 10,
    persons: 2
  },
  {
    type: "suite",
    id: 903,
    name: "Suite with Balcony",
    pictures: 10,
    persons: 2,
    extraPerson: true
  },
  // 901-902
  {
    type: "room",
    id: 806,
    name: "King Room with Balcony",
    pictures: 8,
    persons: 2
  },
  {
    type: "suite",
    id: 804,
    secondary: 805,
    name: "Junior Suite with Balcony",
    pictures: 6,
    persons: 2
  }
] satisfies Room[];
