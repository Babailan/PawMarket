<script>
  export let data;
  import DogCard from "../components/card/DogCard.svelte";
  import homepageData from "../data/home.json";
  import HomePageSlider from "components/homepage/HomeSlider.svelte";
</script>

<HomePageSlider data={homepageData} />

<div>
  <h1 class="text-xl font-semibold my-2">Favorite Canines</h1>
  <div class="grid grid-cols-3 gap-10">
    {#each data.body.favorite as document (document._id)}
      <DogCard {...document} image={document.puppies_image.src} />
    {/each}
  </div>
  <div />
</div>

<div>
  <h1 class="text-lg font-semibold">Favorite Canines</h1>
  <div />
</div>

<div>
  <h1 class="text-lg font-semibold">Popular Canines</h1>
  <div />
</div>

<div>
  <h1 class="text-lg font-semibold">Foods</h1>
  <div />
</div>
