<script>
  import { afterUpdate, onMount } from "svelte";
  import DogCard from "components/card/DogCard.svelte";
  export let data;

  afterUpdate(() => {
    document.title = data.q.charAt(0).toUpperCase() + data.q.slice(1);
  });
</script>

<div class="my-10">
  <div>
    <h1 class="font-semibold text-2xl">
      Search results "{data.result.length}"
    </h1>
  </div>
  {#if data.result.length}
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5 gap-5">
      {#each data.result as dog (dog._id)}
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
