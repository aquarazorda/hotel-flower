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
      <main class="flex flex-col gap-6 text-xs text-textPrimary xl:flex-row xl:gap-0">
        {/* @ts-ignore */}
        <div use:slider class="flex h-96 xl:h-auto xl:flex-1 xl:grow">
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
        <div class="flex flex-col gap-4 px-6 xl:flex-1 xl:flex-row">
          <div class="flex gap-2 xl:flex-col xl:justify-center">
            <SliderDots
              count={room.data?.info?.pictures || 0}
              current={current()}
              moveTo={moveTo}
            />
          </div>
          <div class="xl:my-auto xl:flex xl:flex-col xl:items-center">
            <p class="hidden text-base text-secondaryHover xl:block">
              {room.data?.name}
            </p>
            <p class="mt-5 xl:px-48 xl:text-center">
              At the hotel all rooms include air conditioning, a seating area, a
              flat-screen TV with satellite channels, a safety deposit box and a
              private bathroom with a shower, free toiletries and a hairdryer.
              Each room is equipped with a kettle, while certain rooms also
              offer a balcony and others also have river views. At Hotel Flower
              rooms are fitted with bed linen and towels.
            </p>
          </div>
        </div>
      </main>
      <div class="mt-10 px-6 text-xs text-textSecondary xl:flex xl:gap-28 xl:px-14">
        <div class="xl:w-[70%]">
          <div class="mt-5 flex flex-col gap-8">
            <ul class="grid grid-cols-auto-fill gap-4 px-6 xl:px-0">
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

            <Button class="text-xs xl:hidden">See More</Button>
          </div>
          <p class="mt-10 xl:hidden">
            The accommodation provides an ironing service, as well as business
            facilities like fax and photocopying. Non-stop information is
            available at the reception, where staff speak English, Georgian and
            Russian.
          </p>
          <p class="mt-14 hidden xl:block">
            At the hotel all rooms include air conditioning, a seating area, a
            flat-screen TV with satellite channels, a safety deposit box and a
            private bathroom with a shower, free toiletries and a hairdryer.
            Each room is equipped with a kettle, while certain rooms also offer
            a balcony and others also have river views. At Hotel Flower rooms
            are fitted with bed linen and towels. <br />
            <br /> The accommodation provides an ironing service, as well as
            business facilities like fax and photocopying. Non-stop information
            is available at the reception, where staff speak English, Georgian
            and Russian.
            <br />
            <br />
            Popular points of interest near Hotel Flower include Freedom Square,
            Rustaveli Theatre and Tbilisi Opera and Ballet Theatre. The nearest
            airport is Tbilisi International Airport, 14 km from the hotel.
            <br /> <br />
            At the hotel all rooms include air conditioning, a seating area, a
            flat-screen TV with satellite channels, a safety deposit box and a
            private bathroom with a shower, free toiletries and a hairdryer.
            Each room is equipped with a kettle, while certain rooms also offer
            a balcony and others also have river views. At Hotel Flower rooms
            are fitted with bed linen and towels. <br />
            <br /> The accommodation provides an ironing service, as well as
            business facilities like fax and photocopying. Non-stop information
            is available at the reception, where staff speak English, Georgian
            and Russian.
            <br />
            <br />
            Popular points of interest near Hotel Flower include Freedom Square,
            Rustaveli Theatre and Tbilisi Opera and Ballet Theatre. The nearest
            airport is Tbilisi International Airport, 14 km from the hotel.
          </p>
        </div>
        <Suspense>
          <div class="my-12 flex flex-col items-center xl:my-0 xl:mb-20 xl:w-[30%]">
            <div>
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
        </Suspense>
      </div>
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
