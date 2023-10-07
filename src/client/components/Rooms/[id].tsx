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

import "solid-slider/slider.css";
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
import Image from '../Image';

export default function Room() {
  const { room } = useRouteData<typeof getRoomRouteData>();
  const [bookingOpen, setBookingOpen] = createSignal(false);

  const [dateValues, setDateValues] = createSignal<string[]>();
  const { isDesktop } = useDevice();
  const [loaded, setLoaded] = createStore<Record<number, boolean>>({ 0: true });
  const [slider, { moveTo, current }] = createSlider({
    mode: "snap",
    loop: true,
    vertical: isDesktop,
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
      <main class="mb-10 flex flex-col gap-6 text-xs text-neutral-500 2xl:mb-0 2xl:flex-row">
        <div class="relative overflow-hidden font-shippori 2xl:max-h-[80vh] 2xl:w-5/12">
          {/* @ts-ignore */}
          <div use:slider class="flex h-96 2xl:h-auto 2xl:max-h-[80vh]">
            <Index each={room.data?.info?.pictures}>
              {(item, idx) => (
                <Image src={`/img/${room.data?.roomId}/${item()}`} loading={idx !== 0 ?'lazy' : 'eager'} class='object-cover 2xl:max-h-[80vh]'/>
              )}
            </Index>
          </div>
        </div>
        <div class="flex gap-2 px-8 font-shippori 2xl:flex-col 2xl:justify-center 2xl:px-0">
          <SliderDots
            count={room.data?.info?.pictures || 3}
            current={current()}
            moveTo={moveTo}
          />
        </div>
        <div class="flex flex-col px-8 2xl:mb-40 2xl:flex-1 2xl:flex-row 2xl:justify-around 2xl:px-0 2xl:pt-20">
          <div class="font-shippori 2xl:my-auto 2xl:flex 2xl:w-2/5 2xl:flex-col">
            <h2 class="text-lg text-secondaryHover">{room.data?.name}</h2>
            <p class="mt-5">
              At the hotel all rooms include air conditioning, a seating area, a
              flat-screen TV with satellite channels, a safety deposit box and a
              private bathroom with a shower, free toiletries and a hairdryer.
              Each room is equipped with a kettle, while certain rooms also
              offer a balcony and others also have river views. At Hotel Flower
              rooms are fitted with bed linen and towels.
            </p>
            <p class="mt-2 hidden 2xl:block">
              The accommodation provides an ironing service, as well as business
              facilities like fax and photocopying. Non-stop information is
              available at the reception, where staff speak English, Georgian
              and Russian.
            </p>

            <div class="mt-10 flex flex-col gap-4 px-6 2xl:px-0">
              <h3 class="text-base">Amenities</h3>
              <ul class="grid gap-4 2xl:grid-cols-auto-fill">
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
            <p class="mb-4 mt-10 2xl:hidden">
              The accommodation provides an ironing service, as well as business
              facilities like fax and photocopying. Non-stop information is
              available at the reception, where staff speak English, Georgian
              and Russian.
            </p>
          </div>
          <Suspense>
            <Show when={room.data?.prices} fallback={<div class="m-auto text-center font-shippori text-base">Booking for this room is not available.</div>}>
              <div class="my-12 flex flex-col items-center 2xl:my-0 2xl:w-2/5">
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
