import {
  Index,
  Show,
  Suspense,
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
} from "solid-js";
import { createStore } from "solid-js/store";
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
import Image from "../Image";
import Splide from "@splidejs/splide";
import MetaData from "~/client/components/Meta";
import "@splidejs/splide/css/core";

export default function Room() {
  const { room } = useRouteData<typeof getRoomRouteData>();
  const [bookingOpen, setBookingOpen] = createSignal(false);

  const [dateValues, setDateValues] = createSignal<string[]>();
  const { isDesktop } = useDevice();

  let slider: HTMLDivElement | undefined;

  const [sliderState, setSliderState] = createStore<{
    idx: number;
    go: (idx: number) => void;
  }>({
    idx: 0,
    go: () => {},
  });

  createEffect(() => {
    if (!slider || !room.data) return;

    const splide = new Splide(slider, {
      type: "slide",
      direction: !isDesktop ? "ltr" : "ttb",
      arrows: false,
      autoWidth: true,
      snap: true,
      pagination: false,
      height: "100%",
      perPage: 1,
    });

    splide.mount();

    setSliderState({
      idx: 0,
      go: (idx: number) => splide.go(idx),
    });

    splide.on("move", (idx) => setSliderState("idx", idx));

    onCleanup(() => splide.destroy());
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
    bookingOpen()
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  });

  return (
    <Suspense>
      <MetaData
        title={`Hotel Flower - ${room.data?.name}`}
        description={room.data?.info?.description}
        url={`rooms/${room.data?.roomId}`}
        imgUrl={`${room.data?.roomId}/${room.data?.info?.pictures?.[0]}-thumb.webp`}
      />
      <main class="mb-10 flex flex-col gap-6 text-xs text-neutral-500 lg:mb-0 lg:flex-row">
        <div
          ref={slider}
          class="splide relative overflow-hidden font-shippori lg:max-h-[100vh] lg:w-5/12"
        >
          <div class="splide__track flex h-96 lg:h-auto ">
            <div class="splide__list">
              <Index each={room.data?.info?.pictures}>
                {(item, idx) => (
                  <Image
                    src={`/img/${room.data?.roomId}/${item()}`}
                    loading={idx !== 0 ? "lazy" : "eager"}
                    class="splide__slide h-full object-cover"
                  />
                )}
              </Index>
            </div>
          </div>
        </div>
        <div class="flex gap-2 px-8 font-shippori lg:flex-col lg:justify-center lg:px-0">
          <SliderDots
            count={room.data?.info?.pictures?.length || 3}
            current={sliderState.idx}
            moveTo={sliderState.go}
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
                  <CancelRounded /> Non smoking room
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
