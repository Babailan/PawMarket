<script>
  import { onMount } from "svelte";
  import data from "../data/home.json";
  import Swiper from "swiper";
  import { Navigation, Autoplay } from "swiper/modules";

  onMount(() => {
    document.title = "Home | Pawmarket";
    const swiper = new Swiper(".swiper", {
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      autoplay: {
        delay: 60000,
      },
      modules: [Navigation, Autoplay],
    });
    return () => {
      swiper.destroy();
    };
  });
</script>

<div class="swiper mySwiper my-10">
  <div class="swiper-wrapper">
    {#each data as item (item.path)}
      <div class="swiper-slide">
        <div class="flex justify-center relative gradient">
          <img src={item.path} class="pointer-events-none" alt="" />
        </div>
      </div>
    {/each}
  </div>
  <div class="swiper-button-next scale-75" />
  <div class="swiper-button-prev scale-75 stroke-white" />
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
  }
</style>
