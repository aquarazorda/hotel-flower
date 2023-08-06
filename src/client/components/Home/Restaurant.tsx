export const Restaurant = () => {
  return (
    <div class="mt-14 text-xs xl:mt-32">
      <h5 class="mb-8 text-center font-shippori text-base font-medium text-neutral-500 xl:mb-16 xl:text-2xl xl:font-normal xl:text-primary">
        Restaurant
      </h5>
      <img
        src="/img/home/restaurant.jpeg"
        class="h-28 w-full object-cover xl:m-auto xl:h-60 xl:px-32"
        loading='lazy'
      />
      <span class="block px-5 py-16 text-center text-neutral-500 xl:px-0 xl:py-36 xl:pt-20 xl:text-base xl:text-primary">
        <span class="xl:animate-slide-up xl:mx-auto xl:block xl:max-w-2xl">
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
