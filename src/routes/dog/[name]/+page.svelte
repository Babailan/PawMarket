<script>
  export let data;
  import { onMount } from "svelte";
  import Swiper from "swiper";
  import { Thumbs } from "swiper/modules";
  import { numberWithCommas } from "lib/format/numberformat.js";
  const { dog_name, life_expectancy, did_you_know } = data.breed;
  const price = numberWithCommas(data.breed.price);
  const { about } = data.breed.description;

  onMount(() => {
    document.title = `${
      dog_name.charAt(0).toUpperCase() + dog_name.slice(1)
    } | Pawmarket`;
    const swiperThumbInstance =
      data.breed.gallery.length > 1
        ? new Swiper(".swiperthumb", {
            slidesPerView: 4,
            spaceBetween: 10,
          })
        : null;
    const swiperInstance = new Swiper(".swiper1", {
      slidesPerView: 1,
      modules: [Thumbs],

      thumbs: {
        swiper: swiperThumbInstance,
        slideThumbActiveClass: "slider_thumb_active",
      },
      allowTouchMove: false,
    });
    () => {
      if (swiperThumbInstance) {
        swiperThumbInstance.destroy(true, true);
      }
      swiperInstance.destroy(true, true);
    };
  });
</script>

<div class="p-2 mt-10 grid grid-cols-1 lg:grid-cols-2">
  <div>
    <div class="swiper swiper1">
      <div class="swiper-wrapper">
        {#each data.breed.gallery as breed}
          <div class="swiper-slide">
            <div class="w-full">
              <img src={breed.src} class="w-full" alt={breed.alt} />
            </div>
          </div>
        {/each}
      </div>
    </div>
    {#if data.breed.gallery.length > 1}
      <div class="swiper swiperthumb mt-5">
        <div class="swiper-wrapper">
          {#each data.breed.gallery as breed}
            <div class="swiper-slide rounded-lg overflow-hidden cursor-pointer">
              <div class="w-full">
                <img src={breed.src} class="w-full" alt={breed.alt} />
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
  <div class="py-3 lg:p-5">
    <h1 class="capitalize font-black text-3xl">{dog_name}</h1>
    <p class="text-zinc-500 text-sm">{life_expectancy}</p>
    <h1 class="capitalize text-3xl">₱{price}</h1>
    <div class="my-2">
      <h1 class="font-medium underline">About</h1>
      <p class="text-sm text-zinc-700 text-justify">{@html about}</p>
    </div>
    <div>
      <h1 class="font-medium underline">Did You Know?</h1>
      <p class="text-sm text-zinc-700 text-justify">{@html did_you_know}</p>
    </div>
    <button
      class="w-full p-3 mt-5 bg-sky-600 hover:bg-sky-700 text-white rounded-md"
      >Add to list</button
    >
  </div>
</div>
