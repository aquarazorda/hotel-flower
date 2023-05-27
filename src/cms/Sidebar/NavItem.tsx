import { Accordion } from "@kobalte/core";
import { ArrowRight } from "~/client/assets/icons/ArrowRight";
import { ArrowDown } from "~/client/assets/icons/ArrowDown";
import { JSX, Show } from "solid-js";

type Props = {
  value: string;
  children: JSX.Element | JSX.Element[];
  name: string;
  isOpen: boolean;
};

export const NavItem = (props: Props) => {
  return (
    <Accordion.Item
      value={props.value}
    >
      <Accordion.Header class="border-b border-b-[#454a54b3] transition-opacity hover:bg-[#454a544d] hover:text-white">
        <Accordion.Trigger class="flex w-full items-center px-6 py-3 font-medium">
          <div>{props.name}</div>
          <Show when={!props.isOpen} fallback={<ArrowDown class="ml-auto" />}>
            <ArrowRight class="ml-auto" />
          </Show>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content class="bg-[#2b303a] text-stone-400">
        {props.children}
      </Accordion.Content>
    </Accordion.Item>
  );
};
