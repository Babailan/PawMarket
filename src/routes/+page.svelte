<script>
  export let data;
  import DogCard from "../components/card/DogCard.svelte";
  import homepageData from "../data/home.json";
  import HomePageSlider from "components/homepage/HomeSlider.svelte";
  import dog_groupData from "../data/dog_grouplist.json";
  import Loader from "components/loader/Loader.svelte";
  import { onMount } from "svelte";
  onMount(() => {
    document.title = "Home | Pawmarket";
  });
</script>

{#await data.streamed.favorite}
  <div class="w-full flex justify-center">
    <Loader />
  </div>
{:then favorite}
  <HomePageSlider data={homepageData} />
  <div>
    <h1 class="text-xl font-semibold my-2">What Dog Group Do You Like?</h1>
    <div class="grid gap-3 grid-cols-2 md:grid-cols-3">
      {#each dog_groupData as dogsgroup (dogsgroup)}
        <a
          href="/dog-group/{dogsgroup}"
          class="bg-zinc-100 flex items-center justify-center p-2 text-center hover:bg-zinc-200 border-[0.1em] shadow-sm"
          >{dogsgroup}</a
        >
      {/each}
    </div>
  </div>

  <div>
    <h1 class="text-xl font-semibold my-2">Favorite Canines</h1>
    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
      {#each favorite as document (document._id)}
        <DogCard
          image={document.puppies_image.src}
          life_expectancy={document.life_expectancy}
          price={document.price}
          dog_name={document.dog_name}
        />
      {/each}
    </div>
    <div />
  </div>
{/await}
