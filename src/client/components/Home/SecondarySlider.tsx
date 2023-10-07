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
    <div class="flex flex-col 2xl:mt-28 2xl:px-32">
      <h5 class="mb-8 text-center font-shippori text-base font-medium text-neutral-500 2xl:hidden 2xl:text-primary/90">
        Suites
      </h5>
      {/* @ts-ignore */}
      <div class="flex flex-col 2xl:flex-row">
        <div class="2xl:w-1/2">
          <div
            // @ts-ignore
            use:slider
            class="flex h-64 cursor-pointer 2xl:h-[70vh]"
          >
            <For each={data()}>
              {(room) => (
                <Image
                  onClick={() => navigate("/suites/" + room.roomId)}
                  src={`/img/${room.roomId}/${room.info?.pictures?.[0] || 0}`}
                  class="h-full w-full object-cover 2xl:rounded-md"
                  loading="lazy"
                />
              )}
            </For>
          </div>
        </div>
        <div class="mt-5 flex flex-col gap-6 px-4 2xl:mt-0 2xl:w-1/2 2xl:flex-row 2xl:px-0">
          <div class="flex gap-3 2xl:ml-8 2xl:flex-col 2xl:justify-center">
            <SliderDots
              count={data()?.length || 0}
              current={current()}
              moveTo={moveTo}
            />
          </div>
          <div class="flex flex-col 2xl:mx-auto 2xl:max-w-sm 2xl:justify-center 2xl:gap-5">
            <span class="hidden text-center text-2xl text-primary 2xl:block 2xl:text-start">
              Suites
            </span>
            <span class="text-center text-[12.5px] text-primary 2xl:text-start 2xl:text-primary/90">
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
