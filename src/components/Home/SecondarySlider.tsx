import { For, Index } from "solid-js";
import { createSlider } from "solid-slider";
import { roomsData } from "~/data/rooms";
import { getImageUrl } from "~/lib/cloudinary";

import "keen-slider/keen-slider.min.css";

export const HomeSecondarySlider = () => {
  const data = roomsData.filter(({ type }) => type === "suite");
  const [slider, { current, moveTo }] = createSlider({
    vertical: true,
    mode: "snap",
    rtl: false,
    slides: {
      perView: 1,
    },
  });

  return (
    <div class="h-80 flex xl:h-[calc(100vh*0.8)]">
      <div class="flex-1">
        <div use:slider class="h-full cursor-pointer">
          <For each={data}>
            {(room) => {
              const url = getImageUrl(
                `/${room.id}/1`,
                () => window.innerWidth * 2
              );
              return (
                <div
                  class="w-full bg-cover bg-center bg-no-repeat"
                  style={{ "background-image": `url(${url()})` }}
                />
              );
            }}
          </For>
        </div>
      </div>
      <div class="flex-1 flex justify-center align-middle gap-3 xl:justify-normal">
        <div class="flex flex-col gap-2 pl-2 justify-center xl:ml-8">
          <Index each={data}>
            {(room, idx) => <div
                class="w-2 h-2 rounded-full cursor-pointer hover:bg-neutral-400"
                onClick={() => moveTo(idx)}
                classList={{
                  "bg-neutral-400": idx === current(),
                  "bg-zinc-300": idx !== current(),
                }}
              />}
          </Index>
        </div>
        <div class="flex flex-col justify-center pr-3 xl:gap-5 xl:w-2/3 xl:mx-auto">
          <span class="text-sm text-center xl:text-4xl">Suites</span>
          <span class="text-xs text-center xl:text-lg">
            WIRED is where tomorrow is realized. It is the essential source of
            information and ideas that make sense of a world in constant
            transformation.{" "}
          </span>
        </div>
      </div>
    </div>
  );
};
