import { Accessor, Show } from "solid-js";
import {
  FieldElementProps,
  FieldStore,
  FieldValues,
} from "@modular-forms/solid";
import { TextField } from "@kobalte/core";
import { ZodFormattedError } from "zod";

type FormItemProps<T> = {
  placeholder: string;
  name: string;
  errors: Accessor<ZodFormattedError<T> | undefined>;
};

const BookingInput =
  <T extends FieldValues,>(props: FormItemProps<T>) =>
  <T extends FieldValues,>(
    field: FieldStore<T, any>,
    fieldProps: FieldElementProps<T, any>
  ) => {
    return (
      <>
        <TextField.Root>
          <TextField.Input
            {...fieldProps}
            class="w-full overflow-visible rounded-md border-[0.5px] border-neutral-300 px-4 py-3 focus-visible:border-zinc-500 focus-visible:outline-none"
            placeholder={props.placeholder}
            required
          />
        </TextField.Root>
        <Show
          when={field?.dirty && props.errors()?.[props.name]?._errors.length}
        >
          {props
            .errors()
            ?.[props.name]?._errors.map((e) => e)
            .join(", ")}
        </Show>
      </>
    );
  };

export default BookingInput;
