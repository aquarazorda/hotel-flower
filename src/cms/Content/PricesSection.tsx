import { Button, TextField } from '@kobalte/core';
import { createForm, getValues, zodForm } from '@modular-forms/solid';
import { useQueryClient } from '@tanstack/solid-query';
import { For, createMemo, createSignal } from "solid-js";
import { useRouteData } from 'solid-start';
import { z } from 'zod';
import { getRoomRouteData } from '~/client/query/getRoomRouteData';
import { savePrice } from "~/server/client/prices";

const PricesSection = () => {
  const { room } = useRouteData<typeof getRoomRouteData>();
  const queryClient = useQueryClient();
  const save = savePrice();

  const [priceKeys, setKeys] = createSignal(
    Object.keys(room.data?.prices?.list || {}).filter((key) => {
      const [currMonth, currYear] = new Date()
        .toLocaleDateString("en-US", { year: "numeric", month: "numeric" })
        .split("/");
      const [month, year] = key.split("-").map(Number);

      return year >= Number(currYear) && month >= Number(currMonth);
    })
  );

  const [pricesF, { Form: PricesForm, Field: PriceField }] = createForm<
    Record<string, number>
  >({
    validate: zodForm(z.record(z.number())),
    initialValues: room.data?.prices?.list,
  });

  const prices = createMemo(() => getValues(pricesF));

  const addNextMonth = () => {
    const keys = priceKeys();

    if (!keys.length) {
      const [currMonth, currYear] = new Date()
        .toLocaleDateString("en-US", { year: "numeric", month: "numeric" })
        .split("/");
      const newKey = `${currMonth}-${currYear}`;

      setKeys([newKey]);
      return;
    }

    const lastKey = keys[keys.length - 1];
    const [month, year] = lastKey.split("-").map(Number);
    const newKey = `${month === 12 ? 1 : month + 1}-${
      month === 12 ? year + 1 : year
    }`;

    setKeys([...keys, newKey]);
  };

  const onSubmit = async (values: Record<string, number>) => {
    await save.mutateAsync({
      roomId: room.data!.roomId,
      list: values,
    });

    queryClient.setQueryData(
      ["room", String(room.data!.roomId)],
      (old: any) => ({
        ...old,
        prices: {
          list: {
            ...values,
          },
        },
      })
    );
  };

  return (
    <PricesForm onSubmit={onSubmit} class="flex flex-col gap-3">
      <table class="mt-4 w-full table-auto">
        <thead>
          <tr>
            <th>Date</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <For each={priceKeys()}>
            {(key) => (
              <tr>
                <td class="border px-4 py-2">{key}</td>{" "}
                <td class="border px-4 py-2">
                  {/* {room.data?.prices?.list[key]} */}
                  <PriceField name={key} type="number">
                    {(field, props) => (
                      <TextField.Root class="flex">
                        <TextField.Input
                          type="number"
                          class="w-[80%]"
                          {...props}
                          value={field.value || 0}
                        />{" "}
                        <span class="ml-auto">GEL</span>
                      </TextField.Root>
                    )}
                  </PriceField>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
      <div class="ml-auto flex gap-2">
        <Button.Root
          disabled={save.isPending}
          type="button"
          onClick={addNextMonth}
          class="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 p-0.5 text-sm font-medium text-white hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-800 group-hover:from-cyan-500 group-hover:to-blue-500"
        >
          <span class="relative rounded-md bg-gray-900 px-5 py-2.5 uppercase transition-all duration-75 ease-in hover:bg-transparent">
            Add month
          </span>
        </Button.Root>
        <Button.Root
          disabled={save.isPending}
          type="submit"
          class="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 p-0.5 text-sm font-medium text-white hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-800 group-hover:from-cyan-500 group-hover:to-blue-500"
        >
          <span class="relative rounded-md bg-gray-900 px-5 py-2.5 uppercase transition-all duration-75 ease-in hover:bg-transparent">
            Save prices
          </span>
        </Button.Root>
      </div>
    </PricesForm>
  );
};

export default PricesSection;
