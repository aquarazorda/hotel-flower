import { For } from "solid-js";
import { A } from "solid-start";
import { headerNavItems } from "~/shared/data/header-navigation";

export const HomeMainBox = () => {

  return (
    <div
      class="overflow-hidden bg-[url('/img/home/main-sm.webp')] bg-cover bg-right lg:bg-[url('/img/home/main-sm.webp')]"
    >
      <div class="flex h-96 flex-col items-center justify-center gap-12 2xl:h-[80vh] 2xl:justify-normal 2xl:gap-16 2xl:bg-landing-gradient">
        <h1 class="mt-[calc(80vh*0.2)] hidden w-1/3 bg-text-gradient bg-clip-text p-2 text-center font-shippori text-7xl uppercase leading-extra-tight text-transparent xl:block">
          Hotel Flower
        </h1>
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
