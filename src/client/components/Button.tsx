import { JSX } from "solid-js";

export const Button = (props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      disabled={props.disabled}
      class={`flex w-full items-center justify-center rounded-lg border bg-zinc-300  py-2 text-sm font-semibold text-white hover:cursor-pointer hover:bg-secondaryHover disabled:bg-white disabled:font-normal disabled:text-neutral-400 ${props.class}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
