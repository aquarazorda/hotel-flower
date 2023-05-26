import { Cloudinary } from "@cloudinary/url-gen";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { createSignal, onMount } from "solid-js";

export const cld = new Cloudinary({
  cloud: {
    cloudName: "dvyt0ygxr",
  },
  url: {
    secure: true, // force https, set to false to force http
  },
});

export const getImageUrl = (path: string, width: number | (() => number)) =>
  cld
    .image("hotel-flower" + path)
    .quality("auto")
    .format("webp")
    .resize(scale().width(typeof width === "function" ? width() : width))
    .toURL();
