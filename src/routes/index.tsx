import { MobileHeader } from "~/client/components/Header/mobile";
import { HomeSlider } from "~/client/components/Home/HomeSlider";
import { HomeMainBox } from "~/client/components/Home/MainBox";
import { Restaurant } from "~/client/components/Home/Restaurant";
import { HomeSecondarySlider } from "~/client/components/Home/SecondarySlider";
import { getRooms } from '~/server/db/rooms';

export const routeData = getRooms;

export default function Home() {
  return (
    <main class="font-shippori">
      <MobileHeader />
      {/* Main Page Start */}
      <HomeMainBox />
      <div class="flex justify-center px-8 py-12 align-middle xl:h-72">
        <span class="inline-flex self-center text-center text-[12.5px] text-neutral-500 xl:max-w-xl xl:text-base xl:text-primary">
          Welcome to Hotel Flower - your gateway to Tbilisi's vibrant spirit.
          Uncover Georgian charm encapsulated in our modern, luxurious setting.
          Here, breathtaking city views meet unparalleled comfort. Your journey
          into the heart of Tbilisi begins.
        </span>
      </div>
      <HomeSlider />
      <HomeSecondarySlider />
      <Restaurant />
    </main>
  );
}
