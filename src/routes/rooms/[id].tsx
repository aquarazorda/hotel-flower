import {
  Index,
  Suspense,
  createEffect,
  createMemo,
  createSignal,
} from "solid-js";
import { createStore } from "solid-js/store";
import { createSlider } from "solid-slider";
import { Navigate, RouteDataArgs, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";

import { CancelRounded } from "~/assets/icons/CancelRounded";
import { CheckRounded } from "~/assets/icons/CheckRounded";
import { Button } from "~/components/Button";
import DatePicker from "~/components/Date";
import SliderDots from "~/components/Slider/Dots";
import { roomsData } from "~/data/rooms";
import { getBookings } from "~/db/db";
import { getImageUrl } from "~/lib/cloudinary";
import { useDevice } from "~/lib/device";

export const routeData = ({ params }: RouteDataArgs) => ({
  blockedDates: createServerData$(getBookings, { key: () => params.id }),
  room: createMemo(() => roomsData.find(({ id }) => String(id) === params.id)),
});

export default function Room() {
  const data = useRouteData<typeof routeData>();

  if (!data.room()) {
    // eslint-disable-next-line
    return <Navigate href="/rooms" />;
  }

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

  const calendarDisabled = createMemo(() => data.blockedDates()?.[0]?.dates || []);
  const onCalendarChange = (selectedDates: Date[]) => {
    setDateValues(selectedDates);
  };

  createEffect(() => {
    setLoaded(current(), true);
  });

  return (
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
                      isDesktop() ? 1900 : 980
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
          private bathroom with a shower, free toiletries and a hairdryer. Each
          room is equipped with a kettle, while certain rooms also offer a
          balcony and others also have river views. At Hotel Flower rooms are
          fitted with bed linen and towels.
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
          <div class="mt-6 flex flex-col items-center">
            <DatePicker
              inline
              mode="range"
              minDate={new Date()}
              onChange={onCalendarChange}
              dateFormat="Y-m-d"
              disable={calendarDisabled()}
            />
            <Button class="mt-8" disabled={!dateValues()?.length}>
              Book now
            </Button>
          </div>
        </Suspense>
      </div>
    </main>
  );
}
