import Footer from "~/client/components/Footer";
import { MobileHeader } from "~/client/components/Header/mobile";
import { HomeSlider } from "~/client/components/Home/HomeSlider";
import { HomeMainBox } from "~/client/components/Home/MainBox";
import { Restaurant } from "~/client/components/Home/Restaurant";
import { HomeSecondarySlider } from "~/client/components/Home/SecondarySlider";

export default function Home() {
  return (
    <main class="font-inter">
      <MobileHeader />
      {/* Main Page Start */}
      <HomeMainBox />
      <div class="flex justify-center px-8 py-12 align-middle xl:mb-20 xl:mt-24 xl:h-52">
        <span class="inline-flex self-center text-center text-xs text-textSecondary xl:w-1/2 xl:text-lg">
          Welcome to Hotel Flower - your gateway to Tbilisi's vibrant spirit.
          Uncover Georgian charm encapsulated in our modern, luxurious setting.
          Here, breathtaking city views meet unparalleled comfort. Your journey
          into the heart of Tbilisi begins.
        </span>
      </div>
      <HomeSlider />
      <HomeSecondarySlider />
      <Restaurant />
      <Footer />
    </main>
  );
}
