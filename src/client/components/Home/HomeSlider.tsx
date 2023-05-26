import { For, Index, Show, createMemo } from "solid-js";
import { createSlider } from "solid-slider";
import { roomsData } from "~/data/rooms";
import { getImageUrl } from "~/server/lib/cloudinary";

import "keen-slider/keen-slider.min.css";
import { useDevice } from "~/server/lib/device";
import { A, useNavigate } from "solid-start";

export const HomeSlider = () => {
  const data = roomsData.filter(({ type }) => type === "room");
  const { isDesktop } = useDevice();
  const navigate = useNavigate();

  const [slider, { current, moveTo }] = createSlider(createMemo(() => ({
    vertical: false,
    mode: "snap",
    rtl: false,
    slides: {
      perView: "auto",
      spacing: isDesktop() ? 110 : 40,
    },
  })));

  return (
    <div class="mb-20 cursor-pointer pl-7">
      {/* @ts-ignore */}
      <div use:slider>
        <For each={data}>
          {(room) => {
            const url = getImageUrl(`/${room.id}/1`, isDesktop() ? 1024 : 620);

            return (
              <div class="bg-zinc-900/10 text-xs text-white">
                <div
                  onClick={() => navigate("/rooms/" + room.id)}
                  class="flex items-end rounded-md bg-cover bg-center bg-no-repeat p-2
                    xl:flex-col xl:items-start xl:px-12 xl:py-9 xl:font-semibold"
                  style={{
                    "background-image": `url(${url})`,
                    "min-width": isDesktop() ? "415px" : "122px",
                    "max-width": isDesktop() ? "415px" : "122px",
                    height: isDesktop() ? "434px" : "128px",
                  }}
                >
                  <span class="xl:mt-auto xl:text-xl">
                    {room.name}
                  </span>
                  <Show when={isDesktop()}>
                    <A href="/todo" class="mt-3 cursor-pointer rounded-lg bg-zinc-300/80 px-3 py-2 hover:bg-zinc-300/100">
                      See More
                    </A>
                  </Show>
                </div>
              </div>
            );
          }}
        </For>
      </div>
      <div class="mt-5 flex gap-3">
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
    </div>
  );
};
