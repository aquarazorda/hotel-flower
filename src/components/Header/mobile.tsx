import { For } from "solid-js";
import { A, useNavigate } from "solid-start";
import { headerNavItems } from "~/data/header-navigation";

export const MobileHeader = () => {
  const navigate = useNavigate();
  return (
    <>
      <div class="flex flex-col">
        <div class="mt-4 flex w-full justify-center">
          <div class="w-1/4 text-center" onClick={() => navigate('/')}>
            <h1 class="font-shippori text-xl uppercase leading-5">
              Hotel Flower
            </h1>
          </div>
        </div>
        <nav class="mb-4 mt-7 flex justify-center font-rufina text-sm uppercase">
          <For each={headerNavItems}>
            {(item) => (
              <div class="flex-1 text-center">
                <A href={item.path}>{item.name}</A>
              </div>
            )}
          </For>
        </nav>
      </div>
    </>
  );
};

export default MobileHeader;