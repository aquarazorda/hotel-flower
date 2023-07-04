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
      mode: "snap",
      rtl: false,
      slides: {
        perView: "auto",
        spacing: isDesktop ? 110 : 9,
      },
    }))
  );

  return (
    <div>
      <h5 class="mb-6 text-center font-shippori text-base font-medium text-neutral-500">Rooms</h5>
      <div class="mb-14 cursor-pointer pl-4">
        {/* @ts-ignore */}
        <div use:slider>
          <For each={data}>
            {(room) => {
              const url = getImageUrl(`/${room.id}/1`, isDesktop ? 1024 : 620);

              return (
                <div class="text-sm text-white">
                  <div
                    onClick={() => navigate("/rooms/" + room.id)}
                    class="flex items-end rounded-lg bg-cover bg-center bg-no-repeat p-2
                    xl:flex-col xl:items-start xl:px-12 xl:py-9 xl:font-semibold"
                    style={{
                      "background-image": `url(${url})`,
                      "min-width": isDesktop ? "415px" : "122px",
                      "max-width": isDesktop ? "415px" : "122px",
                      height: isDesktop ? "434px" : "128px",
                    }}
                  >
                    <div class="hidden 2xl:block">
                      <span class="xl:mt-auto xl:text-xl">{room.name}</span>
                      <A
                        href="/todo"
                        class="mt-3 cursor-pointer rounded-lg bg-zinc-300/80 px-3 py-2 hover:bg-zinc-300/100"
                      >
                        See More
                      </A>
                    </div>
                  </div>
                </div>
              );
            }}
          </For>
        </div>
        <div class="mt-5 flex flex-col gap-6">
          <div class="flex gap-3 xl:ml-8">
            <Index each={data}>
              {(room, idx) => (
                <Show when={idx != data.length - 1}>
                  <div
                    class="h-2 w-2 cursor-pointer rounded-full hover:bg-neutral-400 xl:h-3 xl:w-3"
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
          <div class="flex flex-col pr-3 xl:mx-auto xl:w-2/3 xl:gap-5">
            <span class="text-center text-xs text-neutral-500 xl:text-lg">
              Experience Tbilisi's charm in Hotel Flower's rooms - a blend of
              modern elegance, authentic Georgian charm, and comfort. Luxurious cityscapes await you.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
