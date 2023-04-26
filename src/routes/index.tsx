import { scale } from "@cloudinary/url-gen/actions/resize";
import { For, createSignal, onMount } from "solid-js";
import { Slider } from "solid-slider";
import { Outlet } from "solid-start";
import { Header } from "~/components/Header";
import { HomeSlider } from "~/components/HomeSlider";
import { roomsData } from "~/data/rooms";
import { cld } from "~/lib/cloudinary";

export default function Home() {
  const [imageSrc, setImageSrc] = createSignal("");

  onMount(() =>
    setImageSrc(
      cld
        .image("hotel-flower/main_mizqwd")
        .quality("auto")
        .format("webp")
        .resize(scale().width(window.innerWidth * 2))
        .toURL()
    )
  );

  return (
    <main class="font-roboto">
      <Header />
      <div class="w-full bg-secondary justify-center p-2">
        <h3 class="uppercase text-center text-white text-xs font-semibold">
          Book Now
        </h3>
      </div>
      {/* Main Page Start */}
      <div
        class="bg-cover bg-right"
        style={{ "background-image": `url(${imageSrc()})` }}
      >
        <div class="bg-landing-gradient flex flex-col justify-center gap-12 items-center h-64">
          <div class="font-rufina text-2xl w-52">
            <h2 class="text-transparent bg-text-gradient bg-clip-text text-center">
              Where Something Incredible Happens
            </h2>
          </div>
        </div>
      </div>
      <div class="h-48 flex justify-center align-middle p-9">
        <span class="text-xs text-textSecondary text-center inline-flex self-center">
          Discover the vibrant spirit of Tbilisi, Georgia from the comfort of
          Hotel Flower, a 4-star luxury hotel nestled in the very center of the
          city. Boasting stunning panoramic views of the city skyline, Hotel
          Flower is an exquisite retreat for travelers seeking the perfect blend
          of modern elegance and authentic Georgian charm.
        </span>
      </div>
      <HomeSlider />
      <div class="h-64 bg-secondary flex p-14">
        <span class="text-white text-center text-sm self-center inline-flex">
          Our spacious, well-appointed guestrooms and suites provide a sanctuary
          of comfort and style, each offering breathtaking city views that
          capture the essence of Tbilisi. Revel in the rich, warm tones and
          contemporary furnishings, while enjoying complimentary high-speed
          WiFi, premium amenities, and the utmost in personalized service.
        </span>
      </div>
      <div class="h-56 bg-zinc-900 flex p-14">
        <span class="text-white text-center text-sm self-center inline-flex">
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
