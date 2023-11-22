import { For, createEffect, createMemo, onCleanup } from "solid-js";

import { useDevice } from "~/server/lib/device";
import SliderDots from "../Slider/Dots";
import { getRooms } from "~/server/db/rooms";
import { useNavigate, useRouteData } from "solid-start";
import Image from "../Image";
import Splide from "@splidejs/splide";
import { createStore } from "solid-js/store";
import "@splidejs/splide/css/core";

export const HomeSecondarySlider = () => {
  const roomsData = useRouteData<typeof getRooms>();
  const navigate = useNavigate();
  const data = createMemo(
    () => roomsData.data?.filter(({ type }) => type === "suite").splice(0, 5),
  );
  const { isDesktop } = useDevice();
  let slider: HTMLDivElement | undefined;

  const [sliderState, setSliderState] = createStore<{
    idx: number;
    go: (idx: number) => void;
  }>({
    idx: 0,
    go: () => {},
  });

  createEffect(() => {
    if (!slider || !data()) return;

    const splide = new Splide(slider, {
      type: "slide",
      direction: !isDesktop ? "ltr" : "ttb",
      arrows: false,
      autoWidth: true,
      snap: true,
      pagination: false,
      heightRatio: 1,
    });

    splide.mount();

    setSliderState({
      idx: 0,
      go: (idx: number) => splide.go(idx),
    });

    splide.on("move", (idx) => setSliderState("idx", idx));

    onCleanup(() => splide.destroy());
  });

  return (
    <div class="flex flex-col lg:mt-28 lg:px-32">
      <h5 class="mb-8 text-center font-shippori text-base font-medium text-neutral-500 lg:hidden lg:text-primary/90">
        Suites
      </h5>
      <div class="flex flex-col lg:flex-row">
        <div ref={slider} class="splide lg:w-1/2">
          <div class="splide__track">
            <div class="splide__list flex h-64 cursor-pointer lg:h-[70vh]">
              <For each={data()}>
                {(room) => (
                  <Image
                    onClick={() => navigate("/suites/" + room.roomId)}
                    src={`/img/${room.roomId}/${room.info?.pictures?.[0] || 0}`}
                    class="splide__slide h-full w-full object-cover lg:rounded-md"
                    loading="lazy"
                  />
                )}
              </For>
            </div>
          </div>
        </div>
        <div class="mt-5 flex flex-col gap-6 px-4 lg:mt-0 lg:w-1/2 lg:flex-row lg:px-0">
          <div class="flex gap-3 lg:ml-8 lg:flex-col lg:justify-center">
            <SliderDots
              count={data()?.length || 0}
              current={sliderState.idx || 0}
              moveTo={(idx) => sliderState.go(idx)}
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
