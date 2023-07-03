import { For, Show } from "solid-js";
import { roomsData } from "~/shared/data/rooms";
import { getImageUrl } from "~/server/lib/cloudinary";
import { A, useNavigate } from "solid-start";

import { SolarUserRoundedLinear } from "~/client/assets/icons/SolarRounded";
import { Select } from '@kobalte/core';

const Rooms = () => {
  const navigate = useNavigate();
  // const bookings = createQuery(() => ['bookings'], getBookings, {
  //   refetchOnMount: false,
  //   refetchOnWindowFocus: false,
  //   refetchOnReconnect: false,
  // });
  // return <DateRangePicker />`
  return (
    <div>
      {/* <div>
        <Select.Root>
          <Select.Label></Select.Label>
        </Select.Root>
      </div> */}
      <main class="flex flex-wrap justify-center gap-10 px-11 py-6">
        <For each={roomsData}>
          {(room) => {
            const url = getImageUrl(`/${room.id}/1`, 1024);

            return (
              <article class="flex flex-col">
                <div
                  style={{
                    "background-image": `url(${url})`,
                  }}
                  onClick={() => navigate(`./${room.id}`)}
                  class="flex h-64 cursor-pointer flex-col gap-1 rounded-lg bg-cover bg-center p-4 text-white"
                >
                  <A
                    href={`./${room.id}`}
                    class="mt-auto w-fit cursor-pointer rounded-lg bg-neutral-600/80 p-2 text-[10px] font-medium hover:bg-zinc-300"
                  >
                    Check Price
                  </A>
                </div>
                <div class="mt-4 flex flex-col gap-4 text-xs text-neutral-500">
                  <h2 class="mt-auto font-medium"><A href={`./${room.id}`}>{room.name}</A></h2>
                  <p class="w-11/12">
                    Ideally located in Tbilisi City, Hotel offers a buffet
                    breakfast and free WiFi throughout the property. Each
                    accommodation at the 4-star hotel has city views, and guests
                    can enjoy access to a shared lounge and to a terrace.
                    Private parking is available on site. Ideally located in
                    Tbilisi City, Hotel offers a buffet breakfast and free WiFi
                    throughout the property.
                  </p>
                  <div class="flex gap-1 text-black">
                    <For each={Array(room.persons)}>
                      {() => <SolarUserRoundedLinear class="h-4 w-4" />}
                    </For>
                    <Show when={room.extraPerson}>
                      + <SolarUserRoundedLinear  class="h-4 w-4" />
                    </Show>
                  </div>
                  {/* <button 
                    class="mt-4 w-full rounded-md bg-secondary py-2 text-center font-medium uppercase text-white hover:bg-secondaryHover"
                    onClick={() => navigate(`./${room.id}`)}
                    >
                    Check Price
                  </button> */}
                </div>
              </article>
            );
          }}
        </For>
      </main>
    </div>
  );
};

export default Rooms;
