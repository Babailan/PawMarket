<script>
  import { onMount } from "svelte";
  import Swiper from "swiper";
  import { Thumbs } from "swiper/modules";
  export let dog_breed;
  onMount(() => {
    const swiperThumbInstance =
      dog_breed.gallery.length > 1
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
    return () => {
      if (swiperThumbInstance) {
        swiperThumbInstance.destroy(true, true);
      }
      swiperInstance.destroy(true, true);
    };
  });
</script>

<div class="swiper swiper1">
  <div class="swiper-wrapper">
    {#each dog_breed.gallery as breed}
      <div class="swiper-slide">
        <div class="w-full">
          <img src={breed.src} class="w-full" alt={breed.alt} />
        </div>
      </div>
    {/each}
  </div>
</div>
{#if dog_breed.gallery.length > 1}
  <div class="swiper swiperthumb mt-5">
    <div class="swiper-wrapper">
      {#each dog_breed.gallery as breed}
        <div class="swiper-slide rounded-lg overflow-hidden cursor-pointer">
          <div class="w-full">
            <img src={breed.src} class="w-full" alt={breed.alt} />
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}
