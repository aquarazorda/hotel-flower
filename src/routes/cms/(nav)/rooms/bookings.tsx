import { createMutation, createQuery } from "@tanstack/solid-query";
import { For } from "solid-js";
import { useRouteData } from "solid-start";
import CmsPage from "~/cms/Page";
import { getBookings, saveBookings } from "~/server/db/prisma";
import { defaultQueryOptions } from "~/shared/utils";

export const routeData = () => {
  return createQuery(
    () => ["cms-bookings"],
    () => getBookings(),
    defaultQueryOptions
  );
};

export default function RoomsList() {
  const data = useRouteData<typeof routeData>();

  const update = createMutation(saveBookings);

  return (
    <CmsPage title="Rooms List">
      <div class="flex flex-col">
        <button
          class="ml-auto rounded bg-green-800 px-6 py-2 text-white"
          disabled={update.isLoading}
          onClick={() => update.mutateAsync()}
        >
          Update
        </button>
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
