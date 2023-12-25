import { useRouteData } from "solid-start";
import Room from "~/client/components/Rooms/[id]";
import { getRoomRouteData } from "~/client/query/getRoomRouteData";

export const routeData = getRoomRouteData;

export default function RoomRoute() {
  const data = useRouteData<typeof routeData>();

  return <Room room={data.room?.data!} />;
}
