import { lazy } from "solid-js";

const Mobile = lazy(() => import("./mobile"));
const Desktop = lazy(() => import("./desktop"));

export default function Header() {
  return (
    <>
      <Mobile />
      <Desktop />
    </>
  );
}
