import { scale } from "@cloudinary/url-gen/actions/resize";
import { Show, createSignal, onMount } from "solid-js";
import { Outlet } from "solid-start";
import { MobileHeader } from "~/components/Header/mobile";
import { HomeSlider } from "~/components/Home/HomeSlider";
import { HomeMainBox } from '~/components/Home/MainBox';
import { HomeSecondarySlider } from "~/components/Home/SecondarySlider";
import { useDevice } from "~/lib/device";

export default function Home() {
  const { isDesktop } = useDevice();

  return (
    <main class="font-roboto">
      <Show when={!isDesktop()}>
        <MobileHeader />
      </Show>
      {/* Main Page Start */}
      <HomeMainBox />
      <div class="h-48 flex justify-center align-middle p-9 xl:p-16 xl:h-52 xl:m-16">
        <span class="text-xs text-textSecondary text-center inline-flex self-center xl:text-lg xl:w-1/2">
          Discover the vibrant spirit of Tbilisi, Georgia from the comfort of
          Hotel Flower, a 4-star luxury hotel nestled in the very center of the
          city. Boasting stunning panoramic views of the city skyline, Hotel
          Flower is an exquisite retreat for travelers seeking the perfect blend
          of modern elegance and authentic Georgian charm.
        </span>
      </div>
      <HomeSlider />
      <div class="h-64 bg-secondary flex p-14 xl:p-16 xl:h-52 justify-center">
        <span class="text-white text-center text-sm self-center inline-flex xl:text-lg xl:w-1/2">
          Our spacious, well-appointed guestrooms and suites provide a sanctuary
          of comfort and style, each offering breathtaking city views that
          capture the essence of Tbilisi. Revel in the rich, warm tones and
          contemporary furnishings, while enjoying complimentary high-speed
          WiFi, premium amenities, and the utmost in personalized service.
        </span>
      </div>
      <HomeSecondarySlider />
      <div class="h-56 bg-zinc-900 flex p-14 justify-center">
        <span class="text-white text-center text-sm self-center inline-flex xl:text-lg xl:w-1/2">
          Start your day with a sumptuous buffet breakfast, featuring a wide
          array of local and international favorites to tantalize your taste
          buds. In the evenings, unwind in our stylish shared lounge, where you
          can sip on a perfectly crafted cocktail, savor light bites, and mingle
          with fellow travelers.
        </span>
      </div>
      <div class="h-64 bg-secondary flex p-14"></div>
      {/* Main Page End */}
      <Outlet />
    </main>
  );
}
