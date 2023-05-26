import { JSX } from 'solid-js';

export const Button = (props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) => {
  
  return (
    <button disabled={props.disabled} class={`flex w-full items-center justify-center rounded-lg bg-secondaryHover py-2 text-sm font-semibold uppercase text-white disabled:bg-zinc-300 ${props.class}`}>
      {props.children}
    </button>
  );
};
