import { scale } from "@cloudinary/url-gen/actions/resize";
import { For, Show, createSignal, onMount } from "solid-js";
import { A } from "solid-start";
import { headerNavItems } from "~/data/header-navigation";
import { cld } from "~/lib/cloudinary";
import { useDevice } from "~/lib/device";

export const HomeMainBox = () => {
  const [imageSrc, setImageSrc] = createSignal("");
  const { isDesktop } = useDevice();

  onMount(() =>
    setImageSrc(
      cld
        .image("hotel-flower/main_mizqwd")
        .quality("auto")
        .format("webp")
        .resize(scale().width(window.innerWidth * 2))
        .toURL()
    )
  );

  return (
    <div
      class="bg-cover bg-right overflow-hidden"
      style={{ "background-image": `url(${imageSrc()})` }}
    >
      <div class="bg-landing-gradient flex flex-col justify-center xl:justify-normal gap-12 xl:gap-16 items-center h-64 xl:h-[80vh]">
        <Show when={isDesktop()}>
          <h1 class="font-shippori uppercase text-7xl w-1/3 text-center text-transparent bg-text-gradient bg-clip-text leading-extra-tight p-2 mt-[calc(80vh*0.2)]">
            Hotel Flower
          </h1>
        </Show>
        <div class="font-rufina text-2xl w-52 xl:w-full xl:text-4xl">
          <h2 class="text-transparent bg-text-gradient bg-clip-text text-center">
            Where Something Incredible Happens
          </h2>
        </div>
        <Show when={isDesktop()}>
          <div class="mt-[5%]">
            <div class="flex justify-center gap-14 uppercase text-base text-white text-center font-bold mt-18">
              <For each={headerNavItems}>
                {(item) => (
                  <A
                    href={item.path}
                    class="min-w-[160px] py-10 px-7 rounded-xl shadow-landing-btn bg-[#1E2726] bg-opacity-50 hover:bg-opacity-90 duration-200"
                  >
                    {item.name}
                  </A>
                )}
              </For>
            </div>
            <div class="w-full flex justify-center mt-12">
              <A
                href="/booking"
                class="font-bold text-white uppercase text-xs rounded-xl bg-secondary hover:bg-secondaryHover px-8 py-4 duration-200 shadow-landing-btn"
              >
                Book Now
              </A>
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
};
