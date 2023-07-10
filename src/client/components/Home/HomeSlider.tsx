import { For, Index, Show, createMemo } from "solid-js";
import { createSlider } from "solid-slider";
import { roomsData } from "~/shared/data/rooms";
import { getImageUrl } from "~/server/lib/cloudinary";

import "keen-slider/keen-slider.min.css";
import { useDevice } from "~/server/lib/device";
import { A, useNavigate } from "solid-start";

export const HomeSlider = () => {
  const data = roomsData.filter(({ type }) => type === "room");
  const { isDesktop } = useDevice();
  const navigate = useNavigate();

  const [slider, { current, moveTo }] = createSlider(
    createMemo(() => ({
      vertical: false,
      rtl: false,
      slides: {
        perView: "auto",
        spacing: isDesktop ? 32 : 8,
      },
    }))
  );

  return (
    <div>
      <h5 class="mb-8 text-center font-shippori text-base font-medium text-neutral-500 xl:mb-16 xl:font-inter xl:text-xl xl:font-normal xl:text-secondary">
        Rooms
      </h5>
      <div class="cursor-pointer pl-4 xl:pl-4">
        {/* @ts-ignore */}
        <div use:slider class="flex">
          <For each={data}>
            {(room, idx) => {
              const url = getImageUrl(`/${room.id}/1`, isDesktop ? 1024 : 620);

              return (
                <>
                  <div
                    class="min-w-[123px] text-sm text-white xl:aspect-square xl:min-w-fit"
                    classList={{ "xl:ml-28": idx() === 0 }}
                  >
                    <img
                      onClick={() => navigate("/rooms/" + room.id)}
                      class="flex h-32 items-end rounded-lg bg-cover bg-center bg-no-repeat
                    object-cover xl:aspect-square xl:min-h-[364px] xl:flex-col xl:items-start xl:font-semibold"
                      src={url}
                    />
                    {/* <div class="hidden xl:block">
                      <span class="xl:mt-auto xl:text-xl">{room.name}</span>
                      <A
                        href="/todo"
                        class="mt-3 cursor-pointer rounded-lg bg-zinc-300/80 px-3 py-2 hover:bg-zinc-300/100"
                      >
                        See More
                      </A>
                    </div> */}
                  </div>
                  <Show when={idx() === data.length - 1 && isDesktop}>
                    <div class="hidden min-w-[123px] xl:block" />
                  </Show>
                </>
              );
            }}
          </For>
        </div>
        <div class="mt-5 flex flex-col gap-6 xl:hidden">
          <div class="flex gap-3">
            <Index each={data}>
              {(room, idx) => (
                <Show when={idx != data.length - 1}>
                  <div
                    class="h-2 w-2 cursor-pointer rounded-full hover:bg-neutral-400"
                    onClick={() => moveTo(idx)}
                    classList={{
                      "bg-neutral-400": idx === current(),
                      "bg-zinc-300": idx !== current(),
                    }}
                  />
                </Show>
              )}
            </Index>
          </div>
        </div>
      </div>
      <div class="mb-10 mt-2 flex flex-col p-4 xl:mb-0 xl:mt-52 xl:items-center xl:bg-secondary">
        <span class="text-center text-xs text-neutral-500 xl:max-w-xl xl:p-20 xl:text-sm xl:text-white">
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
