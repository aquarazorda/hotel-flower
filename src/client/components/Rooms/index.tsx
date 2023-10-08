import { For } from 'solid-js';
import RoomsFilter from '../Filter/RoomsFIlter';
import { Button, Toast, toaster } from '@kobalte/core';
import { A, useNavigate, useRouteData } from 'solid-start';
import { getRooms } from '~/server/db/rooms';
import { Portal } from 'solid-js/web';
import { Icon } from '../Icons';
import Image from '../Image';

export default function Rooms() {
  const roomsData = useRouteData<ReturnType<typeof getRooms>>();
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
    <div class="lg:mb-24 lg:px-[5%]">
      <RoomsFilter />
      <main class="my-10 flex flex-wrap justify-center gap-10 px-7 lg:grid lg:grid-cols-5 lg:gap-6">
        <For each={roomsData.data}>
          {(room) => (
            <article class="flex flex-col">
              <Image
                src={`/img/${room.roomId}/${room.info?.pictures[0] || 0}`}
                onClick={() => navigate(`./${room.roomId}`)}
                class="flex h-64 cursor-pointer flex-col gap-1 rounded-2xl object-cover object-center text-white lg:aspect-[1.17] lg:h-auto"
              />
                {/* <div class="h-full w-full rounded-xl bg-black/10" /> */}
              <div class="mt-5 flex flex-col gap-2 lg:mb-5">
                <h2 class="mt-auto flex justify-between font-medium text-zinc-500">
                  <A href={`./${room.roomId}`}>{room.name}</A>
                  <Button.Root onClick={showToast} class="lg:hidden">
                    <Icon name="share" />
                  </Button.Root>
                </h2>
                <p class="w-full pr-8 text-xs text-zinc-500 xl:pr-0">
                  Ideally located in Tbilisi City, Hotel offers a buffet
                  breakfast and free WiFi throughout the property. Each
                  accommodation at the 4-star hotel has city views, and guests
                  can enjoy access to a shared lounge and to a terrace.
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
          )}
        </For>
      </main>
      {/* <Portal>
        <Toast.Region>
          <Toast.List class="fixed bottom-0 right-0 z-50 bg-white p-4" />
        </Toast.Region>
      </Portal> */}
    </div>
  );
}
