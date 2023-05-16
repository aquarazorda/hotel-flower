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
      class="fixed top-0 z-10 flex w-full items-center justify-between px-6 transition-all duration-200"
      classList={{
        "h-14 bg-white backdrop-blur bg-opacity-80 shadow-gray-500": isScrolled(),
        "h-16": !isScrolled(),
      }}
    >
      <A href="/" class="cursor-pointer font-shippori uppercase">Hotel Flower</A>
      <nav class="flex gap-11 text-sm font-medium">
        <For each={headerNavItems}>
          {(item) => (
            <A
              href={item.path}
              class="text-gray-700 opacity-80 duration-200 ease-in hover:text-gray-900 hover:opacity-95"
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

export default Header;