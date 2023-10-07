import Image from '../Image';

export const Restaurant = () => {
  return (
    <div class="mt-14 text-xs lg:mt-32">
      <h5 class="mb-8 text-center font-shippori text-base font-medium text-primary lg:mb-16 lg:text-2xl lg:font-normal">
        Restaurant
      </h5>
      <div class="h-28 w-full lg:m-auto lg:h-60 lg:px-32">
        <img
          srcset='/img/home/restaurant.jpeg 780w, /img/home/restaurant.jpeg 1336w, /img/home/restaurant-2.jpeg 1920w'
          src="/img/home/restaurant-2.jpeg"
          class="h-full  w-full rounded-md object-cover"
          loading="lazy"
        />
      </div>
      <span class="block px-5 pb-16 pt-12 text-center text-primary lg:px-0 lg:py-36 lg:pt-20 lg:text-base lg:text-primary/90">
        <span class="text-[12.5px] lg:mx-auto lg:block lg:max-w-2xl lg:text-base lg:text-primary/90">
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
