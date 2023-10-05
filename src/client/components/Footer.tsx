import { A } from "solid-start";
import Instagram from "../assets/icons/Instagram";
import Phone from "../assets/icons/Phone";

const MobileFooter = () => (
  <footer class="flex flex-col bg-secondary p-7 text-xs text-white xl:hidden xl:p-16">
    <nav class="flex w-full justify-between">
      <ul class="flex flex-col gap-1 font-semibold xl:text-base xl:font-medium">
        <li>
          <A href="/">Home</A>
        </li>
        <li>
          <A href="/rooms">Rooms</A>
        </li>
        <li>
          <A href="/suites">Suites</A>
        </li>
        <li>
          <A href="/360">360°</A>
        </li>
      </ul>
      <div class="mb-20 flex gap-4">
        <Phone class="h-5 w-5 cursor-pointer" />
        <Instagram class="h-5 w-5 cursor-pointer" />
      </div>
    </nav>
    <h6 class="xl:mt-20">
      Nestled in the heart of Tbilisi, we offer <br /> a blend of elegance and{" "}
      <br />
      Georgian charm. Embrace luxury <br /> with stunning city views. <br />
      All rights reserved.
    </h6>
    <div class="mt-10 flex w-full justify-between text-[10px] font-medium text-white">
      <div class="flex gap-2">
        <A href="/terms-of-service">Terms of Service</A>
        <A href="/privacy-policy">Privacy Policy</A>
      </div>
      <A href="https://goo.gl/maps/cvMJewnVKi48uof37" class="text-right">
        36a Lado Asatiani Street Tbilisi
      </A>
    </div>
  </footer>
);

const DesktopFooter = () => (
  <>
    <footer class="hidden grow justify-between bg-secondary p-8 pb-4 text-xs text-white xl:flex">
      <h6 class="flex-1 text-sm">
        Nestled in the heart of Tbilisi, we offer <br /> a blend of elegance and{" "}
        <br />
        Georgian charm. Embrace luxury <br /> with stunning city views. <br />
        All rights reserved.
      </h6>
      <nav class="flex flex-1">
        <ul class="flex flex-col gap-1 font-semibold xl:text-base xl:font-medium">
          <li>
            <A href="/">Home</A>
          </li>
          <li>
            <A href="/rooms">Rooms</A>
          </li>
          <li>
            <A href="/suites">Suites</A>
          </li>
          <div class="mt-2 flex gap-2">
            <A href="/terms-of-service">Terms of Service</A>/
            <A href="/privacy-policy">Privacy Policy</A>
          </div>
        </ul>
      </nav>
      <div class="flex flex-1 flex-col">
        <div class="flex items-center justify-end gap-4">
          <A href="/360" class="text-base font-medium">
            360°
          </A>
          <Phone class="h-5 w-5 cursor-pointer" />
          <Instagram class="h-5 w-5 cursor-pointer" />
        </div>
        <div class="mt-auto flex w-full justify-end text-sm font-medium">
          <A href="https://goo.gl/maps/cvMJewnVKi48uof37" class="text-right">
            36a Lado Asatiani Street Tbilisi
          </A>
        </div>
      </div>
    </footer>
  </>
);

export default function Footer() {
  return (
    <>
      <MobileFooter />
      <DesktopFooter />
    </>
  );
}
