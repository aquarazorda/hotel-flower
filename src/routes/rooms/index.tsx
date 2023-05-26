import { For, Show } from "solid-js";
import { roomsData } from "~/data/rooms";
import { getImageUrl } from "~/server/lib/cloudinary";
import { useNavigate } from "solid-start";

import { SolarUserRoundedLinear } from "~/client/assets/icons/SolarRounded";

const Rooms = () => {
  const navigate = useNavigate();
  // const bookings = createQuery(() => ['bookings'], getBookings, {
  //   refetchOnMount: false,
  //   refetchOnWindowFocus: false,
  //   refetchOnReconnect: false,
  // });
  // return <DateRangePicker />`
  return (
    <main class="flex flex-wrap justify-center gap-16 px-10 py-6">
        <For each={roomsData}>
          {(room) => {
            const url = getImageUrl(`/${room.id}/1`, 1024);

            return (
              <article class="flex flex-col" style={{ 'max-width': "439px" }}>
                <div
                  style={{
                    "max-width": "439px",
                    height: "389px",
                    "background-image": `url(${url})`,
                  }}
                  class="flex cursor-pointer flex-col gap-1 rounded-lg bg-cover bg-center p-6 font-medium text-white"
                >
                  {/* <h2 class="mt-auto text-lg">{room.name}</h2>
                  <A
                    href={`./${room.id}`}
                    class="mt-3 w-fit cursor-pointer rounded-lg bg-zinc-300/70 px-3 py-2 text-sm hover:bg-zinc-300"
                  >
                    See More
                  </A> */}
                </div>
                <div class="mt-4 flex flex-col gap-4">
                  <h2 class="mt-auto text-lg font-semibold text-black/60">{room.name}</h2>
                  <p class="w-11/12 text-base text-neutral-500">
                    Ideally located in Tbilisi City, Hotel offers a buffet
                    breakfast and free WiFi throughout the property. Each
                    accommodation at the 4-star hotel has city views, and guests
                    can enjoy access to a shared lounge and to a terrace.
                    Private parking is available on site. Ideally located in
                    Tbilisi City, Hotel offers a buffet breakfast and free WiFi
                    throughout the property.
                  </p>
                  <div class="flex gap-1">
                    <For each={Array(room.persons)}>
                      {() => <SolarUserRoundedLinear />}
                    </For>
                    <Show when={room.extraPerson}>
                      + <SolarUserRoundedLinear />
                    </Show>
                  </div>
                  <button 
                    class="mt-4 w-full rounded-md bg-secondary py-2 text-center font-medium uppercase text-white hover:bg-secondaryHover"
                    onClick={() => navigate(`./${room.id}`)}
                    >
                    Check Price
                  </button>
                </div>
              </article>
            );
          }}
        </For>
      </main>
  );
};

export default Rooms;
