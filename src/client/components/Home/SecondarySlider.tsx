import { For, createMemo } from "solid-js";
import { createSlider } from "solid-slider";

import "solid-slider/slider.css";
import { useDevice } from "~/server/lib/device";
import SliderDots from "../Slider/Dots";
import { getRooms } from "~/server/db/rooms";
import { useNavigate, useRouteData } from "solid-start";
import Image from "../Image";

export const HomeSecondarySlider = () => {
  const roomsData = useRouteData<ReturnType<typeof getRooms>>();
  const navigate = useNavigate();
  const data = createMemo(() =>
    roomsData.data?.filter(({ type }) => type === "suite").splice(0, 5)
  );
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
    <div class="flex flex-col xl:mt-28 xl:px-32">
      <h5 class="mb-8 text-center font-shippori text-base font-medium text-neutral-500 xl:hidden xl:text-primary/90">
        Suites
      </h5>
      {/* @ts-ignore */}
      <div class="flex flex-col xl:flex-row">
        <div class="xl:w-1/2">
          <div
            // @ts-ignore
            use:slider
            class="flex h-64 cursor-pointer xl:h-[70vh]"
          >
            <For each={data()}>
              {(room) => (
                <Image
                  onClick={() => navigate("/suites/" + room.roomId)}
                  src={`/img/${room.roomId}/${room.info?.pictures?.[0] || 0}`}
                  class="h-full w-full object-cover xl:rounded-md"
                  loading="lazy"
                />
              )}
            </For>
          </div>
        </div>
        <div class="mt-5 flex flex-col gap-6 px-4 xl:mt-0 xl:w-1/2 xl:flex-row xl:px-0">
          <div class="flex gap-3 xl:ml-8 xl:flex-col xl:justify-center">
            <SliderDots
              count={data()?.length || 0}
              current={current()}
              moveTo={moveTo}
            />
          </div>
          <div class="flex flex-col xl:mx-auto xl:max-w-sm xl:justify-center xl:gap-5">
            <span class="hidden text-center text-2xl text-primary xl:block xl:text-start">
              Suites
            </span>
            <span class="text-center text-[12.5px] text-primary xl:text-start xl:text-primary/90">
              Step into the refined luxury of Hotel Flower's suites, where the
              vivacity of Tbilisi meets elegance. Each suite is a tranquil
              retreat, blending modern sophistication with authentic Georgian
              allure.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
