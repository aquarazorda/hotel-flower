import { debounce } from '@solid-primitives/scheduled';
import {
  Show,
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import { A } from "solid-start";
import { useDevice } from '~/server/lib/device';

const maxPercent = 35;

export const HomeMainBox = () => {
  const { isDesktop } = useDevice();
  const [scrollY, setScrollY] = createSignal<number>();

  const scrollPercent = createMemo(() => {
    if (!scrollY() || !isDesktop) return 0;

    if (scrollY()! < window.innerHeight) {
      const percent = (scrollY()! * 100) / window.innerHeight;
      if (percent <= maxPercent) {
        return percent;
      }
    }

    return maxPercent;
  });

  onMount(() => {
    setScrollY(window.scrollY);
    const handleScroll = debounce(() => setScrollY(window.scrollY), 10);
    window.addEventListener("scroll", handleScroll);

    onCleanup(() => {
      window.removeEventListener("scroll", handleScroll);
    });
  });

  return (
    <div
      style={{ height: isDesktop ? `${60 - scrollPercent()}vh` : 'auto' }}
      class="overflow-hidden bg-[url('/img/home/main-sm.webp')] bg-cover bg-right lg:bg-[url('/img/home/main-md.webp')] xl:bg-[url('/img/home/main.webp')]"
    >
      <div
        style={{ "margin-top": (scrollPercent() * 4) + "px" }}
        class="mt-auto flex h-96 flex-col items-center justify-center gap-12 xl:h-full xl:gap-0 xl:bg-landing-gradient"
      >
        <h1 class="hidden bg-text-gradient bg-clip-text p-2 text-center font-shippori text-7xl uppercase leading-extra-tight text-transparent transition xl:block">
          Hotel 
          <Show when={scrollPercent() <= 15}>
            <br />
          </Show>
          Flower
        </h1>
        {/* <div class="hidden transition xl:block" classList={{'xl:hidden': scrollPercent() >= 15}}>
          <div class="mt-8 flex w-full justify-center">
            <A
              href="/booking"
              class="rounded-xl bg-secondary px-8 py-4 text-xs font-bold uppercase text-white shadow-landing-btn duration-200 hover:bg-secondaryHover"
            >
              Book Now
            </A>
          </div>
        </div> */}
      </div>
    </div>
  );
};
