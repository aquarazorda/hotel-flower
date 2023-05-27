import { Breadcrumbs } from "@kobalte/core";
import { For, JSX, Show } from "solid-js";
import { A, useLocation } from "solid-start";
import { capitalizeFirstLetter } from "~/shared/utils";

type Props = {
  title: string;
  children: JSX.Element | JSX.Element[];
};

export default function CmsPage(props: Props) {
  const location = useLocation();
  const [, , ...routes] = location.pathname.split("/");

  return (
    <div class="flex flex-col gap-6 p-6">
      <div>
        <h1 class="w-full text-2xl font-semibold">{props.title}</h1>
        <hr class="mt-4" />
      </div>
      {/* <Breadcrumbs.Root
        separator=" /"
        class="flex w-full rounded-md bg-neutral-100 px-4 py-2 text-xs"
      >
        <ol class="flex">
          <li>
            <A href="/cms">Home</A>
            <Breadcrumbs.Separator class="mr-1" />
          </li>
          <For each={routes}>
            {(route, index) => (
              <li>
                <A href={"/cms/" + routes.slice(0, index() + 1).join("/")} end activeClass='font-semibold'>
                  {capitalizeFirstLetter(route)}
                </A>
                <Show when={index() < routes.length - 1}>
                  <Breadcrumbs.Separator class="mr-1" />
                </Show>
              </li>
            )}
          </For>
        </ol>
      </Breadcrumbs.Root> */}
      {props.children}
    </div>
  );
}
