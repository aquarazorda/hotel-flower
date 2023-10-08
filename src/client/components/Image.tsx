import { JSX } from "solid-js";

export default function Image(props: JSX.ImgHTMLAttributes<HTMLImageElement>) {
  const { src, ...rest } = props;
  return (
    <img
      srcset={`${props.src}-mobile.webp 1024w, ${props.src}-tablet.webp 1536w, ${props.src}-desktop.webp 3200w`}
      src={`${props.src}-mobile.webp`}
      {...rest}
    />
  );
}
