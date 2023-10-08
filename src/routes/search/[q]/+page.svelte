<script>
  import { afterUpdate, onMount } from "svelte";
  import DogCard from "components/card/DogCard.svelte";
  import Loader from "components/loader/Loader.svelte";

  export let data;

  afterUpdate(() => {
    document.title = data.q.charAt(0).toUpperCase() + data.q.slice(1);
  });
</script>

{#await data.streamed.result}
  <div class="w-full flex justify-center">
    <Loader />
  </div>
{:then result}
  <div class="my-10">
    <div>
      <h1 class="font-semibold text-2xl">
        Search results "{result.length}"
      </h1>
    </div>
    {#if result.length}
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5 gap-5">
        {#each result as dog (dog._id)}
          <DogCard
            dog_name={dog.dog_name}
            price={dog.price}
            life_expectancy={dog.life_expectancy}
            image={dog.puppies_image.src}
          />
        {/each}
      </div>
    {/if}
  </div>
{/await}
