<script>
  export let data;
  import ThumbSlider from "components/swiper/Thumbs.svelte";
  import { user } from "src/stores";
  import { numberWithCommas } from "lib/format/numberformat.js";
  import Loader from "components/loader/Loader.svelte";
  import { onMount } from "svelte";
  onMount(() => {
    document.title = data.dog_name;
  });
</script>

{#await data.streamed.breed}
  <div class="w-full flex justify-center">
    <Loader />
  </div>
{:then dog_breed}
  <div class="p-2 mt-10 grid grid-cols-1 lg:grid-cols-2">
    <div>
      <ThumbSlider {dog_breed} />
    </div>
    <div class="py-3 lg:p-5">
      <h1 class="capitalize font-black text-3xl">{dog_breed.dog_name}</h1>
      <h1 class="capitalize text-2xl font-bold">
        ₱{numberWithCommas(dog_breed.price)}
      </h1>
      <p class="text-zinc-500 text-sm">{dog_breed.life_expectancy}</p>
      <div class="my-2">
        <h1 class="font-medium underline">About</h1>
        <p class="text-sm text-zinc-700 text-justify">
          {@html dog_breed.description.about}
        </p>
      </div>
      <div>
        <h1 class="font-medium underline">Did You Know?</h1>
        <p class="text-sm text-zinc-700 text-justify">
          {@html dog_breed.did_you_know}
        </p>
      </div>
      <button
        class="w-full p-3 mt-5 bg-sky-600 hover:bg-sky-700 text-white rounded-md"
        on:click={async () => {
          const result = await fetch("/api/cart/add", {
            method: "POST",
            body: JSON.stringify({ _id: $user._id, itemData: dog_breed }),
          });
          const json = await result.json();
          console.log(json);
        }}>Add to list</button
      >
    </div>
  </div>
{/await}
