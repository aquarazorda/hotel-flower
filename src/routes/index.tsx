import Footer from '~/client/components/Footer';
import { MobileHeader } from "~/client/components/Header/mobile";
import { HomeSlider } from "~/client/components/Home/HomeSlider";
import { HomeMainBox } from "~/client/components/Home/MainBox";
import { Restaurant } from '~/client/components/Home/Restaurant';
import { HomeSecondarySlider } from "~/client/components/Home/SecondarySlider";

export default function Home() {
  return (
    <main class="font-inter">
      <MobileHeader />
      {/* Main Page Start */}
      <HomeMainBox />
      <div class="flex justify-center px-6 py-14 align-middle xl:m-16 xl:h-52 xl:p-16">
        <span class="inline-flex self-center text-center text-xs text-textSecondary xl:w-1/2 xl:text-lg">
          Discover the vibrant spirit of Tbilisi, Georgia from the comfort of
          Hotel Flower, a 4-star luxury hotel nestled in the very center of the
          city. Hotel Flower is an exquisite retreat for travelers seeking the
          perfect blend of modern elegance and authentic Georgian charm.
        </span>
      </div>
      <HomeSlider />
      <HomeSecondarySlider />
      <Restaurant />
      <Footer />
    </main>
  );
}
