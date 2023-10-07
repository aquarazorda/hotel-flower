import Image from '../Image';

export const Restaurant = () => {
  return (
    <div class="mt-14 text-xs 2xl:mt-32">
      <h5 class="mb-8 text-center font-shippori text-base font-medium text-primary 2xl:mb-16 2xl:text-2xl 2xl:font-normal">
        Restaurant
      </h5>
      <div class="h-28 w-full 2xl:m-auto 2xl:h-60 2xl:px-32">
        <img
          srcset='/img/home/restaurant.jpeg 780w, /img/home/restaurant.jpeg 1336w, /img/home/restaurant-2.jpeg 1920w'
          src="/img/home/restaurant-2.jpeg"
          class="h-full  w-full rounded-md object-cover"
          loading="lazy"
        />
      </div>
      <span class="block px-5 pb-16 pt-12 text-center text-primary 2xl:px-0 2xl:py-36 2xl:pt-20 2xl:text-base 2xl:text-primary/90">
        <span class="text-[12.5px] 2xl:mx-auto 2xl:block 2xl:max-w-2xl 2xl:text-base 2xl:text-primary/90">
          Savor exquisite meals at our skyline restaurant, offering a culinary
          journey as breathtaking as the city views. Dine under the stars, enjoy
          the shimmering city lights, and experience flavors that will tantalize
          your taste buds. Elevate your dining experience. Welcome to our
          cityscape haven!
        </span>
      </span>
    </div>
  );
};
