import { A } from "solid-start";

export const HomeMainBox = () => {

  return (
    <div
      class="overflow-hidden bg-[url('/img/home/main-sm.webp')] bg-cover bg-right lg:bg-[url('/img/home/main-md.webp')] xl:h-screen xl:bg-[url('/img/home/main.webp')]"
    >
      <div class="mt-auto flex h-96 flex-col items-center justify-center gap-12 xl:h-full xl:gap-16 xl:bg-landing-gradient">
        <h1 class="hidden bg-text-gradient bg-clip-text p-2 text-center font-shippori text-7xl uppercase leading-extra-tight text-transparent xl:block">
          Hotel<br />Flower
        </h1>
        <div class="hidden xl:block">
            <div class="mt-8 flex w-full justify-center">
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
