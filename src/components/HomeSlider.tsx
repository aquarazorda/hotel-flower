import { For, Index, Show } from "solid-js";
import { Slider, createSlider } from "solid-slider";
import { roomsData } from "~/data/rooms";
import { getImageUrl } from "~/lib/cloudinary";

import "keen-slider/keen-slider.min.css";

export const HomeSlider = () => {
  const [slider, { current, moveTo }] = createSlider({
    vertical: false,
    mode: 'free-snap',
    slides: {
      perView: 2,
      spacing: 15,
    },
  });

  return (
    <div class="pl-7 mb-20">
      <div use:slider>
        <For each={roomsData}>
          {(room) => {
            const url = getImageUrl(`/${room.id}/1`, 620);
            return (
              <div
                class="bg-cover bg-center bg-no-repeat w-36 h-36 rounded-md items-end flex"
                style={{ "background-image": `url(${url()})` }}
              >
                <span class="text-xs font-bold text-white p-2">
                  {room.name}
                </span>
              </div>
            );
          }}
        </For>
      </div>
      <div class="flex gap-3 mt-5">
        <Index each={roomsData}>
          {(room, idx) => (
            <Show when={idx != roomsData.length - 1}>
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
