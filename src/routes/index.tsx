import { Show } from "solid-js";
import { Outlet } from "solid-start";
import { MobileHeader } from "~/client/components/Header/mobile";
import { HomeSlider } from "~/client/components/Home/HomeSlider";
import { HomeMainBox } from '~/client/components/Home/MainBox';
import { HomeSecondarySlider } from "~/client/components/Home/SecondarySlider";
import { useDevice } from "~/server/lib/device";

export default function Home() {
  const { isDesktop } = useDevice();

  return (
    <main class="font-inter">
      <Show when={!isDesktop()}>
        <MobileHeader />
        <div class="w-full justify-center bg-secondary p-2">
        <h3 class="text-center text-xs font-semibold uppercase text-white">
          Book Now
        </h3>
      </div>
      </Show>
      {/* Main Page Start */}
      <HomeMainBox />
      <div class="flex justify-center p-9 align-middle xl:m-16 xl:h-52 xl:p-16">
        <span class="inline-flex self-center text-center text-xs text-textSecondary xl:w-1/2 xl:text-lg">
          Discover the vibrant spirit of Tbilisi, Georgia from the comfort of
          Hotel Flower, a 4-star luxury hotel nestled in the very center of the
          city. Boasting stunning panoramic views of the city skyline, Hotel
          Flower is an exquisite retreat for travelers seeking the perfect blend
          of modern elegance and authentic Georgian charm.
        </span>
      </div>
      <HomeSlider />
      <div class="flex h-64 justify-center bg-secondary p-14 xl:h-52 xl:p-16">
        <span class="inline-flex self-center text-center text-sm text-white xl:w-1/2 xl:text-lg">
          Our spacious, well-appointed guestrooms and suites provide a sanctuary
          of comfort and style, each offering breathtaking city views that
          capture the essence of Tbilisi. Revel in the rich, warm tones and
          contemporary furnishings, while enjoying complimentary high-speed
          WiFi, premium amenities, and the utmost in personalized service.
        </span>
      </div>
      <HomeSecondarySlider />
      <div class="flex h-56 justify-center bg-zinc-900 p-14">
        <span class="inline-flex self-center text-center text-sm text-white xl:w-1/2 xl:text-lg">
          Start your day with a sumptuous buffet breakfast, featuring a wide
          array of local and international favorites to tantalize your taste
          buds. In the evenings, unwind in our stylish shared lounge, where you
          can sip on a perfectly crafted cocktail, savor light bites, and mingle
          with fellow travelers.
        </span>
      </div>
      <div class="flex h-64 bg-secondary p-14" />
      {/* Main Page End */}
      <Outlet />
    </main>
  );
}
