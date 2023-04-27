import { For } from "solid-js";
import { A } from "solid-start";
import { headerNavItems } from "~/data/header-navigation";

export const MobileHeader = () => {
  return (
    <>
      <div class="flex flex-col">
        <div class="w-full flex justify-center mt-4">
          <div class="w-1/4 text-center">
            <h1 class="uppercase font-shippori text-xl leading-5">
              Hotel Flower
            </h1>
          </div>
        </div>
        <div class="flex justify-center font-rufina uppercase mt-7 mb-4 text-sm">
          <For each={headerNavItems}>
            {(item) => (
              <div class="flex-1 text-center">
                <A href={item.path}>{item.name}</A>
              </div>
            )}
          </For>
        </div>
      </div>
      <div class="w-full bg-secondary justify-center p-2">
        <h3 class="uppercase text-center text-white text-xs font-semibold">
          Book Now
        </h3>
      </div>
    </>
  );
};
