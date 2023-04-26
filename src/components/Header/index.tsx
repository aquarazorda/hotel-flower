import { A } from "solid-start";

export const Header = () => {
  return (
    <div class="flex flex-col">
      <div class="w-full flex justify-center mt-4">
        <div class="w-1/4 text-center">
          <h1 class="uppercase font-shippori text-xl leading-5">Hotel Flower</h1>
        </div>
      </div>
      <div class="flex justify-center font-rufina uppercase mt-7 mb-4 text-sm">
        <div class="flex-1 text-center">
          <A href="/">Suites</A>
        </div>
        <div class="flex-1 text-center">
          <A href="/">Rooms</A>
        </div>
        <div class="flex-1 text-center">
          <A href="/">Restaurant</A>
        </div>
      </div>
    </div>
  );
};
