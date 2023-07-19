import { createQuery } from "@tanstack/solid-query";
import {
  Index,
  Show,
  Suspense,
  createEffect,
  createMemo,
  createSignal,
} from "solid-js";
import { createStore } from "solid-js/store";
import { createSlider } from "solid-slider";
import { Navigate, RouteDataArgs, useRouteData } from "solid-start";

import { CancelRounded } from "~/client/assets/icons/CancelRounded";
import { CheckRounded } from "~/client/assets/icons/CheckRounded";
import { Button } from "~/client/components/Button";
import DatePicker from "~/client/components/Date";
import SliderDots from "~/client/components/Slider/Dots";
import { getImageUrl } from "~/server/lib/cloudinary";
import { useDevice } from "~/server/lib/device";
import { defaultQueryOptions, getLastDayOfMonth } from "~/shared/utils";
import { getRoom } from "~/server/db/rooms";
import { Portal } from "solid-js/web";
import BookingModal from "~/client/components/Booking/modal";
import { calculatePrices } from "~/server/lib/otelms/prices";

export const routeData = ({ params }: RouteDataArgs) => ({
  room: createQuery(() => ({
    queryKey: ["room", params.id],
    queryFn: () => getRoom(Number(params.id)),
    ...defaultQueryOptions,
  })),
});

export default function Room() {
  const { room } = useRouteData<typeof routeData>();
  const [bookingOpen, setBookingOpen] = createSignal(false);

  const [dateValues, setDateValues] = createSignal<string[]>();
  const { isDesktop } = useDevice();
  const [loaded, setLoaded] = createStore<Record<number, boolean>>({ 0: true });
  const [slider, { moveTo, current }] = createSlider({
    mode: "snap",
    loop: true,
    slides: {
      perView: 1,
    },
  });

  const price = createMemo(() => {
    if (dateValues() && dateValues()!.length > 1 && room.data) {
      return calculatePrices(dateValues()!, room.data);
    }

    return 0;
  });

  const maxDate = createMemo(() => {
    if (!room.data?.prices?.list) return undefined;
    const keys = Object.keys(room.data?.prices?.list);
    return getLastDayOfMonth(keys[keys.length - 1])
  });

  const onCalendarChange = (selectedDates: string[]) => {
    setDateValues(selectedDates.length > 1 ? selectedDates : undefined);
  };

  createEffect(() => {
    setLoaded(current(), true);
  });

  createEffect(() => {
    bookingOpen()
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  });

  return (
    <Suspense>
      <main class="flex flex-col gap-6 text-xs text-textPrimary">
        {/* @ts-ignore */}
        <div use:slider class="flex h-96">
          <Index each={Array(room.data?.info?.pictures)}>
            {(item, idx) => (
              <img
                loading="lazy"
                src={
                  loaded[idx]
                    ? getImageUrl(
                        `/${room.data?.id}/${idx + 1}`,
                        isDesktop ? 1900 : 980
                      )
                    : ""
                }
                class="object-cover"
                alt={room.data?.name + " Picture " + (idx + 1)}
              />
            )}
          </Index>
        </div>
        <div class="flex flex-col gap-4 px-6">
          <div class="flex gap-2">
            <SliderDots
              count={room.data?.info?.pictures || 0}
              current={current()}
              moveTo={moveTo}
            />
          </div>
          <p class="mt-5">
            At the hotel all rooms include air conditioning, a seating area, a
            flat-screen TV with satellite channels, a safety deposit box and a
            private bathroom with a shower, free toiletries and a hairdryer.
            Each room is equipped with a kettle, while certain rooms also offer
            a balcony and others also have river views. At Hotel Flower rooms
            are fitted with bed linen and towels.
          </p>
          <div class="mt-5 flex flex-col gap-8">
            <ul class="flex list-none flex-col gap-6 px-6 text-zinc-600">
              <li class="flex items-center gap-6">
                <CancelRounded /> Non smoking rooms
              </li>
              <li class="flex items-center gap-6">
                <CheckRounded /> 24-hour front desk
              </li>
              <li class="flex items-center gap-6">
                <CheckRounded /> Air conditioning
              </li>
              <li class="flex items-center gap-6">
                <CheckRounded /> Tea/coffee maker in all rooms
              </li>
              <li class="flex items-center gap-6">
                <CheckRounded /> Daily housekeeping
              </li>
            </ul>
            <Button class="text-xs">See more</Button>
          </div>
          <p class="mt-10">
            The accommodation provides an ironing service, as well as business
            facilities like fax and photocopying. Non-stop information is
            available at the reception, where staff speak English, Georgian and
            Russian.
          </p>
          <Suspense>
            <div class="my-12 flex flex-col items-center">
              <DatePicker
                inline
                mode="range"
                minDate={new Date()}
                maxDate={maxDate()}
                onChange={onCalendarChange}
                dateFormat="Y-m-d"
                isLoading={room.isLoading}
                disable={room.data?.blockedDate?.dates || []}
              />
              <p class="mt-6 flex w-full justify-between">
                Total Price{" "}
                <span>
                  <span class="text-faily">{price() || 0}</span> (GEL)
                </span>
              </p>
              <Button
                class="mt-8 text-xs"
                disabled={!dateValues()?.length}
                onClick={() => setBookingOpen(true)}
              >
                Book now
              </Button>
              <p class="mt-10 w-full text-left">Pay now and get 10% discount</p>
            </div>
          </Suspense>
        </div>
      </main>
      <Show when={bookingOpen() && dateValues()}>
        <Portal>
          <BookingModal
            setBookingOpen={setBookingOpen}
            room={room.data!}
            price={price()}
            dates={dateValues()!}
          />
        </Portal>
      </Show>
    </Suspense>
  );
}
