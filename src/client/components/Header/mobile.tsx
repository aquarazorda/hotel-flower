import { For } from "solid-js";
import { A, useNavigate } from "solid-start";
import { headerNavItems } from "~/shared/data/header-navigation";

export const MobileHeader = () => {
  const navigate = useNavigate();

  return (
    <div class="sticky top-0 z-10 flex flex-col bg-white/75 shadow-gray-500 backdrop-blur transition-all duration-300 ease-in-out 2xl:hidden">
        <div class="mt-4 flex w-full justify-center">
          <div class="w-1/4 text-center transition-all" onClick={() => navigate('/')}>
            <h1 class="font-shippori text-xl uppercase leading-5">
              Hotel Flower
            </h1>
          </div>
        </div>
        <nav class="mb-4 mt-7 flex w-full justify-evenly px-4 font-shippori text-sm uppercase">
          <For each={headerNavItems}>
            {(item) => (
              <div class="flex-1 text-center">
                <A href={item.path}>{item.name}</A>
              </div>
            )}
          </For>
        </nav>
      </div>
  );
};

export default MobileHeader;