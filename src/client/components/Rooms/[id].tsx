import {
  Index,
  Show,
  Suspense,
  createEffect,
  createMemo,
  createSignal,
  onMount,
} from "solid-js";
import { createStore } from "solid-js/store";
import { createSlider } from "solid-slider";
import { Head, Meta, Title, useRouteData } from "solid-start";

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
import Image from "../Image";

export default function Room() {
  const { room } = useRouteData<typeof getRoomRouteData>();
  const [bookingOpen, setBookingOpen] = createSignal(false);

  const [dateValues, setDateValues] = createSignal<string[]>();
  const { isDesktop } = useDevice();
  const [loaded, setLoaded] = createStore<Record<number, boolean>>({ 0: true });
  const [slider, { moveTo, current, update }] = createSlider({
    mode: "snap",
    loop: true,
    vertical: isDesktop,
    slides: {
      perView: 1,
    },
  });

  onMount(() => {
    setTimeout(() => {
      update();
    }, 500);
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
      <Title>Hotel Flower - {room.data?.name}</Title>
      <Meta name="description" content={room.data?.info?.description} />
      <Meta itemprop="name" content={`Hotel Flower - ${room.data?.name}`} />
      <Meta itemprop="description" content={room.data?.info?.description} />
      <Meta
        itemprop="image"
        content={`/img/${room.data?.roomId}/${room.data?.info?.pictures[0]}-tablet.webp`}
      />

      <Meta property="og:url" content="https://www.flowertbilisi.com" />
      <Meta property="og:type" content="website" />
      <Meta property="og:title" content={`Hotel Flower - ${room.data?.name}`} />
      <Meta property="og:description" content={room.data?.info?.description} />
      <Meta
        property="og:image"
        content={`https://flowertbilisi.com/img/${room.data?.roomId}/${room.data?.info?.pictures[0]}-tablet.webp`}
      />

      <Meta name="twitter:card" content="summary_large_image" />
      <Meta
        name="twitter:title"
        content={`Hotel Flower - ${room.data?.name}`}
      />
      <Meta name="twitter:description" content={room.data?.info?.description} />
      <Meta
        name="twitter:image"
        content={`https://flowertbilisi.com/img/${room.data?.roomId}/${room.data?.info?.pictures[0]}-tablet.webp`}
      />
      <main class="mb-10 flex flex-col gap-6 text-xs text-neutral-500 lg:mb-0 lg:flex-row">
        <div class="relative overflow-hidden font-shippori lg:max-h-[80vh] lg:w-5/12">
          {/* @ts-ignore */}
          <div use:slider class="flex h-96 lg:h-auto lg:max-h-[80vh]">
            <Index each={room.data?.info?.pictures}>
              {(item, idx) => (
                <Image
                  src={`/img/${room.data?.roomId}/${item()}`}
                  loading={idx !== 0 ? "lazy" : "eager"}
                  class="object-cover lg:max-h-[80vh]"
                />
              )}
            </Index>
          </div>
        </div>
        <div class="flex gap-2 px-8 font-shippori lg:flex-col lg:justify-center lg:px-0">
          <SliderDots
            count={room.data?.info?.pictures?.length || 3}
            current={current()}
            moveTo={moveTo}
          />
        </div>
        <div class="flex flex-col px-8 lg:mb-40 lg:flex-1 lg:flex-row lg:justify-around lg:px-0 lg:pt-20">
          <div class="font-shippori lg:my-auto lg:flex lg:w-2/5 lg:flex-col">
            <h2 class="text-lg text-secondaryHover">{room.data?.name}</h2>
            <p class="mt-5">{room.data?.info?.description} </p>
            <p class="mt-2 hidden lg:block">
              The accommodation provides an ironing service, as well as business
              facilities like fax and photocopying. Non-stop information is
              available at the reception, where staff speak English, Georgian
              and Russian.
            </p>

            <div class="mt-10 flex flex-col gap-4 px-6 lg:px-0">
              <h3 class="text-base">Amenities</h3>
              <ul class="grid gap-4 lg:grid-cols-auto-fill">
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
            <p class="mb-4 mt-10 lg:hidden">
              The accommodation provides an ironing service, as well as business
              facilities like fax and photocopying. Non-stop information is
              available at the reception, where staff speak English, Georgian
              and Russian.
            </p>
          </div>
          <Suspense>
            <Show
              when={room.data?.prices}
              fallback={
                <div class="m-auto text-center font-shippori text-base">
                  Booking for this room is not available.
                </div>
              }
            >
              <div class="my-12 flex flex-col items-center lg:my-0 lg:w-2/5">
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
