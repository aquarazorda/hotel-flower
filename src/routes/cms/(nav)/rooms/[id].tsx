import { Button, Checkbox, TextField } from "@kobalte/core";
import { Field, createForm, getValue, getValues, zodForm } from "@modular-forms/solid";
import { useQueryClient } from '@tanstack/solid-query';
import { For, Show, Suspense, createEffect, createMemo } from "solid-js";
import { useRouteData } from "solid-start";
import { z } from "zod";
import BookingInput from "~/client/components/Booking/input";
import { getRoomRouteData } from "~/client/query/getRoomRouteData";
import CmsPage from "~/cms/Page";
import { savePricePercent } from '~/server/client/prices';

export const routeData = getRoomRouteData;

const roomInfoSchema = z.object({
  description: z.string(),
  pictures: z.number(),
  persons: z.number(),
  extraPerson: z.boolean(),
});

type RoomInfoForm = z.infer<typeof roomInfoSchema>;

const PricesSection = () => {
  const { room } = useRouteData<typeof routeData>();
  const queryClient = useQueryClient();
  const savePrice = savePricePercent();
  const priceKeys = Object.keys(room.data?.prices?.list || {});

  const [pricesF, { Form: PricesForm, Field: PriceField }] = createForm<
    Record<string, number>
  >({
    validate: zodForm(z.record(z.number())),
    initialValues: room.data?.priceAdjustment?.list,
  });

  const prices = createMemo(() => getValues(pricesF));

  const onSubmit = async (values: Record<string, number>) => {
    await savePrice.mutateAsync({
      roomId: room.data!.roomId,
      list: values
    });

    queryClient.setQueryData(['room', String(room.data!.roomId)], (old: any) => ({
      ...old,
      priceAdjustment: {
        list: {
          ...values
        }
      }
    }));
  };

  return <PricesForm onSubmit={onSubmit} class="flex flex-col gap-3">
    <table class="mt-4 w-full table-auto">
      <tbody>
        <tr>
          <td class="border px-4 py-2">Date</td>
          <For each={priceKeys}>
            {(key) => <td class="border px-4 py-2">{key}</td>}
          </For>
        </tr>
        <tr>
          <td class="border px-4 py-2">Current price</td>
          <For each={priceKeys}>
            {(key) => (
              <td class="border px-4 py-2">
                {room.data?.prices?.list[key]} GEL
              </td>
            )}
          </For>
        </tr>
        <tr>
          <td class="border px-4 py-2">Price reduction</td>
          <For each={priceKeys}>
            {(key) => (
              <td class="border px-4 py-2">
                <PriceField name={key} type="number">
                  {(field, props) => (
                    <TextField.Root class="flex">
                      <TextField.Input type="number" class="w-10" {...props} value={field.value || 0} /> %
                    </TextField.Root>
                  )}
                </PriceField>
              </td>
            )}
          </For>
        </tr>
        <tr>
          <td class="border px-4 py-2">Price after reduction</td>
          <For each={priceKeys}>
            {(key) => (
              <td class="border px-4 py-2">
                <Show when={prices()[key]} fallback={<>{room.data!.prices!.list[key]}</>}>
                  {prices()[key] && Math.round(room.data!.prices!.list[key] * (1 - prices()[key]! / 100))}
                </Show>
                {' '}GEL
              </td>
            )}
          </For>
        </tr>
      </tbody>
    </table>
    <Button.Root disabled={savePrice.isPending} type="submit" class="group relative mb-2 ml-auto mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 p-0.5 text-sm font-medium text-white hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-800 group-hover:from-cyan-500 group-hover:to-blue-500">
      <span class="relative rounded-md bg-gray-900 px-5 py-2.5 uppercase transition-all duration-75 ease-in hover:bg-transparent">
        Save prices
      </span>
    </Button.Root>
  </PricesForm>
}

export default function RoomEdit() {
  const { room } = useRouteData<typeof routeData>();

  const [roomInfo, { Form, Field }] = createForm<RoomInfoForm>({
    validate: zodForm(roomInfoSchema),
    initialValues: room.data?.info ? room.data.info : undefined,
  });

  return (
    <CmsPage title="Edit Room">
      <Suspense>
        <h2 class="w-full text-center font-medium">
          {room.data?.roomId} - {room.data?.name}
        </h2>
        <Form onSubmit={console.log} class="flex flex-col gap-3">
          <div class="flex gap-2">
            <Field type="number" name="pictures">
              {BookingInput({
                type: "number",
                name: "picture",
                placeholder: "Number of pictures",
                errors: () => undefined,
                showTitle: true,
              })}
            </Field>
            <Field type="number" name="persons">
              {BookingInput({
                type: "number",
                name: "persons",
                placeholder: "Persons",
                errors: () => undefined,
                showTitle: true,
              })}
            </Field>
            <Field type="boolean" name="extraPerson">
              {(field, props) => (
                <TextField.Root>
                  <TextField.Label class="text-sm text-neutral-500">
                    Extra person
                  </TextField.Label>
                  <TextField.Description>
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      // class="w-full overflow-visible rounded-md border-[0.5px] border-neutral-300 px-4 py-3 focus-visible:border-zinc-500 focus-visible:outline-none"
                      class="h-6 w-6 rounded border-gray-600 bg-gray-700 ring-offset-gray-800"
                      {...props}
                    />
                  </TextField.Description>
                </TextField.Root>
              )}
            </Field>
          </div>
          <Field name="description">
            {BookingInput({
              name: "description",
              placeholder: "Description",
              errors: () => undefined,
              showTitle: true,
              textArea: true,
            })}
          </Field>
          <Button.Root
            type="submit"
            class="group relative mb-2 ml-auto mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 p-0.5 text-sm font-medium text-white hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-800 group-hover:from-cyan-500 group-hover:to-blue-500"
          >
            <span class="relative rounded-md bg-gray-900 px-5 py-2.5 uppercase transition-all duration-75 ease-in hover:bg-transparent">
              Save prices
            </span>
          </Button.Root>
        </Form>
        <hr />
        <PricesSection />
      </Suspense>
    </CmsPage>
  );
}
