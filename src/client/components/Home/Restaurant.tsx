import Image from '../Image';

export const Restaurant = () => {
  return (
    <div class="mt-14 text-xs xl:mt-32">
      <h5 class="mb-8 text-center font-shippori text-base font-medium text-primary xl:mb-16 xl:text-2xl xl:font-normal">
        Restaurant
      </h5>
      <div class="h-28 w-full xl:m-auto xl:h-60 xl:px-32">
        <img
          srcset='/img/home/restaurant.jpeg 780w, /img/home/restaurant.jpeg 1336w, /img/home/restaurant-2.jpeg 1920w'
          src="/img/home/restaurant-2.jpeg"
          class="h-full  w-full rounded-md object-cover"
          loading="lazy"
        />
      </div>
      <span class="block px-5 pb-16 pt-12 text-center text-primary xl:px-0 xl:py-36 xl:pt-20 xl:text-base xl:text-primary/90">
        <span class="text-[12.5px] xl:mx-auto xl:block xl:max-w-2xl xl:text-base">
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
