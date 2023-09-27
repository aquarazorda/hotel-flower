import { Accordion } from "@kobalte/core";
import { Component, For, Show, createSignal } from "solid-js";
import { NavItem } from "./NavItem";
import { RoomIcon } from "~/client/assets/icons/Room";
import { ListIcon } from "~/client/assets/icons/ListIcon";
import { NavSubItems } from "./NavSubItem";
import { useCookies } from '~/shared/utils/cookies';

export type NavItemType = {
  icon?: Component;
  title: string;
  value: string;
  children?: NavItemType[];
};

const navItems = [
  {
    icon: RoomIcon,
    title: "Rooms",
    value: "rooms",
    children: [
      { icon: ListIcon, title: "List", value: "rooms/list" },
      { icon: ListIcon, title: "Bookings", value: "rooms/bookings" },
    ],
  },
] satisfies NavItemType[];

export const Sidebar = () => {
  const cookies = useCookies();
  const defaultValue = cookies.getCookie('navBar') || [];
  const [navOpen, setNavOpen] = createSignal<string[]>(defaultValue);

  const setAndSave = (value: string[]) => {
   setNavOpen(value);
   cookies.setCookie('navBar', value)
  };

  return (
    <nav class="w-1/6 bg-[#303641] text-stone-400">
      <div class="flex items-center justify-center border-b border-b-[#454a54b3] p-3">
        <h1 class="text-center font-shippori text-white">
          HOTEL
          <br />
          FLOWER
        </h1>
      </div>
      <Accordion.Root multiple onChange={setAndSave} defaultValue={defaultValue}>
        <For each={navItems}>
          {(item) => (
            <NavItem
              name={item.title}
              value={item.value}
              isOpen={navOpen().includes(item.value)}
            >
              <Show when={item.children}>
                <NavSubItems items={item.children} />
              </Show>
            </NavItem>
          )}
        </For>
      </Accordion.Root>
    </nav>
  );
};
