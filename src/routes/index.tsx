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
      <div class="flex justify-center px-6 py-14 align-middle xl:m-16 xl:h-52 xl:p-16">
        <span class="inline-flex self-center text-center text-xs text-textSecondary xl:w-1/2 xl:text-lg">
          Ideally located in Tbilisi City. Each accommodation at the 4-star
          hotel has city views, and guests can enjoy access to a shared lounge
          and to a terrace.
        </span>
      </div>
      <HomeSlider />
      <HomeSecondarySlider />
      <Restaurant />
      <Footer />
    </main>
  );
}
