import { useWindowScrollPosition } from "@solid-primitives/scroll";
import { For, createMemo } from "solid-js";
import { isServer } from "solid-js/web";
import { A } from "solid-start";
import { headerNavItems } from "~/data/header-navigation";

export const Header = () => {
  const scrollPosition = isServer ? { y: 0 } : useWindowScrollPosition();
  const isScrolled = createMemo(() => scrollPosition.y >= 2);

  return (
    <header
      class="flex fixed justify-between items-center px-6 w-full z-10 top-0 transition-all duration-200"
      classList={{
        "h-14 bg-white backdrop-blur bg-opacity-80 shadow-gray-500": isScrolled(),
        "h-16": !isScrolled(),
      }}
    >
      <A href="/" class="uppercase font-shippori cursor-pointer">Hotel Flower</A>
      <nav class="flex gap-11 text-sm font-medium">
        <For each={headerNavItems}>
          {(item) => (
            <A
              href={item.path}
              class="text-gray-700 opacity-80 hover:text-gray-900 hover:opacity-95 ease-in duration-200"
            >
              {item.name}
            </A>
          )}
        </For>
      </nav>
      <A href="/login" class="text-sm">
        Login
      </A>
    </header>
  );
};
