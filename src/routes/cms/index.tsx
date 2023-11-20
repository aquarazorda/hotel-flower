import { createServerData$, redirect } from "solid-start/server";
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

export default function CmsMain() {
  return (
    <div class="flex">
      <Sidebar />
      <div class="ml-48 flex w-full justify-center">
        <h1 class="mt-16">Welcome to dashboard!</h1>
      </div>
    </div>
  );
}
