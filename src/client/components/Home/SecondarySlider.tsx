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
    vertical: isDesktop ? true : false,
    mode: "snap",
    rtl: false,
    slides: {
      perView: 1,
    },
  });

  return (
    <div class="flex flex-col">
      <h5 class="mb-8 text-center font-shippori text-base font-medium text-neutral-500 xl:hidden">
        Suites
      </h5>
      {/* @ts-ignore */}
      <div class="flex flex-col xl:flex-row">
        <div class="xl:w-1/2">
          <div
            use:slider
            class="flex h-64 cursor-pointer xl:h-[80vh]"
          >
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
        </div>
        <div class="mt-5 flex flex-col gap-6 px-4 xl:mt-0 xl:w-1/2 xl:flex-row xl:px-0">
          <div class="flex gap-3 xl:ml-8 xl:flex-col xl:justify-center">
            <SliderDots count={data} current={current()} moveTo={moveTo} />
          </div>
          <div class="flex flex-col xl:mx-auto xl:w-2/3 xl:justify-center xl:gap-5">
            <span class="hidden text-center text-xl text-secondary xl:block">Suites</span>
            <span class="text-center text-xs text-neutral-500 xl:text-base xl:text-textSecondary">
              Step into the refined luxury of Hotel Flower's suites, where the
              vivacity of Tbilisi meets elegance. Each suite is a tranquil
              retreat, blending modern sophistication with authentic Georgian
              allure. Revel in the exquisite detailing, elevated comforts, and
              sweeping city views.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
