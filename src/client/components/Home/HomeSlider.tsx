import { For, Index, Show, createMemo } from "solid-js";
import { createSlider } from "solid-slider";

import "solid-slider/slider.css";
import { useDevice } from "~/server/lib/device";
import { A, useNavigate, useRouteData } from "solid-start";
import { getRooms } from "~/server/db/rooms";
import Image from "../Image";

export const HomeSlider = () => {
  const routeData = useRouteData<ReturnType<typeof getRooms>>();
  const navigate = useNavigate();
  const { isDesktop } = useDevice();

  const data = createMemo(() =>
    routeData.data
      ?.filter(({ type }) => type === "room")
      .splice(0, isDesktop ? 8 : 6)
  );

  const [slider, { current, moveTo }] = createSlider(
    createMemo(() => ({
      vertical: false,
      rtl: false,
      slides: {
        perView: "auto",
        spacing: isDesktop ? 32 : 9,
      },
    }))
  );

  return (
    <div>
      <h5 class="mb-8 text-center font-shippori text-base font-medium text-primary 2xl:mb-12 2xl:mt-4 2xl:text-2xl 2xl:font-normal">
        Rooms
      </h5>
      <div class="cursor-pointer pl-4 2xl:pl-4">
        {/* @ts-ignore */}
        <div use:slider class="flex">
          <For each={data()}>
            {(room, idx) => (
              <>
                <div
                  class="min-w-[123px] text-sm text-white 2xl:aspect-square 2xl:min-w-fit"
                  classList={{ "2xl:ml-28": idx() === 0 }}
                >
                  <Image
                    onClick={() => navigate("/rooms/" + room.roomId)}
                    loading="lazy"
                    class="flex h-32 items-end rounded-lg bg-cover bg-center bg-no-repeat
                    object-cover 2xl:aspect-square 2xl:min-h-[264px] 2xl:flex-col 2xl:items-start 2xl:font-semibold"
                    src={`/img/${room.roomId}/${room.info?.pictures[0] || 0}`}
                  />
                  {/* <div class="hidden 2xl:block">
                      <span class="2xl:mt-auto 2xl:text-xl">{room.name}</span>
                      <A
                        href="/todo"
                        class="mt-3 cursor-pointer rounded-lg bg-zinc-300/90 px-3 py-2 hover:bg-zinc-300/100"
                      >
                        See More
                      </A>
                    </div> */}
                </div>
                <Show when={idx() === data.length - 1 && isDesktop}>
                  <div class="hidden min-w-[123px] 2xl:block" />
                </Show>
              </>
            )}
          </For>
        </div>
      </div>
      <div class="mb-10 mt-6 flex flex-col p-4 2xl:my-20 2xl:mb-28 2xl:items-center 2xl:pt-2">
        <span class="text-center text-[12.5px] text-primary 2xl:max-w-2xl 2xl:text-base 2xl:text-primary/90">
          Relish the unique charm of Tbilisi from our stylish rooms at Hotel
          Flower. Each room harmoniously combines modern elegance with a touch
          of authentic Georgian charm, promising a stay enriched with comfort,
          luxury, and stunning cityscapes. Immerse in the vibrant rhythm of the
          city.
        </span>
      </div>
    </div>
  );
};
