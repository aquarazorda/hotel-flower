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
      <div class="h-64 flex justify-center align-middle p-9">
        <span class="text-xs text-textSecondary text-center inline-flex self-center">
          Ideally located in Tbilisi City, Hotel offers a buffet breakfast and
          free WiFi throughout the property. Each accommodation at the 4-star
          hotel has city views, and guests can enjoy access to a shared lounge
          and to a terrace. Private parking is available on site.
        </span>
      </div>
      <HomeSlider />
      <div class="h-64 bg-secondary flex p-14">
        <span class="text-white text-center text-sm self-center inline-flex">
          WIRED is where tomorrow is realized. It is the essential source of
          information and ideas that make sense of a world in constant
          transformation. The WIRED conversation illuminates how technology is
          changing every aspect of our lives—from culture to business, science
          to design. The
        </span>
      </div>
      <div class="h-56 bg-zinc-900 flex p-14">
        <span class="text-white text-center text-sm self-center inline-flex">
          The accommodation provides an ironing service, as well as business
          facilities like fax and photocopying. Non-stop information is
          available at the reception, where staff speak
        </span>
      </div>
      <div class="h-64 bg-secondary flex p-14"></div>
      {/* Main Page End */}
      <Outlet />
    </main>
  );
}
