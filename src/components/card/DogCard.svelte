<script>
  export let dog_name;
  export let price;
  export let image;
  export let life_expectancy;
  import { numberWithCommas } from "lib/format/numberformat.js";
</script>

<div class="shadow-md rounded-md p-2 border-[0.1em]">
  <img src={image} alt={dog_name} title={dog_name} loading="lazy" />
  <div class="py-2">
    <h1 class="capitalize text-sm text-zinc-600">{dog_name}</h1>
    <p class="font-medium">₱{numberWithCommas(price)}</p>
    <p class="capitalize text-sm text-zinc-600">{life_expectancy}</p>
  </div>
  <a
    class="bg-zinc-100 hover:bg-zinc-300 text-black p-2 block text-center rounded-md font-medium"
    href="/dog/{dog_name}">View Information</a
  >
</div>
