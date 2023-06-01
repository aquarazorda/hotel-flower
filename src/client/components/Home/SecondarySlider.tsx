import { For } from "solid-js";
import { createSlider } from "solid-slider";
import { roomsData } from "~/shared/data/rooms";
import { getImageUrl } from "~/server/lib/cloudinary";

import "keen-slider/keen-slider.min.css";
import { useDevice } from '~/server/lib/device';
import SliderDots from '../Slider/Dots';

export const HomeSecondarySlider = () => {
  const data = roomsData.filter(({ type }) => type === "suite");
  const { isDesktop } = useDevice();

  const [slider, { current, moveTo }] = createSlider({
    vertical: true,
    mode: "snap",
    rtl: false,
    slides: {
      perView: 1,
    },
  });

  return (
    <div class="flex h-80 xl:h-[calc(100vh*0.8)]">
      <div class="flex-1">
        {/* @ts-ignore */}
        <div use:slider class="h-full cursor-pointer">
          <For each={data}>
            {(room) => {
              const url = getImageUrl(
                `/${room.id}/1`,
                () => isDesktop ? 1200 : 600
              );
              return (
                <div
                  class="w-full bg-cover bg-center bg-no-repeat"
                  style={{ "background-image": `url(${url})` }}
                />
              );
            }}
          </For>
        </div>
      </div>
      <div class="flex flex-1 justify-center gap-3 align-middle xl:justify-normal">
        <div class="flex flex-col justify-center gap-2 pl-2 xl:ml-8">
          <SliderDots count={data} current={current()} moveTo={moveTo} />
        </div>
        <div class="flex flex-col justify-center pr-3 xl:mx-auto xl:w-2/3 xl:gap-5">
          <span class="text-center text-sm xl:text-4xl">Suites</span>
          <span class="text-center text-xs xl:text-lg">
            WIRED is where tomorrow is realized. It is the essential source of
            information and ideas that make sense of a world in constant
            transformation.{" "}
          </span>
        </div>
      </div>
    </div>
  );
};
