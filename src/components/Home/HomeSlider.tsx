import { For, Index, Show } from "solid-js";
import { createSlider } from "solid-slider";
import { roomsData } from "~/data/rooms";
import { getImageUrl } from "~/lib/cloudinary";

import "keen-slider/keen-slider.min.css";

export const HomeSlider = () => {
  const data = roomsData.filter(({ type }) => type === "room");
  const [slider, { current, moveTo, details }] = createSlider({
    vertical: false,
    mode: "snap",
    rtl: false,
    slides: {
      perView: "auto",
      spacing: 40,
    },
  });

  return (
    <div class="pl-7 mb-20">
      <div use:slider>
        <For each={data}>
          {(room) => {
            const url = getImageUrl(`/${room.id}/1`, 620);
            return (
              <div class="bg-zinc-900 bg-opacity-10">
                <div
                class="bg-cover bg-center bg-no-repeat rounded-md items-end flex"
                style={{
                  "background-image": `url(${url()})`,
                  "min-width": "122px",
                  "max-width": "122px",
                  height: "128px",
                }}
              >
                <span class="text-xs font-bold text-white p-2">
                  {room.name}
                </span>
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
                class="w-2 h-2 rounded-full"
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
