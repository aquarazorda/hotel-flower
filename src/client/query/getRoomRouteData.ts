import { createQuery } from "@tanstack/solid-query";
import { RouteDataArgs } from "solid-start";
import { getRoom } from "~/server/db/rooms";
import { defaultQueryOptions } from "~/shared/utils";

export const getRoomRouteData = ({ params }: RouteDataArgs) => ({
  room: createQuery(() => ({
    queryKey: ["room", params.id],
    queryFn: () => getRoom(Number(params.id)),
    ...defaultQueryOptions,
    suspense: true,
  })),
});

