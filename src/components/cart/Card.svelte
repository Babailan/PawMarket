<script>
  export let dog_name, price, img;
  import { numberWithCommas } from "lib/format/numberformat";

  let quantity = 1;
</script>

<div class="grid grid-cols-1">
  <div class="flex gap-2">
    <div>
      <img src={img} alt="" class="w-[150px] border-[0.12em]" />
    </div>
    <div>
      <div class="capitalize">
        <a href="/dog/{dog_name}" class="capitalize text-lg font-bold underline"
          >{dog_name}</a
        >
      </div>
      <div class="text-sm">₱{numberWithCommas(price * quantity)}</div>
      <select
        type="number"
        bind:value={quantity}
        class="px-2 outline-none border-[0.1em] border-sky-200"
      >
        {#each [1, 2, 3, 4, 5] as v (v)}
          <option value={v}>{v} </option>
        {/each}
      </select>
    </div>
  </div>
</div>
