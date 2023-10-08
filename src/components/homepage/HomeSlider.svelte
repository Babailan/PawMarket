<script>
  import { onMount } from "svelte";
  export let data;
  import Swiper from "swiper";
  import { Navigation, EffectCoverflow } from "swiper/modules";
  let width = 768;

  onMount(() => {
    const swiper = new Swiper(".swiper", {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      coverflowEffect: {
        rotate: 30,
      },
      effect: "coverflow",
      modules: [Navigation, EffectCoverflow],
      centeredSlides: true,
      initialSlide: 1.1,
      grabCursor: true,
    });

    return () => {
      swiper.destroy(true, true);
    };
  });
</script>

<div class="swiper mySwiper my-10">
  <div class="swiper-wrapper">
    {#each data as item (item.id)}
      <div class="swiper-slide hover:z-10">
        <div
          class="flex justify-center text-sm transition-all relative gradient rounded-lg overflow-hidden"
        >
          <img src={item.path} class="pointer-events-none" alt="" />
          <div class="absolute bottom-0 left-0 text-white p-5">
            <div>
              <h1 class="font-semibold capitalize text-xl">
                {item.dog_name}
              </h1>
              <p class="text-zinc-100">{item.description}</p>
            </div>
            <div>
              <a
                class="bg-sky-600 py-2 px-5 my-3 cursor-pointer inline-block rounded-md"
                href="/dog/{item.dog_name}">Check for information</a
              >
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
  <div class="swiper-button-next scale-50 md:!block !hidden" />
  <div class="swiper-button-prev scale-50 md:!block !hidden" />
</div>

<style>
  .gradient::before {
    content: "";
    left: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    position: absolute;
    background: rgb(0, 0, 0);
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.64) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    pointer-events: none;
  }
</style>
