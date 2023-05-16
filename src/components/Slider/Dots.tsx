import { Index } from "solid-js";

type Props = {
  count: number | any[];
  current: number;
  moveTo: (idx: number) => void;
};

export default function SliderDots(props: Props) {
  return (
    <Index
      each={typeof props.count === "number" ? Array(props.count) : props.count}
    >
      {(room, idx) => (
        <div
          class="h-2 w-2 cursor-pointer rounded-full hover:bg-neutral-400"
          onClick={() => props.moveTo(idx)}
          classList={{
            "bg-neutral-400": idx === props.current,
            "bg-zinc-300": idx !== props.current,
          }}
        />
      )}
    </Index>
  );
}
