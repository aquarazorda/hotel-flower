import { For, createMemo, onMount } from "solid-js";
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

  const [slider, { current, moveTo, update }] = createSlider({
    vertical: isDesktop ? true : false,
    mode: "snap",
    rtl: false,
    slides: {
      perView: 1,
    },
  });

  onMount(() => {
    setTimeout(() => {
      update();
    }, 500);
  });

  return (
    <div class="flex flex-col lg:mt-28 lg:px-32">
      <h5 class="mb-8 text-center font-shippori text-base font-medium text-neutral-500 lg:hidden lg:text-primary/90">
        Suites
      </h5>
      {/* @ts-ignore */}
      <div class="flex flex-col lg:flex-row">
        <div class="lg:w-1/2">
          <div
            // @ts-ignore
            use:slider
            class="flex h-64 cursor-pointer lg:h-[70vh]"
          >
            <For each={data()}>
              {(room) => (
                <Image
                  onClick={() => navigate("/suites/" + room.roomId)}
                  src={`/img/${room.roomId}/${room.info?.pictures?.[0] || 0}`}
                  class="h-full w-full object-cover lg:rounded-md"
                  loading="lazy"
                />
              )}
            </For>
          </div>
        </div>
        <div class="mt-5 flex flex-col gap-6 px-4 lg:mt-0 lg:w-1/2 lg:flex-row lg:px-0">
          <div class="flex gap-3 lg:ml-8 lg:flex-col lg:justify-center">
            <SliderDots
              count={data()?.length || 0}
              current={current()}
              moveTo={moveTo}
            />
          </div>
          <div class="flex flex-col lg:mx-auto lg:max-w-sm lg:justify-center lg:gap-5">
            <span class="hidden text-center text-2xl text-primary lg:block lg:text-start">
              Suites
            </span>
            <span class="text-center text-[12.5px] text-primary lg:text-start lg:text-primary/90">
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
