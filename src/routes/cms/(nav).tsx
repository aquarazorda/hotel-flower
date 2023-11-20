import { Outlet, redirect } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { Sidebar } from "~/cms/Sidebar";
import { auth } from "~/server/auth";

export const routeData = () => {
  return createServerData$(async (_, event) => {
    const authRequest = auth.handleRequest(event.request);
    const session = await authRequest.validate();

    if (!session) {
      return redirect("/cms/login");
    }
  });
};

export default function Cms() {
  return (
    <div class="flex">
      <Sidebar />
      <div class="ml-48 w-full">
        <Outlet />
      </div>
    </div>
  );
}
