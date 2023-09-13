import { Accessor, Show } from "solid-js";
import {
  FieldElementProps,
  FieldPath,
  FieldStore,
  FieldValue,
  FieldValues,
} from "@modular-forms/solid";
import { TextField } from "@kobalte/core";
import { ZodFormattedError } from "zod";

type FormItemProps<T> = {
  placeholder: string;
  name: string;
  errors: Accessor<ZodFormattedError<T> | undefined>;
  showTitle?: boolean;
  textArea?: boolean;
  type?: string;
};

const BookingInput =
  <T extends FieldValues>(props: FormItemProps<T>) =>
  <T extends FieldValues>(
    field: FieldStore<T, FieldPath<T>>,
    fieldProps: FieldElementProps<T, any>
  ) => {
    return (
      <>
        <TextField.Root>
          <Show when={props.showTitle}>
            <TextField.Label class="text-sm text-neutral-500">
              {props.placeholder}
            </TextField.Label>
          </Show>
          <Show
            when={props.textArea}
            fallback={
              <TextField.Input
                {...fieldProps}
                // @ts-ignore
                value={field.value}
                type={props.type}
                style={{ "touch-action": "manipulation" }}
                class="w-full overflow-visible rounded-md border-[0.5px] border-neutral-300 px-4 py-3 focus-visible:border-zinc-500 focus-visible:outline-none"
                placeholder={props.showTitle ? "" : props.placeholder}
                required
              />
            }
          >
            <TextField.TextArea
              {...fieldProps}
              // @ts-ignore
              value={field.value}
              style={{ "touch-action": "manipulation" }}
              class="w-full overflow-visible rounded-md border-[0.5px] border-neutral-300 px-4 py-3 focus-visible:border-zinc-500 focus-visible:outline-none"
              placeholder={props.showTitle ? "" : props.placeholder}
              required
            />
          </Show>
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
