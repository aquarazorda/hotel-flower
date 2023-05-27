import { createMutation, createQuery, useQueryClient } from "@tanstack/solid-query";
import { For } from "solid-js";
import { useRouteData } from "solid-start";
import CmsPage from "~/cms/Page";
import { getBookings, saveBookings } from "~/server/db/prisma";
import { defaultQueryOptions } from "~/shared/utils";

export const routeData = () => {
  return createQuery(() => ({
    queryKey: ["cms-bookings"],
    queryFn: getBookings,
    ...defaultQueryOptions
  }));
};

export default function RoomsList() {
  const queryClient = useQueryClient();
  const data = useRouteData<typeof routeData>();

  const update = createMutation(() => ({
    mutationFn: saveBookings
  }));

  const updateBookings = async () => {
    update.mutateAsync().then(() => {
      queryClient.invalidateQueries({
        queryKey: ["cms-bookings"]
      });
    })
  }

  return (
    <CmsPage title="Bookings List" actionElement={
      <button
          class="rounded bg-lime-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-lime-500 disabled:bg-blue-500"
          disabled={update.isPending}
          onClick={() => updateBookings()}
        >
          Update
        </button>
    }>
      <div class="flex flex-col">
          <For each={data.data}>
            {(booking) => (
              <div class="flex justify-between border-b py-4">
                <div>
                  Room: <span class="font-semibold">{booking.roomId}</span>
                </div>
                <div>
                  <For each={booking.dates as { from: string; to: string }[]}>
                    {(date) => (
                      <div>
                        From: <span class="font-semibold">{date.from}</span> - To:{" "}
                        <span class="font-semibold">{date.to}</span>
                      </div>
                    )}
                  </For>
                </div>
              </div>
            )}
          </For>
      </div>
    </CmsPage>
  );
}
