<script>
  export let data;
  import DogCard from "components/card/DogCard.svelte";
  import Loader from "components/loader/Loader.svelte";
</script>

{#await data.streamed.result}
  <Loader />
{:then result}
  <h1 class="text-xl font-bold py-5">{data.group} Result "{result.length}"</h1>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
    {#each result as dog_breed}
      <DogCard
        dog_name={dog_breed.dog_name}
        price={dog_breed.price}
        image={dog_breed.puppies_image.src}
        life_expectancy={dog_breed.life_expectancy}
      />
    {/each}
  </div>
{/await}
