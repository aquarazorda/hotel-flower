import { Button } from "@kobalte/core";
import { For } from "solid-js";
import { useNavigate, useRouteData } from "solid-start";
import CmsPage from "~/cms/Page";
import { getRooms } from "~/server/db/rooms";

export const routeData = () =>
  getRooms(undefined, () => ({
    staleTime: 1000 * 60 * 60,
  }));

export default function RoomsList() {
  const data = useRouteData<typeof routeData>();
  const navigate = useNavigate();

  return (
    <CmsPage title="Rooms List">
      <table class="w-full text-left text-sm  text-stone-400">
        <thead class="bg-[#303641] text-xs uppercase text-stone-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Room Number
            </th>
            <th scope="col" class="px-6 py-3">
              Name
            </th>
            <th scope="col" class="px-6 py-3">
              Id
            </th>
            <th scope="col" class="px-6 py-3">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          <For each={data?.data}>
            {(room) => (
              <tr class="border-b border-gray-700 bg-[#2b303a]">
                <td class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {room.roomId}
                </td>
                <td class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {room.name}
                </td>
                <td class="px-6 py-4">{room.id}</td>
                <td class="px-6 py-4">
                  <Button.Root
                    class="bg-blue-800 p-2 hover:bg-blue-700"
                    onClick={() => navigate("/cms/rooms/" + room.roomId)}
                  >
                    Edit
                  </Button.Root>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </CmsPage>
  );
}
