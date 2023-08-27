import { For, Show } from "solid-js";
import { roomsData } from "~/shared/data/rooms";
import { getImageUrl } from "~/server/lib/cloudinary";
import { A, useNavigate } from "solid-start";

import { SolarUserRoundedLinear } from "~/client/assets/icons/SolarRounded";
import RoomsFilter from "~/client/components/Filter/RoomsFIlter";
import Footer from "~/client/components/Footer";
import { Icon } from "~/client/components/Icons";
import { Button, Toast, toaster } from "@kobalte/core";
import { Portal } from "solid-js/web";

const Rooms = () => {
  const navigate = useNavigate();
  // const bookings = createQuery(() => ['bookings'], getBookings, {
  //   refetchOnMount: false,
  //   refetchOnWindowFocus: false,
  //   refetchOnReconnect: false,
  // });
  // return <DateRangePicker />`
  // TODO
  const showToast = () =>
    toaster.show((props) => (
      <Toast.Root toastId={1}>Room link has been copied</Toast.Root>
    ));

  return (
    <div class="xl:px-[5%]">
      {/* <div>
        <Select.Root>
          <Select.Label></Select.Label>
        </Select.Root>
      </div> */}
      <RoomsFilter />
      <main class="my-10 flex flex-wrap justify-center gap-10 px-7 xl:grid xl:grid-cols-5 xl:gap-6">
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
                  class="flex h-64 cursor-pointer flex-col gap-1 rounded-2xl bg-cover bg-center text-white xl:aspect-[1.17] xl:h-auto"
                >
                  <div class="h-full w-full rounded-xl bg-black/10" />
                </div>
                <div class="mt-6 flex flex-col gap-2">
                  <h2 class="mt-auto flex justify-between font-medium text-zinc-500">
                    <A href={`./${room.id}`}>{room.name}</A>
                    <Button.Root onClick={showToast} class="xl:hidden">
                      <Icon name="share" />
                    </Button.Root>
                  </h2>
                  <p class="w-full text-xs text-zinc-500">
                    Ideally located in Tbilisi City, Hotel offers a buffet
                    breakfast and free WiFi throughout the property. Each
                    accommodation at the 4-star hotel has city views, and guests
                    can enjoy access to a shared lounge and to a terrace.
                    Private parking is available on site. Ideally located in
                    Tbilisi City, Hotel offers a buffet breakfast and free WiFi
                    throughout the property.
                  </p>
                  {/* <div class="mt-2 flex gap-1 text-black">
                    <For each={Array(room.persons)}>
                      {() => <SolarUserRoundedLinear class="h-4 w-4" />}
                    </For>
                    <Show when={room.extraPerson}>
                      <span class="text-neutral-500">+</span> <SolarUserRoundedLinear  class="h-4 w-4" />
                    </Show>
                  </div> */}
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
      <Portal>
        <Toast.Region>
          <Toast.List class="fixed bottom-0 right-0 z-50 bg-white p-4" />
        </Toast.Region>
      </Portal>
    </div>
  );
};

export default Rooms;
