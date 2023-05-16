import { Index, createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { createSlider } from "solid-slider";
import { Navigate, useParams } from "solid-start";
import { CancelRounded } from "~/assets/icons/CancelRounded";
import SliderDots from "~/components/Slider/Dots";
import { roomsData } from "~/data/rooms";
import { getImageUrl } from "~/lib/cloudinary";
import { useDevice } from "~/lib/device";

export default function Room() {
  const params = useParams<{ id: string }>();
  const room = roomsData.find(({ id }) => String(id) === params.id);

  if (!room) {
    // eslint-disable-next-line
    return <Navigate href="/rooms" />;
  }

  const { isDesktop } = useDevice();
  const [loaded, setLoaded] = createStore<Record<number, boolean>>({ 0: true });
  const [slider, { moveTo, current }] = createSlider({
    mode: "snap",
    loop: true,
    slides: {
      perView: 1,
    },
  });

  createEffect(() => {
    setLoaded(current(), true);
  });

  return (
    <main class="flex flex-col gap-6">
      {/* @ts-ignore */}
      <div use:slider class="flex h-96">
        <Index each={Array(room.pictures)}>
          {(item, idx) => (
            <img
              loading="lazy"
              src={
                loaded[idx]
                  ? getImageUrl(
                    `/${room.id}/${idx + 1}`,
                    isDesktop() ? 1900 : 980
                  )
                  : ""
              }
              class="object-cover"
              alt={room.name + " Picture " + (idx + 1)}
            />
          )}
        </Index>
      </div>
      <div class="flex flex-col gap-4 px-6">
        <div class="flex gap-2">
          <SliderDots
            count={room.pictures}
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
        <ul class="flex list-none flex-col gap-6 text-zinc-600">
          <li class="flex items-center gap-6">
            <CancelRounded /> Non smoking rooms
          </li>
        </ul>
      </div>
    </main>
  );
}
