import { scale } from "@cloudinary/url-gen/actions/resize";
import { For, createSignal, onMount } from "solid-js";
import { A } from "solid-start";
import { headerNavItems } from "~/shared/data/header-navigation";
import { cld } from "~/server/lib/cloudinary";

export const HomeMainBox = () => {
  const [imageSrc, setImageSrc] = createSignal("");

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
      class="overflow-hidden bg-cover bg-right"
      style={{ "background-image": `url(${imageSrc()})` }}
    >
      <div class="flex h-64 flex-col items-center justify-center gap-12 bg-landing-gradient xl:h-[80vh] xl:justify-normal xl:gap-16">
        <h1 class="mt-[calc(80vh*0.2)] hidden w-1/3 bg-text-gradient bg-clip-text p-2 text-center font-shippori text-7xl uppercase leading-extra-tight text-transparent xl:block">
          Hotel Flower
        </h1>
        <div class="w-2/3 font-rufina text-2xl xl:w-full xl:text-4xl">
          <h2 class="bg-text-gradient bg-clip-text text-center uppercase text-transparent">
            Where Something Incredible Happens
          </h2>
        </div>
        <div class="mt-[5%] hidden xl:block">
            <div class="mt-16 flex justify-center gap-14 text-center text-base font-bold uppercase text-white">
              <For each={headerNavItems}>
                {(item) => (
                  <A
                    href={item.path}
                    class="min-w-[160px] rounded-xl bg-[#1E2726]/50 px-7 py-10 shadow-landing-btn duration-200 hover:bg-[#1E2726]/90"
                  >
                    {item.name}
                  </A>
                )}
              </For>
            </div>
            <div class="mt-12 flex w-full justify-center">
              <A
                href="/booking"
                class="rounded-xl bg-secondary px-8 py-4 text-xs font-bold uppercase text-white shadow-landing-btn duration-200 hover:bg-secondaryHover"
              >
                Book Now
              </A>
            </div>
          </div>
      </div>
    </div>
  );
};
