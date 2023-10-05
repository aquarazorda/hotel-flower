import { useWindowScrollPosition } from "@solid-primitives/scroll";
import { For, createMemo } from "solid-js";
import { isServer } from "solid-js/web";
import { A } from "solid-start";
import { headerNavItems } from "~/shared/data/header-navigation";

export const Header = () => {
  const scrollPosition = isServer ? { y: 0 } : useWindowScrollPosition();
  const isScrolled = createMemo(() => scrollPosition.y >= 2);

  return (
    <header
      class="fixed top-0 z-10 hidden h-14 w-full items-center justify-between bg-white px-6 pr-0 text-center font-shippori backdrop-blur transition-all duration-200 xl:flex"
      classList={{
        "bg-opacity-80 shadow-gray-500": isScrolled(),
        "relative": !isScrolled(),
      }}
    >
      <A href="/" class="w-20 cursor-pointer text-center uppercase leading-4">Hotel Flower</A>
      <nav class="flex gap-6 text-sm">
        <For each={headerNavItems}>
          {(item) => (
            <A
              href={item.path}
              class="w-20 text-gray-700 opacity-80 duration-200 ease-in hover:text-gray-900 hover:opacity-95"
            >
              {item.name}
            </A>
          )}
        </For>
      </nav>
      <A href="/360" class="w-20 text-base text-gray-700 hover:text-gray-900 hover:opacity-95">
        360°
      </A>
    </header>
  );
};

export default Header;