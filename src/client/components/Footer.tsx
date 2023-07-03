import { A } from "solid-start";
import Instagram from "../assets/icons/Instagram";
import Phone from "../assets/icons/Phone";

export default function Footer() {
  return (
    <div class="flex flex-col bg-secondary p-7 text-xs text-white">
      <nav class="flex w-full justify-between">
        <ul class="flex flex-col gap-1 font-semibold">
          <li>
            <A href="/">Home</A>
          </li>
          <li>
            <A href="/rooms">Rooms</A>
          </li>
          <li>
            <A href="/suites">Suites</A>
          </li>
        </ul>
        <div class="mb-20 flex gap-4">
          <Phone class="h-5 w-5" />
          <Instagram class="h-5 w-5" />
        </div>
      </nav>
      <h6>
          Nestled in the heart of Tbilisi, we offer <br /> a blend of elegance and <br />
          Georgian charm. Embrace luxury <br /> with stunning city views. <br />
          All rights reserved.
        </h6>
      <div class='mt-10 flex w-full justify-between text-[10px] font-medium'>
        <div class="flex gap-2">
          <A href="/terms-of-service">Terms of Service</A>
          <A href="/privacy-policy">Privacy Policy</A>
        </div>
        <A href="https://goo.gl/maps/cvMJewnVKi48uof37" class="text-right">36a Lado Asatiani Street Tbilisi</A>
      </div>
    </div>
  );
}
