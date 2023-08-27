import { Component, JSX, Show } from "solid-js";
import { Button as KbButton } from "@kobalte/core";
import { Icon } from "../Icons";
import { CalendarIcon } from '~/client/assets/icons/Calendar';

type Props = {
  children?: string;
  onClick: () => void;
  Icon:  (props: JSX.IntrinsicElements["svg"]) => JSX.Element;
  rounded?: boolean;
  class?: string;
};

const FilterButton = (props: Props) => {
  const { Icon } = props;

  return (
    <KbButton.Root class={"flex items-center justify-center gap-1 whitespace-nowrap rounded-md border-zinc-400 border-[0.5px] px-3 h-8 text-xs font-medium text-[#ACA9A9] " + props.class || ''}>
      <Show when={props.rounded} fallback={<Icon color="#ACA9A9" />}>
        <div class="rounded-full bg-zinc-300 p-1">
          {/* <Icon name={props.icon} /> */}
          <Icon color="white" />
        </div>
      </Show>{" "}
      {props.children}
    </KbButton.Root>
  );
};

export default FilterButton;
