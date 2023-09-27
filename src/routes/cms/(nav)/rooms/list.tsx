import { Button } from "@kobalte/core";
import { For, Show, createEffect, createSignal } from "solid-js";
import { useNavigate, useRouteData } from "solid-start";
import CmsPage from "~/cms/Page";
import { saveRoomOrder } from "~/server/client/room";
import { getRooms } from "~/server/db/rooms";

export const routeData = () =>
  getRooms(undefined, () => ({
    staleTime: 1000 * 60 * 60,
  }));

export default function RoomsList() {
  const data = useRouteData<typeof routeData>();
  const [orderedRooms, setOrderedRooms] = createSignal(data?.data || []);
  const navigate = useNavigate();
  const [orderChanged, setOrderChanged] = createSignal(false);
  const onSaveOrder = saveRoomOrder();

  createEffect(() => {
    setOrderedRooms(data?.data || []);
  });

  const save = () => {
    const d = orderedRooms().reduce((acc, room, idx) => {
      if (data.data?.[idx].id !== room.id) {
        acc.push({
          ...room,
          order: idx,
        })
      }
      return acc;
    }, [] as NonNullable<typeof data.data>);

    onSaveOrder.mutateAsync(d).then(() => {
      setOrderChanged(false);
    })
  };

  return (
    <CmsPage
      title="Rooms List"
      actionElement={
        <Show when={orderChanged()}>
          <Button.Root
            onClick={save}
            class="whitespace-nowrap bg-blue-800 p-2 text-stone-400 hover:bg-blue-700"
          >
            Save Order
          </Button.Root>
        </Show>
      }
    >
      <table class="w-full text-left text-sm text-stone-400">
        <thead class="bg-[#303641] text-xs uppercase ">
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
          <For each={orderedRooms()}>
            {(room, index) => (
              <tr
                class="border-b border-gray-700 bg-[#2b303a]"
                draggable="true"
                onDragStart={(e) => {
                  // Set the data being dragged (room index)
                  e.dataTransfer?.setData("roomIndex", String(index()));
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const sourceIndex = e.dataTransfer?.getData("roomIndex");
                  if (!sourceIndex) return;

                  const targetIndex = index();

                  // Rearrange the orderedRooms array
                  const updatedRooms = [...orderedRooms()];
                  const [draggedRoom] = updatedRooms.splice(Number(sourceIndex), 1);
                  updatedRooms.splice(targetIndex, 0, draggedRoom);

                  setOrderedRooms(updatedRooms);
                  setOrderChanged(true);
                }}
              >
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
