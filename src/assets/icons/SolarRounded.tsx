import { JSX } from "solid-js";

export function SolarUserRoundedLinear(
  props: JSX.IntrinsicElements["svg"],
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      color="#787D76"
      {...props}
    >
      <g fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="6" r="4"></circle>
        <ellipse cx="12" cy="17" rx="7" ry="4"></ellipse>
      </g>
    </svg>
  );
}
