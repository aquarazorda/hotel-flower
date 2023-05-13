import { For, Show } from "solid-js";
import "vanillajs-datepicker/css/datepicker.css";
import { Header } from "~/components/Header/desktop";
import { getBookings } from "~/db/db";
import { roomsData } from "~/data/rooms";
import { getImageUrl } from "~/lib/cloudinary";
import { A } from "solid-start";

import { SolarUserRoundedLinear } from "~/assets/icons/SolarRounded";

const Rooms = () => {
  // const bookings = createQuery(() => ['bookings'], getBookings, {
  //   refetchOnMount: false,
  //   refetchOnWindowFocus: false,
  //   refetchOnReconnect: false,
  // });
  // return <DateRangePicker />`
  return (
    <>
      <Header />
      <main class="flex flex-wrap py-6 px-10 mt-16 justify-center gap-16">
        <For each={roomsData}>
          {(room) => {
            const url = getImageUrl(`/${room.id}/1`, 1024);

            return (
              <article class="flex flex-col" style={{ width: "439px" }}>
                <div
                  style={{
                    width: "439px",
                    height: "389px",
                    "background-image": `url(${url()})`,
                  }}
                  class="flex flex-col bg-cover bg-center p-6 cursor-pointer rounded-lg text-white gap-1 font-medium"
                >
                  <h1 class="text-lg mt-auto">{room.name}</h1>
                  <A
                    href="/todo"
                    class="w-fit px-3 py-2 mt-3 rounded-lg bg-zinc-300 bg-opacity-70 hover:bg-opacity-100 cursor-pointer text-sm"
                  >
                    See More
                  </A>
                </div>
                <div class="flex flex-col gap-4">
                  <p class="text-md text-neutral-500 mt-8 w-11/12">
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
                  <button class="mt-4 py-2 w-full bg-secondary hover:bg-secondaryHover text-center uppercase font-medium text-white rounded-md">
                    Check Price
                  </button>
                </div>
              </article>
            );
          }}
        </For>
      </main>
    </>
  );
};

export default Rooms;
