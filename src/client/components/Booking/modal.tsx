import {
  PartialValues,
  createForm,
  email,
  getValues,
  minLength,
  required,
} from "@modular-forms/solid";
import {
  Show,
  createEffect,
  createMemo,
  createSignal,
  on,
  onCleanup,
  onMount,
} from "solid-js";
import CloseIcon from "~/client/assets/icons/CloseIcon";
import clickOutside from "~/client/directives/clickOutside";
import { ZodFormattedError, z } from "zod";
import { createScheduled, debounce } from "@solid-primitives/scheduled";
import BookingInput from "./input";
import { User, createReservation, userSchema } from "~/server/lib/user";
import { RoomWithFullData } from '~/server/db/zod';
import { payzeMutation } from '~/server/client/payze';
import { saveBooking } from '~/server/lib/otelms/save_booking';

false && clickOutside;

type Props = {
  setBookingOpen: (open: boolean) => void;
  room: RoomWithFullData;
  price: number;
  dates: string[];
};

export default function BookingModal(props: Props) {
  const scheduled = createScheduled((fn) => debounce(fn, 400));
  const [type, setType] = createSignal<"reservation" | "pay">("pay");
  const [bookingForm, { Form, Field }] = createForm<User>({});
  const [isFormValid, setIsFormValid] = createSignal(false);
  const [errors, setErrors] = createSignal<ZodFormattedError<User>>();
  const [transactionUrl, setTransactionUrl] = createSignal("");
  const pay = payzeMutation();
  const reserve = createReservation();

  const formValues = createMemo<PartialValues<User>>((values: any) => {
    const value = getValues(bookingForm);
    return scheduled() ? value : values;
  });

  createEffect(
    on(formValues, () => {
      const v = userSchema.safeParse(formValues());

      if (v.success) {
        setErrors();
        setIsFormValid(true);
      } else {
        setErrors(v.error.format());
        setIsFormValid(false);
      }
    })
  );

  const makeBooking = async (formData: User) => {
    if (type() === "reservation") {
      const res = await reserve.mutateAsync({
        room: props.room,
        user: formData,
        dates: props.dates,
      });

      console.log(res);
      return res;
    }

    const res = await pay.mutateAsync({
      room: props.room,
      user: formData,
      dates: props.dates,
    });

    if (!res.success) {
      return res;
    }

    setTransactionUrl(res.url);
  };

  return (
    <div class="fixed inset-0 z-10 flex items-center justify-center bg-black/50">
      <div
        class="mt-[40%] h-full w-screen rounded-lg bg-white lg:mt-0"
        classList={{
          "lg:w-2/3 lg:h-2/3 p-0": !!transactionUrl(),
          "p-8 lg:h-auto lg:w-[425px]": !transactionUrl(),
        }}
        use:clickOutside={() => props.setBookingOpen(false)}
      >
        <Show
          when={!transactionUrl()}
          fallback={<iframe class="h-full w-full" src={transactionUrl()} />}
        >
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
          <Form class="mt-10" onSubmit={makeBooking}>
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
                <Show
                  when={type() === "pay"}
                  fallback={<span class="text-faily">{props.price}</span>}
                >
                  <span class="line-through">{props.price}</span>{" "}
                  <span class="text-faily">
                    {props.price - (props.price * 5) / 100}
                  </span>
                </Show>{" "}
                (GEL)
              </span>
            </div>
            <button
              type="submit"
              class="mt-6 h-8 w-full rounded-md text-xs font-medium text-white transition"
              disabled={!isFormValid()}
              classList={{
                "bg-failyBtn": isFormValid() && pay.status !== 'pending',
                "bg-zinc-300": !isFormValid() || pay.status === 'pending',
              }}
            >
              {type() === "pay" ? "Pay now" : "Make a reservation"}
            </button>
          </Form>
          <p class="mt-8 text-center text-xs text-zinc-400">
            Pay now and get 5% discount
          </p>
        </Show>
      </div>
    </div>
  );
}
