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
import { useRouteData } from "solid-start";

import { CancelRounded } from "~/client/assets/icons/CancelRounded";
import { CheckRounded } from "~/client/assets/icons/CheckRounded";
import { Button } from "~/client/components/Button";
import DatePicker from "~/client/components/Date";
import SliderDots from "~/client/components/Slider/Dots";
import { useDevice } from "~/server/lib/device";
import { getLastDayOfMonth } from "~/shared/utils";
import { Portal } from "solid-js/web";
import BookingModal from "~/client/components/Booking/modal";
import { calculatePrices } from "~/server/lib/otelms/prices";
import { getRoomRouteData } from "~/client/query/getRoomRouteData";

export const routeData = getRoomRouteData;

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
    return getLastDayOfMonth(keys[keys.length - 1]);
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
      <main class="mb-10 flex flex-col gap-6 text-xs text-neutral-500 xl:mb-0 xl:flex-row">
        <div class="font-shippori xl:w-5/12">
          {/* @ts-ignore */}
          <div use:slider class="flex h-96 xl:h-full">
            <Index each={Array(room.data?.info?.pictures)}>
              {(item, idx) => (
                <img
                  loading="lazy"
                  src="/img/home/main-md.webp"
                  class="object-cover xl:w-full"
                  alt={room.data?.name + " Picture " + (idx + 1)}
                />
              )}
            </Index>
          </div>
        </div>
        <div class="flex gap-2 px-8 font-shippori xl:flex-col xl:justify-center xl:px-0">
          <SliderDots
            count={room.data?.info?.pictures || 3}
            current={current()}
            moveTo={moveTo}
          />
        </div>
        <div class="flex flex-col px-8 xl:mb-40 xl:flex-1 xl:flex-row xl:justify-around xl:px-0 xl:pt-20">
          <div class="font-shippori xl:my-auto xl:flex xl:w-2/5 xl:flex-col">
            <h2 class="text-lg text-secondaryHover">{room.data?.name}</h2>
            <p class="mt-5">
              At the hotel all rooms include air conditioning, a seating area, a
              flat-screen TV with satellite channels, a safety deposit box and a
              private bathroom with a shower, free toiletries and a hairdryer.
              Each room is equipped with a kettle, while certain rooms also
              offer a balcony and others also have river views. At Hotel Flower
              rooms are fitted with bed linen and towels.
            </p>
            <p class="mt-2 hidden xl:block">
              The accommodation provides an ironing service, as well as business
              facilities like fax and photocopying. Non-stop information is
              available at the reception, where staff speak English, Georgian
              and Russian.
            </p>

            <div class="mt-10 flex flex-col gap-4 px-6 xl:px-0">
              <h3 class="text-base">Amenities</h3>
              <ul class="grid gap-4 xl:grid-cols-auto-fill">
                <li class="flex items-center gap-4 whitespace-nowrap">
                  <CancelRounded /> Non smoking rooms
                </li>
                <li class="flex items-center gap-4 whitespace-nowrap">
                  <CheckRounded /> Private parking
                </li>
                <li class="flex items-center gap-4 whitespace-nowrap">
                  <CheckRounded /> Air conditioning
                </li>
                <li class="flex items-center gap-4 whitespace-nowrap">
                  <CheckRounded /> Daily housekeeping
                </li>
                <li class="flex items-center gap-4 whitespace-nowrap">
                  <CheckRounded /> Tea/coffee maker
                </li>
                <li class="flex items-center gap-4 whitespace-nowrap">
                  <CheckRounded /> Terrace
                </li>
                <li class="flex items-center gap-4 whitespace-nowrap">
                  <CheckRounded /> Lift
                </li>
              </ul>
            </div>
            <p class="mb-4 mt-10 xl:hidden">
              The accommodation provides an ironing service, as well as business
              facilities like fax and photocopying. Non-stop information is
              available at the reception, where staff speak English, Georgian
              and Russian.
            </p>
          </div>
          <Suspense>
            <Show when={room.data?.prices} fallback={<div class="m-auto text-center font-shippori text-base">Booking for this room is not available.</div>}>
              <div class="my-12 flex flex-col items-center xl:my-0 xl:w-2/5">
                <div class="flex h-full flex-col justify-center">
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
                  <div class="px-2">
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
                      Book Now
                    </Button>
                    <p class="mt-10 w-full text-left">
                      Pay now and get 5% discount
                    </p>
                  </div>
                </div>
              </div>
            </Show>
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
