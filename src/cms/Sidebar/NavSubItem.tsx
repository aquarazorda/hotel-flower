import { For } from "solid-js";
import { NavItemType } from ".";
import { A } from 'solid-start';

export const NavSubItems = (props: { items: NavItemType[] }) => {
  return (
    <For each={props.items}>
      {(item) => (
        <A href={'/cms/' + item.value} class="flex border-b border-b-[#454a54b3] py-2 pl-10 text-sm hover:bg-[#2d323d]">
          {item.title}
        </A>
      )}
    </For>
  );
};
