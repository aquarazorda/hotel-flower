import { For, Show, createEffect, createMemo, onCleanup } from "solid-js";
import Splide from "@splidejs/splide";
import { useDevice } from "~/server/lib/device";
import { useNavigate, useRouteData } from "solid-start";
import { getRooms } from "~/server/db/rooms";
import Image from "../Image";
import "@splidejs/splide/css/core";

export const HomeSlider = () => {
  const routeData = useRouteData<typeof getRooms>();
  const navigate = useNavigate();
  const { isDesktop } = useDevice();

  let slider: HTMLDivElement | undefined;

  const data = createMemo(
    () =>
      routeData.data
        ?.filter(({ type }) => type === "room")
        .splice(0, isDesktop ? 8 : 6),
  );

  createEffect(() => {
    if (!slider || !data()) return;

    const splide = new Splide(slider, {
      type: "slide",
      arrows: false,
      autoWidth: true,
      gap: isDesktop ? "32px" : "9px",
      snap: true,
    });

    splide.mount();

    onCleanup(() => splide.destroy());
  });

  return (
    <div>
      <h5 class="mb-8 text-center font-shippori text-base font-medium text-primary lg:mb-12 lg:mt-4 lg:text-2xl lg:font-normal">
        Rooms
      </h5>
      <div class="cursor-pointer pl-4 lg:pl-4">
        <div ref={slider} class="splide flex lg:ml-28">
          <div class="splide__track">
            <ul class="splide__list">
              <For each={data()}>
                {(room, idx) => (
                  <>
                    <div class="splide__slide relative min-w-[123px] text-sm text-white lg:aspect-square lg:min-w-fit">
                      <Image
                        onClick={() => navigate("/rooms/" + room.roomId)}
                        loading="lazy"
                        class="flex h-32 items-end rounded-lg bg-cover bg-center bg-no-repeat object-cover
                    lg:aspect-square lg:min-h-[264px] lg:flex-col lg:items-start lg:font-semibold"
                        src={`/img/${room.roomId}/${
                          room.info?.pictures?.[0] || 0
                        }`}
                      />
                    </div>
                    <Show when={idx() === data.length - 1 && isDesktop}>
                      <div class="hidden min-w-[123px] lg:block" />
                    </Show>
                  </>
                )}
              </For>
            </ul>
          </div>
        </div>
      </div>
      <div class="mb-10 mt-6 flex flex-col p-4 lg:my-24 lg:mb-28 lg:items-center lg:pt-2">
        <span class="text-center text-[12.5px] text-primary lg:max-w-2xl lg:text-base lg:text-primary/90">
          Relish the unique charm of Tbilisi from our stylish rooms at Hotel
          Flower. Each room harmoniously combines modern elegance with a touch
          of authentic Georgian charm, promising a stay enriched with comfort,
          luxury, and stunning cityscapes. Immerse in the vibrant rhythm of the
          city.
        </span>
      </div>
    </div>
  );
};
