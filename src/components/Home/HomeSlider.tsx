import { For, Index, Show, createMemo } from "solid-js";
import { createSlider } from "solid-slider";
import { roomsData } from "~/data/rooms";
import { getImageUrl } from "~/lib/cloudinary";

import "keen-slider/keen-slider.min.css";
import { useDevice } from "~/lib/device";
import { A } from "solid-start";

export const HomeSlider = () => {
  const data = roomsData.filter(({ type }) => type === "room");
  const { isDesktop } = useDevice();

  const [slider, { current, moveTo, details }] = createSlider(createMemo(() => ({
    vertical: false,
    mode: "snap",
    rtl: false,
    slides: {
      perView: "auto",
      spacing: isDesktop() ? 110 : 40,
    },
  })));

  return (
    <div class="pl-7 mb-20 cursor-pointer">
      <div use:slider>
        <For each={data}>
          {(room) => {
            const url = getImageUrl(`/${room.id}/1`, isDesktop() ? 1024 : 620);

            return (
              <div class="bg-zinc-900 bg-opacity-10 text-white text-xs">
                <div
                  class="flex bg-cover bg-center bg-no-repeat rounded-md items-end p-2
                    xl:items-start xl:flex-col xl:font-semibold xl:px-12 xl:py-9"
                  style={{
                    "background-image": `url(${url()})`,
                    "min-width": isDesktop() ? "415px" : "122px",
                    "max-width": isDesktop() ? "415px" : "122px",
                    height: isDesktop() ? "434px" : "128px",
                  }}
                >
                  <span class="xl:text-xl xl:mt-auto">
                    {room.name}
                  </span>
                  <Show when={isDesktop()}>
                    <A href="/todo" class="px-3 py-2 mt-3 rounded-lg bg-zinc-300 bg-opacity-80 hover:bg-opacity-100 cursor-pointer">
                      See More
                    </A>
                  </Show>
                </div>
              </div>
            );
          }}
        </For>
      </div>
      <div class="flex gap-3 mt-5">
        <Index each={data}>
          {(room, idx) => (
            <Show when={idx != data.length - 1}>
              <div
                class="w-2 h-2 xl:h-3 xl:w-3 rounded-full hover:bg-neutral-400 cursor-pointer"
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
  );
};
