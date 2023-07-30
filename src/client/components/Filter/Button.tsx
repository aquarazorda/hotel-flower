import { Show } from "solid-js";
import { Button as KbButton } from "@kobalte/core";
import { Icon } from "../Icons";

type Props = {
  children?: string;
  onClick: () => void;
  icon: string;
  rounded?: boolean;
  class?: string;
};

const FilterButton = (props: Props) => {
  return (
    <KbButton.Root class={"flex items-center justify-center gap-1 whitespace-nowrap rounded-md bg-[#C6C6C6] px-3 h-8 text-xs font-semibold text-white " + props.class}>
      <Show when={props.rounded} fallback={<Icon name={props.icon} />}>
        <div class="rounded-full bg-zinc-300 p-1">
          <Icon name={props.icon} />
        </div>
      </Show>{" "}
      {props.children}
    </KbButton.Root>
  );
};

export default FilterButton;
