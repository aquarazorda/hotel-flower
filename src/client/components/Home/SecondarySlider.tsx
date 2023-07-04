import { For } from "solid-js";
import { createSlider } from "solid-slider";
import { roomsData } from "~/shared/data/rooms";
import { getImageUrl } from "~/server/lib/cloudinary";

import "keen-slider/keen-slider.min.css";
import { useDevice } from "~/server/lib/device";
import SliderDots from "../Slider/Dots";

export const HomeSecondarySlider = () => {
  const data = roomsData.filter(({ type }) => type === "suite");
  const { isDesktop } = useDevice();

  const [slider, { current, moveTo }] = createSlider({
    vertical: false,
    mode: "snap",
    rtl: false,
    slides: {
      perView: 1,
    },
  });

  return (
    <div class="flex flex-col xl:h-[calc(100vh*0.8)]">
      <h5 class="mb-6 text-center font-shippori text-base font-medium text-neutral-500">Suites</h5>
      <div use:slider class="flex h-64 cursor-pointer">
        <For each={data}>
          {(room) => {
            const url = getImageUrl(`/${room.id}/1`, () =>
              isDesktop ? 1200 : 600
            );
            return (
              <img
                src={url}
                class="h-full w-full object-cover"
                loading="lazy"
              />
            );
          }}
        </For>
      </div>
      <div class="mt-5 flex flex-col gap-6 px-4">
        <div class="flex gap-3 xl:ml-8">
          <SliderDots count={data} current={current()} moveTo={moveTo} />
        </div>
        <div class="flex flex-col pr-3 xl:mx-auto xl:w-2/3 xl:gap-5">
          <span class="text-center text-xs text-neutral-500 xl:text-lg">
            Step into Hotel Flower's suites - a mix of elegance, comfort, and
            Georgian charm. Revel in luxury and city views, in the heart of
            vibrant Tbilisi.
          </span>
        </div>
      </div>
    </div>
  );
};
