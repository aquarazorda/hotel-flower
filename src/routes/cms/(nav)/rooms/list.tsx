import { createQuery } from "@tanstack/solid-query";
import CmsPage from "~/cms/Page";
import { getRooms } from "~/server/db/prisma";
import { defaultQueryOptions } from "~/shared/utils";

export const routeData = () => {
  return createQuery(() => ({
    queryKey: ["cms-rooms"],
    queryFn: getRooms,
    ...defaultQueryOptions,
  }));
};

export default function RoomsList() {
  return <CmsPage title="Rooms List">This is it</CmsPage>;
}
