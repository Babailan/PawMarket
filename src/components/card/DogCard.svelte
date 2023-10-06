<script>
  export let dog_name;
  export let _id;
  export let price;
  export let image;
  export let life_expectancy;
</script>

<div>
  <img src={image} alt={dog_name} title={dog_name} loading="lazy" />
  <div class="py-2">
    <h1 class="capitalize text-sm text-zinc-600">{dog_name}</h1>
    <p class="font-medium">₱{price}</p>
    <p class="capitalize text-sm text-zinc-600">{life_expectancy}</p>
  </div>
  <a
    class="bg-zinc-100 hover:bg-zinc-300 text-black p-2 block text-center rounded-md font-medium"
    href="/dog/{_id}">View Information</a
  >
</div>
