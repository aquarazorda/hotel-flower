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
import { roomsData } from "~/shared/data/rooms";
import { getImageUrl } from "~/server/lib/cloudinary";
import { useDevice } from "~/server/lib/device";
import { defaultQueryOptions } from "~/shared/utils";
import { getBooking } from '~/server/db/rooms';

export const routeData = ({ params }: RouteDataArgs) => ({
  blockedDates: createQuery(() => ({
    queryKey: ["room-bookings", params.id],
    queryFn: () => getBooking(Number(params.id)),
    ...defaultQueryOptions,
  })),
  room: createMemo(() => roomsData.find(({ id }) => String(id) === params.id)),
});

export default function Room() {
  const data = useRouteData<typeof routeData>();

  const [dateValues, setDateValues] = createSignal<Date[]>();
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
    if (dateValues() && dateValues()!.length > 1) {
      
      console.log(dates);

      // const months = dateValues()!.map((date) => date.getMonth()+1);
      // const uniqueMonths = [...new Set(months)];
      // const prices = uniqueMonths.map((month) => {
      //   const days = dateValues()!.filter((date) => date.getMonth() === month);
      //   console.log(uniqueMonths);
      //   const pricePerDay = 200;
      //   // const pricePerDay = data.room()?.price[month];
      //   return days.length * pricePerDay;
      // });

      return 200;
    }
  });

  const onCalendarChange = (selectedDates: Date[]) => {
    setDateValues(selectedDates.length > 1 ? selectedDates : undefined);
  };

  createEffect(() => console.log(price(), "SDSD"))

  createEffect(() => {
    setLoaded(current(), true);
  });

  return (
    <Show when={data.room()} fallback={<Navigate href="/rooms" />}>
      <main class="flex flex-col gap-6">
        {/* @ts-ignore */}
        <div use:slider class="flex h-96">
          <Index each={Array(data.room()?.pictures)}>
            {(item, idx) => (
              <img
                loading="lazy"
                src={
                  loaded[idx]
                    ? getImageUrl(
                        `/${data.room()!.id}/${idx + 1}`,
                        isDesktop ? 1900 : 980
                      )
                    : ""
                }
                class="object-cover"
                alt={data.room()!.name + " Picture " + (idx + 1)}
              />
            )}
          </Index>
        </div>
        <div class="flex flex-col gap-4 px-6">
          <div class="flex gap-2">
            <SliderDots
              count={data.room()?.pictures || 0}
              current={current()}
              moveTo={moveTo}
            />
          </div>
          <p class="mt-5 text-sm text-textPrimary">
            At the hotel all rooms include air conditioning, a seating area, a
            flat-screen TV with satellite channels, a safety deposit box and a
            private bathroom with a shower, free toiletries and a hairdryer.
            Each room is equipped with a kettle, while certain rooms also offer
            a balcony and others also have river views. At Hotel Flower rooms
            are fitted with bed linen and towels.
          </p>
          <p class="text-sm text-textPrimary">
            The accommodation provides an ironing service, as well as business
            facilities like fax and photocopying. Non-stop information is
            available at the reception, where staff speak English, Georgian and
            Russian.
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
            <Button>See more</Button>
          </div>
          <p class="mt-5 text-sm text-textPrimary">
            Book now and get 10% discount
          </p>
          <Suspense>
            <div class="mb-12 mt-6 flex flex-col items-center">
              <DatePicker
                inline
                mode="range"
                minDate={new Date()}
                maxDate={new Date(new Date().setMonth(new Date().getMonth() + 6))}
                onChange={onCalendarChange}
                dateFormat="Y-m-d"
                isLoading={data.blockedDates.isLoading}
                disable={(data.blockedDates.data?.dates as any[]) || []}
              />
              <Button class="mt-8" disabled={!dateValues()?.length}>
                Book now
              </Button>
            </div>
          </Suspense>
        </div>
      </main>
    </Show>
  );
}
