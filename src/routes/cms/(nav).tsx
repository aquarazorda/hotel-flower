import { Show, createSignal } from "solid-js";
import { Navigate, Outlet } from "solid-start";
import { Sidebar } from '~/cms/Sidebar';

export const [cmsLoggedIn, setCmsLoggedIn] = createSignal(false);

export default function Cms() {
  return <div class="flex">
    <Sidebar />
    <div class="w-full">
      <Outlet />
    </div>
  </div>
  // return (
  //   <Show when={cmsLoggedIn()} fallback={<Navigate href={"/cms/login"} />}>
  //     <h1>Admin area</h1>
  //   </Show>
  // );
}
