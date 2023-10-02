import { JSX } from "solid-js";

export default function Image(props: JSX.ImgHTMLAttributes<HTMLImageElement>) {
  const { src, ...rest } = props;
  return (
    <img
      srcset={`${props.src}-mobile.webp 780w, ${props.src}-tablet.webp 1336w, ${props.src}-desktop.webp 1920w`}
      src={`${props.src}-mobile.webp`}
      {...rest}
    />
  );
}
