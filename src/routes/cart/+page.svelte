<script>
  import { afterUpdate } from "svelte";
  import { user } from "../../stores";
  import { goto } from "$app/navigation";
  import Card from "../../components/cart/Card.svelte";
  import Loader from "components/loader/Loader.svelte";

  export let data;
  afterUpdate(() => {
    document.title = "Cart | Pawmarket";
    if ($user == undefined) {
      goto("/");
    }
  });
</script>

<div class="py-5">
  <h1 class="text-3xl font-bold py-2">User Cart</h1>
  {#await data.streamed.result}
    <Loader />
  {:then result}
    <div class="flex gap-5 flex-col">
      {#if result}
        {#each result as item (item._id)}
          <Card
            dog_name={item.dog_name}
            img={item.puppies_image.src}
            price={item.price}
          />
        {/each}
        <button
          class="w-full p-2 bg-sky-600 hover:bg-sky-700 text-white my-5 rounded-md text-lg"
        >
          Check out
        </button>
      {:else}
        <div class="text-center py-10 text-lg font-medium">
          Add something first.
        </div>
      {/if}
    </div>
  {/await}
</div>
