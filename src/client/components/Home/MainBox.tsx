import { debounce } from '@solid-primitives/scheduled';
import {
  Show,
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
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
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    onCleanup(() => {
      window.removeEventListener("scroll", handleScroll);
    });
  });

  return (
    <div
      style={{ height: isDesktop ? `58vh` : '59vh' }}
      class="overflow-hidden bg-[url('/img/home/main.png')] bg-cover bg-center"
    >
      <div
        style={{ "margin-top": (scrollPercent() * 4) + "px" }}
        class="mt-auto flex h-full flex-col items-center justify-center gap-12 bg-landing-gradient lg:h-full lg:gap-0"
      >
        <h1 class="hidden bg-text-gradient bg-clip-text p-2 text-center font-shippori text-7xl uppercase leading-extra-tight text-transparent transition lg:block">
          Hotel 
          {/* <Show when={scrollPercent() <= 15}> */}
            <br />
          {/* </Show> */}
          Flower
        </h1>
        {/* <div class="hidden transition lg:block" classList={{'lg:hidden': scrollPercent() >= 15}}>
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
