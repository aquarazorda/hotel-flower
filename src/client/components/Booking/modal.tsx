import {
  PartialValues,
  createForm,
  email,
  getValues,
  minLength,
  required,
} from "@modular-forms/solid";
import { createEffect, createMemo, createSignal } from "solid-js";
import CloseIcon from "~/client/assets/icons/CloseIcon";
import clickOutside from "~/client/directives/clickOutside";
import { ZodFormattedError, z } from "zod";
import { createScheduled, debounce } from "@solid-primitives/scheduled";
import BookingInput from "./input";

false && clickOutside;

type Props = {
  setBookingOpen: (open: boolean) => void;
};

const schema = z.object({
  firstName: z
    .string()
    .nonempty("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: z
    .string()
    .nonempty("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: z
    .string()
    .nonempty("Email address is required")
    .email("Invalid email address"),
  phone: z
    .string()
    .nonempty("Phone number is required")
    .min(8, "Phone number must be at least 8 characters"),
});

export default function BookingModal(props: Props) {
  const scheduled = createScheduled((fn) => debounce(fn, 400));
  const [type, setType] = createSignal<"reservation" | "pay">("pay");
  const [bookingForm, { Form, Field }] = createForm<z.infer<typeof schema>>({});
  const [isFormValid, setIsFormValid] = createSignal(false);
  const [errors, setErrors] =
    createSignal<ZodFormattedError<z.infer<typeof schema>>>();

  const formValues = createMemo<PartialValues<z.infer<typeof schema>>>(
    (values: any) => {
      const value = getValues(bookingForm);
      return scheduled() ? value : values;
    }
  );

  createEffect(() => {
    const v = schema.safeParse(formValues());
    if (v.success) {
      setErrors();
      setIsFormValid(true);
    } else {
      setErrors(v.error.format());
      setIsFormValid(false);
    }
  });

  return (
    <div class="fixed inset-0 z-10 flex items-center justify-center bg-black/50">
      <div
        class="mt-[40%] h-full w-screen rounded-lg bg-white p-8 lg:mt-0 lg:h-auto lg:w-[425px]"
        use:clickOutside={() => props.setBookingOpen(false)}
      >
        {/* <div class="flex w-full items-center justify-between">
          
        </div> */}
        <div class="flex w-full gap-[0.5px] text-xs font-medium text-neutral-400">
          <button
            class="rounded-md p-2"
            classList={{
              "text-white bg-zinc-300": type() === "pay",
            }}
            onClick={() => setType("pay")}
          >
            Pay
          </button>
          <button
            class="rounded-md p-2"
            classList={{
              "text-white bg-zinc-300": type() === "reservation",
            }}
            onClick={() => setType("reservation")}
          >
            Book
          </button>
          <button
            onClick={() => props.setBookingOpen(false)}
            class="ml-auto text-zinc-300"
          >
            <CloseIcon class="h-5 w-5" />
          </button>
        </div>
        <Form class="mt-10" onSubmit={console.log}>
          <div class="flex flex-col gap-2 text-xs">
            <Field
              name="firstName"
              validate={[
                required("First name is required"),
                minLength(2, "Last name must be at least 2 characters"),
              ]}
            >
              {BookingInput({
                name: "firstName",
                placeholder: "First Name",
                errors: errors,
              })}
            </Field>
            <Field
              name="lastName"
              validate={[
                required("Last name is required"),
                minLength(2, "Last name must be at least 2 characters"),
              ]}
            >
              {BookingInput({
                name: "lastName",
                placeholder: "Last Name",
                errors: errors,
              })}
            </Field>
            <Field
              name="email"
              validate={[
                required("Email is required"),
                email("Email is invalid"),
              ]}
            >
              {BookingInput({
                name: "email",
                placeholder: "Email Address",
                errors: errors,
              })}
            </Field>
            <Field
              name="phone"
              validate={[
                required("Phone is required"),
                minLength(8, "Phone must be at least 8 characters"),
              ]}
            >
              {BookingInput({
                name: "phone",
                placeholder: "Phone Number",
                errors: errors,
              })}
            </Field>
          </div>
          <div class="mt-12 flex w-full px-5 text-xs font-medium text-neutral-400">
            <span>Total Price</span>
            <span class="ml-auto">
              <span class="text-faily">200</span> (GEL)
            </span>
          </div>
          <button
            type="submit"
            class="mt-6 h-8 w-full rounded-md bg-zinc-300 text-xs font-medium text-white transition"
            classList={{
              "bg-failyBtn": isFormValid(),
            }}
          >
            {type() === "pay" ? "Pay now" : "Make a reservation"}
          </button>
        </Form>
        <p class="mt-8 text-center text-xs text-zinc-400">Pay now and get 10% discount</p>
      </div>
    </div>
  );
}
